# AME-AI-Sandbox landing page

AME-AI-Sandbox を紹介するランディングページです（Issue #13）。
Vite + React + TypeScript + Tailwind CSS で構築しています。`main` への push で
[GitHub Pages](https://tarminjapan.github.io/AME-AI-Sandbox/) へ自動デプロイされます
(`.github/workflows/pages.yml`)。

デザインは `.claude/skills/ame-ui-philosophy/SKILL.md`（移植元:
[AME-AI-Review-System](https://github.com/tarminjapan/AME-AI-Review-System)）の規定に従います。

## コマンド

```bash
npm install
npm run dev      # 開発サーバー
npm run build    # 本番ビルド (dist/)
npm run lint     # oxlint
```
