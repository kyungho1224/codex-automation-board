# Confirmed Decisions
Newer confirmed decisions here override older ambiguity where applicable.

## Initial Decisions

### Data Storage
This test uses server-side in-memory data only.
No PostgreSQL, Prisma, SQLite, or external/persistent database should be introduced.
Data loss on server restart is acceptable.

- Anonymous users can read posts/comments.
- Authenticated users can additionally create posts/comments.
- Registration is out of scope; a test account may be seeded.
- Post/comment editing and deletion are out of scope.

## Decision Log Template
### YYYY-MM-DD — Title
- Decision:
- Reason/context:
- Affected feature(s):
