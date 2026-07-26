# AME-AI-Sandbox

Claude Code / OpenCode / Antigravity CLI をコンテナ内で動かすための開発用 Docker サンドボックスです。
Ubuntu 24.04 LTS をベースに、Python 3.14 (uv 管理) ・ Node.js v24 ・ Go ・ GitHub CLI (`gh`) を含みます。

設定値はすべてファイルから読み込むため、コマンドの引数で都度渡す必要はありません（Issue #3）。

- 環境変数（`GH_TOKEN`, `GIT_AUTHOR_NAME`, `SSH_HOST_DIR` 等） → `.env`
- sudo パスワード（BuildKit secret） → `secrets/user_password.txt`
- SSH 鍵 → `.env` の `SSH_HOST_DIR` で指定したホストディレクトリ

## 初回セットアップ

### 1. 環境変数ファイルの作成

```bash
cp .env.example .env
# .env を編集して以下を埋める:
#   - GH_TOKEN            : GitHub PAT（gh / git HTTPS 認証）
#   - GIT_AUTHOR_NAME     : git commit の著者名
#   - GIT_AUTHOR_EMAIL    : git commit のメールアドレス
#   - SSH_HOST_DIR        : ホスト側の SSH 鍵ディレクトリ（絶対パス必須）
```

> `SSH_HOST_DIR` は必須です。未設定の場合、`docker compose` が起動時にエラーで停止します。
> `~` を指定すると Compose 変数展開で解釈されない場合があるため、`/home/<user>/.ssh` のような絶対パスを推奨します。

### 2. sudo パスワードファイルの作成

```bash
mkdir -p secrets
cp secrets/user_password.txt.example secrets/user_password.txt
# secrets/user_password.txt を編集し、コンテナ内 ai-developer ユーザーの sudo パスワードを記載
```

> `secrets/user_password.txt` と `.env` は `.gitignore` で除外されています。
> sudo パスワードは BuildKit secret mount 経由で渡され、`docker history` 等のイメージメタデータに残りません。

### 3. （任意）ホスト UID/GID の調整

既定では `ai-developer` ユーザーの UID/GID は `1000:1000` です。
ホストと合わせたい場合は `.env` に追記してください。

```bash
USER_UID=1000
USER_GID=1000
```

## 使い方

```bash
# Docker イメージをビルド
docker compose build

# コンテナをバックグラウンド起動
docker compose up -d

# コンテナに入る（対話シェル）
docker compose exec sandbox bash

# 終了時: コンテナを停止
docker compose down
```

## 各CLIの使い方

| CLI | 起動コマンド | 認証方法 |
| --- | --- | --- |
| Claude Code | `claude` | 対話ログイン、または `ANTHROPIC_API_KEY` 環境変数 |
| OpenCode | `opencode` | `opencode auth login`（対話）、またはプロバイダごとの API キー環境変数（例: `ANTHROPIC_API_KEY`） |
| Antigravity CLI | `agy` | ヘッドレス環境では URL + ワンタイムコードによる対話認証、または `ANTIGRAVITY_API_KEY` 環境変数（Google AI Studio で取得） |
| GitHub CLI | `gh` | `GH_TOKEN` 環境変数で entrypoint 起動時に自動ログイン済み |

API キーは `.env` に記載すれば、コンテナ起動直後から非対話的に利用できます。

## セキュリティに関する注記

- **SSH 鍵はビルド時にイメージへ焼き込まない。** 代わりに、実行時はホストの鍵を読み取り専用で bind-mount する。
  マウント元は `.env` の `SSH_HOST_DIR` で指定し、`entrypoint.sh` がコンテナ起動時に書き込み可能な `~/.ssh` へコピーする。
  イメージレイヤーやコミット履歴に鍵 material は残らない。
- GitHub のホスト鍵は `ssh-keyscan` で `known_hosts` に登録しており、
  `StrictHostKeyChecking no` のような検証無効化は行っていません。
- `GH_TOKEN` は環境変数として渡され、`gh` の credential helper が動的に解決するため、
  `~/.git-credentials` のような平文ファイルには保存されません。
- sudo パスワードは BuildKit の secret mount 機構でビルド時にのみ渡され、
  イメージの `ARG` / `ENV` や `docker history` には一切残りません。

## 開発・レビュー（AME-AI-Review-System）

本リポジトリには二段ゲート方式の AI コードレビュー基盤（`ame_ai_review_system/`）が組み込まれています。
詳細は [`ame_ai_review_system/README.md`](ame_ai_review_system/README.md) を参照してください。
