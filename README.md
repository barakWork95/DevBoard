# DevBoard

A full-stack project management SaaS inspired by Jira and Linear — built as a flagship portfolio project.

🔗 **[Live Demo](https://dev-board-five.vercel.app)** · 📖 **[API Docs](https://devboard-backend-uuly.onrender.com/api/docs)**

> ⚠️ The backend is hosted on Render's free tier and may take 30–60 seconds to wake up on first request.

---

## Features

- **Authentication** — Register, login, logout with JWT access + refresh token rotation and Redis blocklist
- **Projects** — Create, update, delete projects; invite members by email
- **Kanban Board** — Drag and drop tasks across status columns (dnd-kit) with optimistic updates
- **Task Management** — Create, edit, delete tasks with title, description, status, priority, labels, and assignee
- **Dashboard** — Live stats: total projects, tasks by status, recent projects and tasks
- **Fully Responsive** — Jira-inspired light theme with MUI + Tailwind

---

## Tech Stack

### Frontend

- React 18 + TypeScript
- Tailwind CSS + MUI (Material UI)
- Zustand (global auth state)
- TanStack Query (server state + optimistic updates)
- React Router v6
- dnd-kit (drag and drop)

### Backend

- Node.js + Express + TypeScript
- Prisma 7 (ORM)
- PostgreSQL (primary database)
- Redis (refresh token blocklist)
- Zod (request validation)
- JWT (access + refresh token auth)
- Swagger UI (`/api/docs`)

### Shared

- `@devboard/shared` — Zod schemas and TypeScript types shared between frontend and backend via monorepo

### Infrastructure

- Docker Compose (local PostgreSQL + Redis)
- Render (production backend + PostgreSQL + Redis)
- Vercel (production frontend)

---

## Architecture

### Backend — Layered Architecture

```
Request → Middleware → Route → Controller → Service → Repository → Prisma → PostgreSQL
                                                                        ↓
                                                                Redis (auth only)
```

| Layer          | Responsibility                                         |
| -------------- | ------------------------------------------------------ |
| **Middleware** | JWT authentication + Zod validation                    |
| **Routes**     | Map HTTP method + path to controller                   |
| **Controller** | Extract from `req`, call service, return HTTP response |
| **Service**    | Business logic + authorization checks                  |
| **Repository** | All Prisma queries — no business logic                 |

### Frontend — Data Flow

```
Component → TanStack Query hook → Axios (with interceptor) → Backend API
                ↓
         Optimistic updates (onMutate / onError / onSettled)
         Zustand (auth state only)
```

---

## API Overview

### Auth (`/api/auth`) — public

| Method | Endpoint             | Description                                |
| ------ | -------------------- | ------------------------------------------ |
| POST   | `/api/auth/register` | Register a new user                        |
| POST   | `/api/auth/login`    | Login, returns access + refresh tokens     |
| POST   | `/api/auth/logout`   | Invalidate refresh token (Redis blocklist) |
| POST   | `/api/auth/refresh`  | Issue new access token                     |

### Projects (`/api/projects`) — protected

| Method | Endpoint                    | Description                        |
| ------ | --------------------------- | ---------------------------------- |
| GET    | `/api/projects`             | Get all projects (owner or member) |
| POST   | `/api/projects`             | Create a new project               |
| GET    | `/api/projects/:id`         | Get project by ID                  |
| PATCH  | `/api/projects/:id`         | Update project (owner only)        |
| DELETE | `/api/projects/:id`         | Delete project (owner only)        |
| GET    | `/api/projects/:id/members` | Get project members                |
| POST   | `/api/projects/:id/members` | Invite members by email            |

### Tasks (`/api/tasks`) — protected

| Method | Endpoint                  | Description                 |
| ------ | ------------------------- | --------------------------- |
| GET    | `/api/tasks?projectId=`   | Get all tasks for a project |
| POST   | `/api/tasks`              | Create a new task           |
| GET    | `/api/tasks/:id`          | Get task by ID              |
| PATCH  | `/api/tasks/:id`          | Update task fields          |
| PATCH  | `/api/tasks/:id/status`   | Update task status          |
| PATCH  | `/api/tasks/:id/assignee` | Reassign task               |
| DELETE | `/api/tasks/:id`          | Delete task                 |

### Stats (`/api/stats`) — protected

| Method | Endpoint     | Description                                |
| ------ | ------------ | ------------------------------------------ |
| GET    | `/api/stats` | Get dashboard stats for authenticated user |

---

## Data Models

```prisma
model User          // id, email, name, role, password
model Project       // id, name, ownerId, status, members[], tasks[]
model Task          // id, title, description, status, priority, labels[], creatorId, assigneeId, projectId
model ProjectMember // userId, projectId
```

---

## Auth Flow

1. Register/Login → returns `accessToken` (15m) + `refreshToken` (7d)
2. All protected routes require `Authorization: Bearer <accessToken>`
3. On 401 → Axios interceptor automatically calls `POST /api/auth/refresh` → retries original request
4. Logout → `refreshToken` added to Redis blocklist with TTL

---

## Running Locally

### Prerequisites

- Node.js 18+
- Docker + Docker Compose

```bash
# 1. Clone the repo
git clone https://github.com/barakWork95/DevBoard.git
cd DevBoard

# 2. Start PostgreSQL + Redis
docker-compose up -d

# 3. Set up backend
cd backend
cp .env.example .env   # fill in JWT_SECRET and JWT_REFRESH_SECRET
npm install
npx prisma migrate dev
npm run dev
# API available at http://localhost:3000
# Swagger UI at http://localhost:3000/api/docs

# 4. Set up shared package (in a new terminal)
cd shared
npm install && npm run build

# 5. Set up frontend (in a new terminal)
cd frontend
cp .env.example .env   # set VITE_API_URL=http://localhost:3000
npm install
npm run dev
# App available at http://localhost:5173
```

---

## Project Structure

```
DevBoard/
├── backend/
│   ├── src/
│   │   ├── config/         # Prisma client
│   │   ├── controllers/    # Request handlers
│   │   ├── db/             # Redis client
│   │   ├── middleware/     # authenticate, validate
│   │   ├── repositories/   # Prisma queries
│   │   ├── routes/         # Express routers
│   │   ├── services/       # Business logic
│   │   └── types/          # Express type extensions
│   └── server.ts
├── frontend/
│   └── src/
│       ├── app/
│       │   ├── core/       # Hooks, services, constants
│       │   ├── components/ # Shared UI components
│       │   ├── routing/    # React Router setup
│       │   ├── store/      # Zustand auth store
│       │   └── views/      # Pages (Dashboard, Projects, Kanban, Task)
│       └── main.tsx
├── shared/
│   └── types/              # Zod schemas + inferred TS types
└── docker-compose.yml
```

---

## Sprint History

| Sprint     | Focus                                                                             | Status  |
| ---------- | --------------------------------------------------------------------------------- | ------- |
| Sprint 1–3 | Architecture planning, monorepo setup, DB schema                                  | ✅ Done |
| Sprint 4   | Full backend — Auth, Projects CRUD, Tasks CRUD, Zod validation                    | ✅ Done |
| Sprint 5   | Frontend foundation — routing, auth flow, Axios interceptor, Zustand              | ✅ Done |
| Sprint 6   | Projects & Collaboration — Projects list, Project detail, Invite members          | ✅ Done |
| Sprint 7   | Tasks & Kanban Board — dnd-kit drag and drop, create task modal, task detail page | ✅ Done |
| Sprint 8   | Polish & Design — MUI ThemeProvider, Inter font, Sidebar, Navbar, page polish     | ✅ Done |
| Sprint 9   | Dashboard, Task editing, Login/Register polish, Deployment                        | ✅ Done |
