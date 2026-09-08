# ProntoPaga - Frontend

React + TypeScript SPA for querying financial credit scores via RUT.

## Tech Stack

- React 18 + TypeScript
- Vite
- CSS (no UI library)

## Setup

```bash
npm install
npm run dev
```

App runs at http://localhost:5176

Make sure the backend is running at http://localhost:3000 before using the app.

Features
JWT-based login
Credit score query by RUT
Role-based access control (users can only query their own RUT)
Color-coded score gauge (green / yellow / red)
Error handling for invalid credentials and unauthorized access

Mock credentials
Username Password Role
pguzman 1234 admin
mrobles 1234 user
AI Usage
See ai_interactions.md
