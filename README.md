# AME-AI-Sandbox

Claude Code / OpenCode / Antigravity CLI をコンテナ内で動かすための開発用 Docker サンドボックスです。
Ubuntu 24.04 LTS をベースに、Python 3.14 (uv管理)・Node.js v24・Go・GitHub CLI (`gh`) を含みます。

## ビルド

```bash
docker build --secret id=user_password,src=<(printf '%s' "<コンテナ内sudoパスワード>") -t ame-ai-sandbox .
```

- sudoパスワードは `ARG`/`ENV` ではなく BuildKit の secret mount で渡す（`docker history` 等にパスワードを残さないため）。BuildKit は Docker 23+ で既定有効。
- `--secret` は必須（コンテナ内の非rootユーザー `ai-developer` の sudo パスワード）。
- 必要に応じて `--build-arg USER_UID=... --build-arg USER_GID=...`（デフォルト 1000）をホストのUIDに合わせて指定してください。

## 実行

```bash
docker run --rm -it \
  -v ~/.ssh:/etc/ssh-host:ro \
  -v "$(pwd)":/workspace \
  -e GH_TOKEN="$(gh auth token)" \
  -e GIT_AUTHOR_NAME="Your Name" \
  -e GIT_AUTHOR_EMAIL="you@example.com" \
  ame-ai-sandbox
```

### ボリューム / 環境変数

| オプション | 用途 |
| --- | --- |
| `-v ~/.ssh:/etc/ssh-host:ro` | GitHub用SSH鍵の受け渡し。**読み取り専用でbind-mountするだけ**で、コンテナ内の書き込み可能な `~/.ssh` にコピーされる。イメージには一切焼き込まれない |
| `-e GH_TOKEN=...` | `gh` CLIへの自動ログイン、および `git` のHTTPS認証（`gh auth setup-git`経由）に使用。Fine-grained PAT推奨 |
| `-e GIT_AUTHOR_NAME` / `-e GIT_AUTHOR_EMAIL` | `git config --global user.name/user.email` に反映 |
| `-v $(pwd):/workspace` | 作業ディレクトリのマウント（`WORKDIR` は `/workspace`） |

各CLIの認証状態やログイン情報をコンテナ再作成後も保持したい場合は、以下も併せてマウントしてください（任意）。

```bash
  -v ame-claude-config:/home/ai-developer/.claude \
  -v ame-opencode-config:/home/ai-developer/.config/opencode \
  -v ame-opencode-data:/home/ai-developer/.local/share/opencode \
  -v ame-local-bin:/home/ai-developer/.local/bin \
```

## 各CLIの使い方

| CLI | 起動コマンド | 認証方法 |
| --- | --- | --- |
| Claude Code | `claude` | 対話ログイン、または `ANTHROPIC_API_KEY` 環境変数 |
| OpenCode | `opencode` | `opencode auth login`（対話）、またはプロバイダごとのAPIキー環境変数（例: `ANTHROPIC_API_KEY`） |
| Antigravity CLI | `agy` | ヘッドレス環境ではURL＋ワンタイムコードによる対話認証、または `ANTIGRAVITY_API_KEY` 環境変数（Google AI Studioで取得） |
| GitHub CLI | `gh` | `GH_TOKEN` 環境変数でentrypoint起動時に自動ログイン済み |

いずれも `docker run` 時に対応するAPIキーを `-e` で渡すだけで、コンテナ起動直後から非対話的に利用できます。

## セキュリティに関する注記

- **SSH鍵はビルド時にイメージへ焼き込まない。** 実行時に読み取り専用でbind-mountしたホストの鍵を、コンテナ起動時に `entrypoint.sh` が書き込み可能な `~/.ssh` へコピーする。イメージレイヤーやコミット履歴に鍵materialは残らない。
- GitHubのホスト鍵は `ssh-keyscan` で `known_hosts` に登録しており、`StrictHostKeyChecking no` のような検証無効化は行っていません。
- `GH_TOKEN` は環境変数として渡され、`gh` の credential helper が動的に解決するため、`~/.git-credentials` のような平文ファイルには保存されません。

