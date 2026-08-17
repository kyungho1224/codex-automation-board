# Implementation Direction

## Default Stack

For this test project use:

- Next.js
- TypeScript
- an appropriate maintained authentication/session approach
- in-memory server-side data only

Do not use PostgreSQL, Prisma, SQLite, an external database, or another persistent database.

## Test Purpose

This project exists to test Codex autonomous development workflow, not database infrastructure.

Keep the implementation simple and focus on:
- authentication behavior
- authorization
- posts
- comments
- user flows
- tests
- autonomous feature/PR workflow

## Data Storage

Store test data in server-side memory.

Required entities:

### User
- id
- email
- passwordHash or another safe test authentication representation
- name

### Post
- id
- title
- content
- authorId
- createdAt
- updatedAt

### Comment
- id
- content
- postId
- authorId
- createdAt
- updatedAt

Data may reset whenever the development server/process restarts. This is expected.

Seed at least one test user so login can be tested without implementing registration.

## Required Behavior

- Read posts: public, newest first
- Read post detail: public
- Create post: authenticated only
- Read comments: public, oldest first
- Create comment: authenticated only

## Authentication / Security

- Registration is not required.
- Do not store a real production password or secret in source control.
- Use test-only seeded credentials and document how to use them without exposing real credentials.
- Enforce write authorization server-side.
- UI visibility alone is not authorization.
- Validate required inputs.

## UI

No Figma is supplied for this test.

Create a simple, coherent, responsive interface.
Prioritize working core flows over decorative polish.
