# HMS Front-End

The Next.js 14 frontend for the Hospital Management System.

## Tech Stack
- **Next.js 14** — App Router, Server Components
- **NextAuth.js v5** — Authentication via Keycloak OIDC
- **Tailwind CSS** — Styling
- **TypeScript** — Type safety
- **TanStack Query** — Server state management
- **Zustand** — Client state management
- **Lucide React** — Icons

## Prerequisites
- Node.js 18+
- **HMS Backend must be running first** (`docker compose up -d` in `HMS-Backend/`)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

App runs at: **http://localhost:3000**

## Environment Variables

The `.env` file is pre-configured. Values are:

| Variable                | Description                         |
|-------------------------|-------------------------------------|
| `KEYCLOAK_ISSUER`       | Keycloak realm URL                  |
| `KEYCLOAK_CLIENT_ID`    | OAuth client ID                     |
| `KEYCLOAK_CLIENT_SECRET`| OAuth client secret                 |
| `NEXTAUTH_URL`          | Next.js app base URL                |
| `AUTH_SECRET`           | NextAuth session encryption secret  |

## Pages

| Route           | Description                             |
|-----------------|-----------------------------------------|
| `/login`        | Keycloak SSO sign-in                    |
| `/dashboard`    | KPI overview, charts, quick stats       |
| `/patients`     | Patient list, search, detail modal      |
| `/appointments` | Appointment cards, filters, booking     |
| `/doctors`      | Doctor profiles, ratings, search        |
| `/departments`  | Department stats and bed occupancy      |
| `/settings`     | Profile, notifications, security, theme |
