# syntax=docker/dockerfile:1
# AI Agent Sandbox
# Ubuntu 24.04 LTS + Python 3.14 + Node.js v24 + Go + Claude Code / OpenCode / Antigravity CLI

FROM ubuntu:24.04

ARG DEBIAN_FRONTEND=noninteractive

# RUN の既定シェルを bash + pipefail に切り替える。curl|bash 等のパイプで
# 左辺が失敗しても右辺の exit code に隠れてビルドが成功してしまう事故を防ぐ。
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# --- System packages -------------------------------------------------------
RUN apt-get update && apt-get install -y --no-install-recommends \
    # Core utilities
    curl wget ca-certificates gnupg lsb-release \
    # Build essentials
    build-essential git \
    # Shell & dev tools
    bash zsh less vim nano jq \
    # Python build deps (needed for pyenv/uv builds)
    libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev \
    libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev \
    # Misc
    unzip zip p7zip-full openssh-client sudo procps \
    && rm -rf /var/lib/apt/lists/*

# --- Node.js v24 (via NodeSource) ------------------------------------------
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

# Redirect npm global prefix to /opt/npm-global so the non-root user can write to it
ENV NPM_CONFIG_PREFIX=/opt/npm-global
ENV PATH="/opt/npm-global/bin:${PATH}"
RUN mkdir -p /opt/npm-global

# --- Go 1.26 ---------------------------------------------------------------
ARG GO_VERSION=1.26.4
RUN curl -fsSL "https://dl.google.com/go/go${GO_VERSION}.linux-amd64.tar.gz" \
    | tar -C /usr/local -xz
ENV PATH="/usr/local/go/bin:${PATH}"

# --- GitHub CLI (gh) --------------------------------------------------------
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
        | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
        > /etc/apt/sources.list.d/github-cli.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends gh \
    && rm -rf /var/lib/apt/lists/*

# --- Python 3.14 via uv (system-wide) --------------------------------------
# Install uv binary and all managed data under /usr/local / /opt so any user can use them
ENV UV_INSTALL_DIR=/usr/local/bin
ENV UV_TOOL_DIR=/opt/uv/tools
ENV UV_TOOL_BIN_DIR=/usr/local/bin
ENV UV_PYTHON_INSTALL_DIR=/opt/uv/python
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
RUN uv python install 3.14
# Create a system-wide venv backed by uv-managed 3.14
RUN uv venv /opt/venv --python 3.14
ENV VIRTUAL_ENV=/opt/venv
ENV PATH="/opt/venv/bin:${PATH}"
# Make python3 / python point to the venv's interpreter
RUN ln -sf /opt/venv/bin/python3 /usr/local/bin/python3 \
    && ln -sf /opt/venv/bin/python3 /usr/local/bin/python

# --- Global npm packages (matching host) ------------------------------------
# claude-code は単独の RUN で npm install する。複数パッケージをまとめて
# npm install -g pkg1 pkg2 ... すると、一部パッケージの optionalDependencies
# (プラットフォーム別ネイティブバイナリ) が silently スキップされる npm の
# 既知の不具合があり、esbuild/sharp/turbo 等でも報告されている。
RUN npm install -g @anthropic-ai/claude-code@latest
# ビルド時に native binary の配置を検証し、壊れたイメージを作らないようにする
RUN claude --version

# opencode-ai (OpenCode CLI) も同様の理由で単独の RUN にする
RUN npm install -g opencode-ai@latest
RUN opencode --version

RUN npm install -g \
    markdownlint-cli2 \
    eslint \
    stylelint \
    stylelint-config-standard \
    pyright \
    clean-css-cli

# --- Global Python tools via uv --------------------------------------------
RUN uv tool install ruff \
    && uv tool install mypy \
    && uv tool install pre-commit \
    && uv tool install codespell \
    && uv tool install yamllint \
    && uv tool install sqlfluff \
    && uv tool install pytest \
    && uv tool install httpx

# --- pip packages into the venv --------------------------------------------
RUN uv pip install \
    mcp \
    pydantic \
    pydantic-settings \
    fastapi \
    "uvicorn[standard]" \
    httpx \
    httpx-sse \
    sse-starlette \
    python-dotenv \
    pyyaml \
    click \
    typer \
    rich \
    openpyxl \
    javalang \
    py7zr \
    duckdb \
    psutil \
    websockets \
    playwright

# Install Playwright browsers
RUN python3 -m playwright install --with-deps chromium

# --- Non-root user (matches WSL2 host uid=1000; AI agent's own account) ---
ARG USERNAME=ai-developer
ARG USER_UID=1000
ARG USER_GID=1000
# sudo パスワードは ARG ではなく BuildKit secret mount で渡す。ARG/ENV は
# `docker history` やイメージのメタデータに残るため、シークレットには
# 使わない（--build-arg USER_PASSWORD=... は既知のアンチパターン）。
# ビルド時: docker build --secret id=user_password,src=<(printf '%s' "$PW") ...
RUN --mount=type=secret,id=user_password,required=true \
    USER_PASSWORD="$(cat /run/secrets/user_password)" && \
    if [ -z "${USER_PASSWORD}" ]; then \
    echo "ERROR: user_password secret is required (sudo password for ${USERNAME})." >&2; \
    exit 1; \
    fi && \
    if getent group "${USER_GID}" >/dev/null 2>&1; then \
    groupmod -n "${USERNAME}" "$(getent group "${USER_GID}" | cut -d: -f1)" ; \
    else \
    groupadd --gid "${USER_GID}" "${USERNAME}" ; \
    fi && \
    if getent passwd "${USER_UID}" >/dev/null 2>&1; then \
    usermod -l "${USERNAME}" -d "/home/${USERNAME}" -m "$(getent passwd "${USER_UID}" | cut -d: -f1)" ; \
    else \
    useradd --uid "${USER_UID}" --gid "${USER_GID}" --shell /bin/bash --create-home "${USERNAME}" ; \
    fi && \
    echo "${USERNAME}:${USER_PASSWORD}" | chpasswd && \
    echo "${USERNAME} ALL=(ALL) ALL" >> /etc/sudoers && \
    chown -R "${USER_UID}:${USER_GID}" /opt/venv /opt/uv /opt/npm-global && \
    # compose.yaml が名前付きボリュームをマウントするパスを事前に作成・chown しておく。
    # 存在しないパスに名前付きボリュームを新規マウントすると、Docker は
    # マウントポイントを root:root で作成してしまい、非rootユーザーが書き込めず
    # opencode/claude が EACCES で起動失敗する (Issue #7)。
    mkdir -p "/home/${USERNAME}/.claude" \
    "/home/${USERNAME}/.config/opencode" \
    "/home/${USERNAME}/.local/share/opencode" \
    "/home/${USERNAME}/.local/bin" && \
    chown -R "${USER_UID}:${USER_GID}" "/home/${USERNAME}"

# --- Entrypoint script -----------------------------------------------------
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# --- Switch to non-root user -----------------------------------------------
USER ${USERNAME}

# --- oh-my-posh (shell prompt) ---------------------------------------------
RUN curl -s https://ohmyposh.dev/install.sh | bash -s \
    && mkdir -p ~/oh-my-posh \
    && curl -fsSLo ~/oh-my-posh/blueish.omp.json \
       https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/refs/heads/main/themes/blueish.omp.json \
    && echo 'eval "$($HOME/.local/bin/oh-my-posh init bash --config ~/oh-my-posh/blueish.omp.json)"' >> ~/.bashrc

# --- Antigravity CLI (installs to ~/.local/bin, already on PATH via .bashrc) -
RUN curl -fsSL https://antigravity.google/cli/install.sh | bash

# --- Health check ------------------------------------------------------------
# 対話シェル用イメージのためHTTPエンドポイント等は無いが、各CLIが実行可能な
# 状態であることを検証し、壊れたイメージ/コンテナを早期に検知する。
HEALTHCHECK --interval=5m --timeout=10s --start-period=30s --retries=3 \
    CMD command -v claude >/dev/null && command -v opencode >/dev/null && command -v gh >/dev/null || exit 1

# --- Working directory -----------------------------------------------------
WORKDIR /workspace

# --- Entrypoint ------------------------------------------------------------
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["bash"]