## 開発・レビュー（AME-AI-Review-System）

本リポジトリには二段ゲート方式のAIコードレビュー基盤（`ame_ai_review_system/`）が組み込まれています。
移植元は [tarminjapan/AME-AI-Review-System](https://github.com/tarminjapan/AME-AI-Review-System) です。
静的解析は Dockerfile 向けに `hadolint` + `trivy config` を追加し、対象外（JS/TS/CSS/SQL向け）の
ツールは除外しています。詳細は `ame_ai_review_system/docs/` 配下と `CLAUDE.md` を参照してください。

### Gate 1: ローカル pre-commit レビュー

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
uv venv .venv --python 3.12 && source .venv/bin/activate
uv pip install -r requirements-dev.txt
npm ci
pre-commit install --install-hooks -t pre-commit -t commit-msg -t pre-push -t post-commit
```

`git commit` のたびに静的解析→AIレビューの順に実行されます。静的解析には次のツールを使います。

- ruff / mypy / pyright（Python）
- shellcheck（シェル）
- hadolint / trivy config（Dockerfile）
- semgrep（プロジェクト固有ルール）
- yamllint / markdownlint / textlint / codespell / gitleaks（YAML・Markdown・綴り・秘密情報）

AIレビューのエンジンは `claude` / `opencode` / `agy` のいずれかを自動検出します。
自動検出の設定は `ame_ai_review_system/config.json` の `precommit_engine: "auto"` です。
事前に各CLIでログインしてください。

### Gate 2: PRコメント起動のCIレビュー（要手動セットアップ）

PRに `/request-review` とコメントすると GitHub App 経由でBotがレビューします。**GitHub Web UI上での手動セットアップが必須です。**

1. [Settings] → [Developer settings] → [GitHub Apps] → [New GitHub App] で権限
   `Contents: Read` / `Pull requests: Read & Write` / `Issues: Read & Write` を持つAppを作成し、本リポジトリにインストール
2. 以下をリポジトリの Secrets（[Settings] → [Secrets and variables] → [Actions]）に登録:
   - `AME_AI_REVIEWER_APP_ID`, `AME_AI_REVIEWER_APP_PRIVATE_KEY`（GitHub App の App ID / 秘密鍵）
   - 使用エンジンの認証情報をbase64化した値:
     `CLAUDE_CONFIG_B64` / `CLAUDE_CREDENTIALS_B64` / `OPENCODE_AUTH_B64` /
     `ANTIGRAVITY_OAUTH_B64` / `GEMINI_OAUTH_B64`
3. 手順の詳細は `ame_ai_review_system/docs/setup.md` を参照

Secrets未設定の間、`review_command.yml` / `review_reply.yml` は発火しません。そのためGate 1のみでも安全に利用できます。

### Dockerfile静的解析（超厳格）

Dockerfileには `hadolint`（ベストプラクティス）と `trivy config`（IaC設定ミス検出）を適用します。
実行箇所は pre-commit と CI (`.github/workflows/ci.yml`) の両方です。
`info` レベル以上の指摘も全て失敗扱いにしています。
`main`/`dev` へのpush時のみ、実際に `docker build` が最後まで通るかを検証する `docker-build`
ジョブも別途走ります（PRごとには実行しません）。

### Docker seccomp プロファイル（任意）

`.seccomp/profile.json` は `mount`/`ptrace`/`unshare` 等の危険なsyscallを制限するseccompプロファイルです。
より厳格に実行したい場合は付与してください。

```bash
docker run --security-opt seccomp=.seccomp/profile.json ... ame-ai-sandbox
```

## 既知の制約

- 以前 `Dockerfile` が参照していた `claude-settings.json` / `claude-skills/` は本タスクのスコープ外としてイメージから除去した。Claude Codeの設定・スキルを事前投入したい場合は、該当ファイルを用意した上で `Dockerfile` に `COPY` 行を追加する。
- AWS Bedrock連携、および Gitea連携（`tea` CLI・Gitea向けSSH/HTTPS認証）は廃止した。現在は GitHub 接続（SSH鍵 + `gh`/`GH_TOKEN`）のみをサポートする。
