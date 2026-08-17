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

### 2026-08-18 — Stateless authentication sessions
- Decision: Use `jose` to issue seven-day HS256 session tokens containing only the seeded user's ID. Store them in an HttpOnly, SameSite=Lax, path-scoped cookie that is Secure in production. Require a 32-character `AUTH_SECRET` in production while retaining a documented test-only development fallback.
- Reason/context: The application intentionally has no persistent database, and Next.js 16 recommends Jose or Iron Session for stateless sessions. A centralized server-only data access layer resolves the token back to the current in-memory user before authorization.
- Affected feature(s): Login, logout, protected post/comment creation, authenticated navigation.
