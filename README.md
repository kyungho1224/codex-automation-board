# Codex Board

Next.js와 TypeScript로 만든 서버 메모리 기반 게시판입니다. 개발 서버가 재시작되면 게시글과 댓글 데이터는 초기화됩니다.

## 시작하기

Node.js 20.9 이상이 필요합니다.

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 로컬 테스트 계정

등록 기능은 제품 범위에 포함되지 않습니다. 기본 개발 계정은 아래와 같으며 실제 서비스 자격 증명이 아닙니다.

- 이메일: `demo@example.com`
- 비밀번호: `demo-password`

로컬 `.env.local`에서 `TEST_USER_EMAIL`, `TEST_USER_PASSWORD`, `AUTH_SECRET`을 설정해 기본값을 덮어쓸 수 있습니다. `.env.local`은 Git에서 제외됩니다. `AUTH_SECRET`은 배포 환경에서 32자 이상의 무작위 값으로 반드시 설정해야 합니다.

## 검증

```bash
npm run typecheck
npm run lint
npm test
npm run build
```
