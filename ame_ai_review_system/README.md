# AME-AI-Review-System

本リポジトリ（AME-AI-Sandbox）に組み込まれた、二段ゲート方式の AI コードレビュー基盤です。
移植元は [tarminjapan/AME-AI-Review-System](https://github.com/tarminjapan/AME-AI-Review-System) です。
静的解析は Dockerfile 向けに `hadolint` + `trivy config` を追加し、対象外（JS/TS/CSS/SQL 向け）の
ツールは除外しています。詳細は `docs/` 配下とリポジトリルートの `CLAUDE.md` を参照してください。

## Gate 1: ローカル pre-commit レビュー

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
uv venv .venv --python 3.12 && source .venv/bin/activate
uv pip install -r requirements-dev.txt
npm ci
pre-commit install --install-hooks -t pre-commit -t commit-msg -t pre-push -t post-commit
```

`git commit` のたびに静的解析 → AI レビューの順に実行されます。静的解析には次のツールを使います。

- ruff / mypy / pyright（Python）
- shellcheck（シェル）
- hadolint / trivy config（Dockerfile）
- semgrep（プロジェクト固有ルール）
- yamllint / markdownlint / textlint / codespell / gitleaks（YAML・Markdown・綴り・秘密情報）

AI レビューのエンジンは `claude` / `opencode` / `agy` のいずれかを自動検出します。
自動検出の設定は `config.json` の `precommit_engine: "auto"` です。
事前に各 CLI でログインしてください。

## Gate 2: PR コメント起動の CI レビュー（要手動セットアップ）

PR に `/request-review` とコメントすると GitHub App 経由で Bot がレビューします。
**GitHub Web UI 上での手動セットアップが必須です。**

1. [Settings] → [Developer settings] → [GitHub Apps] → [New GitHub App] で権限
   `Contents: Read` / `Pull requests: Read & Write` / `Issues: Read & Write` を持つ App を作成し、本リポジトリにインストール
2. 以下をリポジトリの Secrets（[Settings] → [Secrets and variables] → [Actions]）に登録:
   - `AME_AI_REVIEWER_APP_ID` / `AME_AI_REVIEWER_APP_PRIVATE_KEY`（GitHub App の App ID / 秘密鍵）
   - 使用エンジンの認証情報を base64 化した値:
     `CLAUDE_CONFIG_B64` / `CLAUDE_CREDENTIALS_B64` / `OPENCODE_AUTH_B64` /
     `ANTIGRAVITY_OAUTH_B64` / `GEMINI_OAUTH_B64`
3. 手順の詳細は `docs/setup.md` を参照

Secrets 未設定の間、`review_command.yml` / `review_reply.yml` は発火しません。
そのため Gate 1 のみでも安全に利用できます。

## Dockerfile 静的解析（超厳格）

Dockerfile には `hadolint`（ベストプラクティス）と `trivy config`（IaC 設定ミス検出）を適用します。
実行箇所は pre-commit と CI (`.github/workflows/ci.yml`) の両方です。
`info` レベル以上の指摘も全て失敗扱いにしています。
`main` / `dev` への push 時のみ、実際に `docker build` が最後まで通るかを検証する `docker-build`
ジョブも別途走ります（PR ごとには実行しません）。

## Docker seccomp プロファイル（任意）

`.seccomp/profile.json` は `mount` / `ptrace` / `unshare` 等の危険な syscall を制限する
seccomp プロファイルです。より厳格に実行したい場合は付与してください。

```bash
# compose.yaml の services.sandbox に追加する場合:
#   security_opt:
#     - seccomp=.seccomp/profile.json
```

## 既知の制約

- 以前 `Dockerfile` が参照していた `claude-settings.json` / `claude-skills/` はイメージから除去した。
  Claude Code の設定・スキルを事前投入したい場合は、該当ファイルを用意した上で `Dockerfile` に
  `COPY` 行を追加すること。
- AWS Bedrock 連携、および Gitea 連携（`tea` CLI・Gitea 向け SSH/HTTPS 認証）は廃止した。
  現在は GitHub 接続（SSH 鍵 + `gh` / `GH_TOKEN`）のみをサポートする。
