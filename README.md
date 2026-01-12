# 📝 Notes App – Frontend
This repository contains the frontend for the Notes application built using React and TypeScript.
It consumes the backend API and handles routing, UI, and protected views.

--- 

## 🚀 Features
- User login and registration

- Cookie-based authentication (no token handling in frontend)

- Protected dashboard route

- Notes creation and deletion

- Optimistic UI updates

- Responsive and clean UI

- Landing page for first-time users
---

## 🧠 Authentication Flow
- Frontend sends credentials to backend on login

- Backend sets JWT in an httpOnly cookie

- Browser automatically sends cookie with every request

- Protected routes are guarded using /auth/me

- Frontend never accesses JWT directly
---

## Project Structure
```text
src/
|-lib
  |-axios.ts
|-pages
  |-Dashboard.tsx
  |-LandingPage.tsx
  |-Login.tsx
  |-Register.tsx
|-routes
  |-ProtectedRoute.tsx
|-App.tsx
|-index.css
|-main.tsx
```
---

## 🛠 Tech Stack
- React

- TypeScript

- Tailwind CSS

- Axios

- React Router
---

## Running the Frontend
```bash
npm install
npm run dev
```
Make sure backend is running and Axios base URL is configured correctly.

---

## 📌 Notes
- Axios is configured with withCredentials: true

- UI updates locally after create/delete actions

- Authentication handled entirely via cookies

- Clean separation from backend logic
