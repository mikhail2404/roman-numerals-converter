# Roman Numerals Converter

### React + Vite + Express + SQLite + Typescript + Tailwind + Docker Starter

<p align="center">
  <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/Typescript-v5.x-blue.svg?logo=TypeScript"></a>
  <a href="https://vitejs.dev/" target="_blank"><img src="https://img.shields.io/badge/Vite-frontend-646CFF.svg?logo=Vite"></a>
  <a href="https://reactjs.org/" target="_blank"><img src="https://img.shields.io/badge/React-v18.x-%238DD6F9.svg?logo=React"></a>
  <a href="https://expressjs.com/" target="_blank"><img src="https://img.shields.io/badge/Express-backend-000.svg?logo=Express"></a>
  <a href="https://www.sqlite.org/" target="_blank"><img src="https://img.shields.io/badge/SQLite-db-003B57.svg?logo=sqlite"></a>
  <a href="https://tailwindcss.com/" target="_blank"><img src="https://img.shields.io/badge/TailwindCSS-v3.x-38BDF8.svg?logo=tailwindcss"></a>
  <a href="https://eslint.org/" target="_blank"><img src="https://img.shields.io/badge/ESLint-configured-4B32C3.svg?logo=eslint"></a>
  <a href="https://prettier.io/" target="_blank"><img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg"></a>
  <a href="https://vitest.dev/" target="_blank"><img src="https://img.shields.io/badge/tested_with-vitest-6E4AFF.svg?logo=vitest"></a>
  <a href="https://github.com/codica2" target="_blank"><img src="https://img.shields.io/badge/licence-MIT-green.svg" /></a>
</p>

## Project stack

- React.js (Vite frontend)
- Express.js (Node backend)
- SQLite (database)
- Typescript (fullstack)
- Tailwind CSS
- ESLint & Prettier
- Vitest (frontend tests)
- Docker & Docker Compose

## How to use

```bash
# Frontend
cd frontend
yarn install
yarn dev

# Backend
cd backend
yarn install
yarn dev
```

### With Docker Compose

```bash
docker compose up --build
```
- Frontend: http://localhost:4173
- Backend: http://localhost:3001

## Environment variables

- Frontend: set `VITE_API_URL` (see docker-compose.yml for example)
- Backend: no special env needed for local dev

## Configuration

- ESLint, Prettier, and tsconfig are set up for both frontend and backend.
- Tweak them to your preferences.

## To see before coding

- [pure-functions-immutability-and-other-software-superpowers](https://medium.com/dailyjs/pure-functions-immutability-and-other-software-superpowers-dfe6039af8f6)
- [React Server Components](https://react.dev/reference/rsc)
- [Vite docs](https://vitejs.dev/guide/)
- [Express docs](https://expressjs.com/)
- [Tailwind best practices](https://tailwindcss.com/docs/utility-first) 