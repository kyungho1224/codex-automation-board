# Slack Notification Rules
## Delivery
Use environment variable `SLACK_WEBHOOK_URL`. Never commit or log its value.
Use `scripts/notify-slack.mjs` when configured.

## FEATURE_COMPLETE
After a bootstrap/feature PR is successfully merged, send feature, PR reference/link, summary, validation/CI status, and next selected work.

## QUESTION
Send affected feature, exact question, conflicting/missing requirement, useful options, BLOCKED status, and what independent work will continue.

## BLOCKED
Send task, blocker, attempted resolution, required input/access, and next independent work if any.

## SESSION_END
Send completed work, merged PRs, local-only work, blockers/questions, test/build/CI state, and recommended next work.

## Do Not Notify
Do not notify for installs, individual files/commits, normal test/lint runs, minor refactors, or retries.

Notification failure must not roll back correct implementation. Record it in CURRENT_STATE and continue safely.
