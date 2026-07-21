---
name: open-pr
description: Open a clean, scoped pull request — branch from origin/main, run the gates (type-check, lint, tests), commit with Conventional Commits, push, and open the PR with a structured body. Use when finishing a change that should become a PR.
---

# open-pr

1. **Sync base & branch:** `git fetch origin` then `git checkout -b <type>/<slug> origin/main`. Never bundle unrelated WIP — carry only the intended change (capture a patch and re-apply on the fresh branch if needed).
2. **Gates must pass before committing:** `pnpm type-check` && `pnpm lint` && `pnpm test:unit`. Fix failures — never open a red PR.
3. **Commit — Conventional Commits:** `type(scope): subject` (feat/fix/refactor/test/chore/docs/ci). Imperative, ~50 chars; body explains WHY, not what.
4. **Push:** `git push -u origin <branch>`.
5. **Open:** `gh pr create --base main --title "..." --body "..."` with sections: **Summary**, **What changed**, **Verification** (gate results), **Notes/follow-ups**.
6. **Keep it scoped:** one concern per PR; separate deletion-only from feature changes when possible.
