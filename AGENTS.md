# Codex Autonomous Development Rules

## Mission
This folder may start with only these project documents. Build the application from scratch and continue autonomously until the PRD is complete, no safe work remains, or the configured session ends.

## Source of Truth
Before work, read:
1. `docs/PROJECT.md`
2. `docs/PRD.md`
3. `docs/IMPLEMENTATION.md`
4. `docs/CURRENT_STATE.md`
5. `docs/DECISIONS.md`
6. `docs/NOTIFICATIONS.md`

Product behavior follows PRD. Technical direction follows IMPLEMENTATION. Later confirmed decisions in DECISIONS override older ambiguity. Material unresolved conflicts become BLOCKED.

## Phase 0 — Repository Initialization
If this is not a Git repository:
1. Confirm this directory is the project root.
2. Run `git init`.
3. Set the default branch to `main`.
4. Verify `.gitignore` before adding generated files/secrets.
5. Never commit `.env`, `.env.local`, credentials, tokens, webhook URLs, or secrets.
6. Preserve these instruction documents.
7. Create the initial repository/documentation commit.
8. If a remote already exists, use it.
9. If no remote exists and authenticated GitHub tooling can safely create one, create/configure it.
10. If remote creation needs unavailable access/user input, mark it BLOCKED but continue local work where safe.

## Phase 1 — Bootstrap
If no runnable app exists:
1. Read all project docs.
2. Use the documented stack.
3. Create branch `chore/bootstrap`.
4. Scaffold the minimum runnable application.
5. Install dependencies and establish project structure.
6. Configure typecheck, lint, build, and appropriate test foundation.
7. Configure the in-memory server-side data layer required by IMPLEMENTATION.md. Do not add a persistent database.
8. Create `.env.example` with names only.
9. Verify `.gitignore`.
10. Verify build and, when practical, app startup.
11. Update CURRENT_STATE.
12. Commit, push, create PR, check CI, and merge using the workflow below when a remote is available.

Do not add optional product features during bootstrap.

## Work Selection
After bootstrap choose work autonomously in this priority:
1. blockers preventing execution
2. required foundations/dependencies
3. authentication/authorization
4. core user flows
5. remaining PRD requirements
6. loading/error/empty states
7. accessibility/UI quality
8. tests/necessary cleanup

## Feature Units
Use independently reviewable units such as authentication, post-list, post-detail, post-creation, comment-list, comment-creation. Do not mix unrelated features in one PR.

## Branch → PR → Merge Workflow
For every unit:
1. Ensure prior work is safely committed.
2. Return to `main`.
3. Fetch/pull latest `main` if remote exists.
4. Re-read relevant docs and CURRENT_STATE.
5. Select the next unit.
6. Create `feature/<name>`, `fix/<name>`, or `chore/bootstrap`.
7. Implement only that scope and necessary support.
8. Add/update tests.
9. Update CURRENT_STATE in the same branch.
10. Run relevant validation.
11. Commit.
12. Push when remote exists.
13. Create PR targeting `main`.
14. Check required CI.
15. Fix failures on the same branch and revalidate.
16. Merge only when all conditions pass; prefer squash merge.
17. Return to `main`, pull merged state, delete merged branch when safe.
18. Reassess and immediately choose the next unit.
19. Repeat.

If no remote exists, continue with local branches/commits, record PR capability as BLOCKED, and never pretend a PR was created or merged.

## Validation / Merge Safety
Run applicable typecheck, lint, unit/integration tests, build, and end-to-end/user-flow tests.

Never auto-merge if required CI/build/tests fail, conflicts exist, correctness depends on an unresolved product question, destructive DB changes exist, or secrets are present.

Never force-push main, bypass required protection, perform destructive data operations outside the disposable in-memory test data, commit secrets, or disable tests merely to pass.

## Authorization Rules
Anonymous users can read posts/comments but cannot create them.
Authenticated users can read and create posts/comments.
Write authorization must be enforced server-side; hidden UI alone is insufficient.

## Questions / BLOCKED
Ask only for material product conflicts, missing policy, destructive operations, major architecture replacement, unavailable required access, or requirements with no safe interpretation.

When blocked:
1. Record in CURRENT_STATE.
2. Notify per NOTIFICATIONS.
3. Continue another independent task if possible.

Ordinary engineering choices (file organization, naming, standard validation, loading/error/empty states, test organization, small local refactors) should be decided autonomously.

## Slack
Follow `docs/NOTIFICATIONS.md`. Credentials come only from the environment variable `SLACK_WEBHOOK_URL`. Never print or commit it. If `scripts/notify-slack.mjs` exists and the variable is available, use it for FEATURE_COMPLETE, QUESTION, BLOCKED, SESSION_END.

## Autonomous Loop
Continue until all PRD requirements are complete, no implementable work remains, a critical environment problem prevents work, all remaining work needs user input, or the configured session ends.

At session end update CURRENT_STATE, safely commit work, and send SESSION_END when Slack is configured.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
