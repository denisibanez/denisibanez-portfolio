---
name: open-pr
description: Open a clean, scoped pull request — branch from origin/main, run the gates (type-check, lint, tests), commit with Conventional Commits, push, and open the PR via the web compare URL. Use when finishing a change that should become a PR.
---

# open-pr

1. **Pre-flight — don't build on a merged branch.** `git fetch origin` first. Then check
   the branch you're about to extend isn't already merged: `gh pr view <branch> --json state,url`
   (or `git merge-base --is-ancestor <branch-tip> origin/main`). **If a branch's PR is already
   merged, do NOT push more commits to it** — they get orphaned and never reach `main`
   (see gotcha below). Always start fresh from up-to-date `origin/main`.
2. **Branch:** `git checkout -b <type>/<slug> origin/main`. Never bundle unrelated WIP —
   carry only the intended change (cherry-pick or capture a patch and re-apply if needed).
3. **Gates must pass before committing:** `pnpm type-check` && `pnpm lint` &&
   `VITEST=1 npx vitest run --project '!storybook'` (NOT `pnpm test:unit` — that's watch mode).
   For refactors that touch prerendered pages, also `pnpm build`. Fix failures — never open a red PR.
4. **Commit — Conventional Commits:** `type(scope): subject` (feat/fix/refactor/test/chore/docs/ci).
   Imperative, ~50 chars; body explains WHY, not what. End the subject with `#NA`; end the body with
   the `Co-Authored-By` trailer.
5. **Push:** `git push -u origin <branch>`.
6. **Open via the web URL — `gh pr create` does NOT work here.** The `gh` CLI authenticates as
   a non-collaborator, so `gh pr create` always fails with `must be a collaborator`. Instead give
   the user a prefilled compare URL:
   `https://github.com/denisibanez/denisibanez-portfolio/compare/main...<branch>?expand=1`
   Prefill `&title=<enc>&body=<enc>` (URL-encode with a `node -e` one-liner) so they just click
   **Create pull request**. Body sections: **Summary**, **What changed**, **Verification**
   (gate results), **Notes/follow-ups**. End the body with the Claude Code footer line.
7. **Keep it scoped:** one concern per PR; separate deletion-only from feature changes when possible.

## ⚠️ Gotchas

1. **Merged-branch orphans (bit us hard).** A branch's PR can be merged at an *earlier* commit
   than its current tip (squash/merge-at-the-time). Commits added afterward sit on a closed
   branch and are **not in `main`** even though they're "on the branch". After any merge, verify
   with `git log --oneline origin/main..HEAD` (should be empty once merged) before continuing to
   build on that branch. To recover orphans: fresh branch from `origin/main`, `git cherry-pick`
   the missing commits, new PR.
2. **PR auth split.** SSH pushes as `denisibanez`; the `gh` CLI is `ibanezdenis2886` (not a
   collaborator). Pushing works; `gh pr create` doesn't. See the `pr-auth-split` memory.
