# Next.js Boilerplate

A modern **Next.js** starter project to kickstart your future apps with **authentication**, **protected routes**, and a solid **UI foundation**.

---

> **Authentication and user management** (registration, login, JWT tokens, refresh, logout, validation, editing user data, and changing password) are handled in a separate repository.  
> Kindly refer to [JWT_GO](https://github.com/boatman-27/JWT_GO) for full authentication implementation.

---

## Features

**Next.js 14+** — built with the latest best practices.  
**Reusable Navbar & Sidebar** — responsive layout for quick navigation.  
**Protected Routes** — simple `RequireAuth` component to secure pages.  
**Multifunctional Button** — a flexible button component for various actions.  
**User Context** — global state management for the authenticated user.  
**Full Authentication Flow**:

- Register new users
- Login & logout
- Persist sessions (user stays signed in on refresh)
- Validate user tokens  
   **Profile Management**:
- Edit user profile
- Change password

---

## Prerequisites

This boilerplate relies on a **separate authentication microservice** for user registration, login, JWT validation, etc.  
Make sure you have the [JWT_GO](https://github.com/boatman-27/JWT_GO) backend cloned, configured, and running **before** you start the Next.js dev server.

- Clone and run the backend: [JWT_GO](https://github.com/boatman-27/JWT_GO)

---

## Quick start

### 1. Clone the repository

```bash
git clone https://github.com/boatman-27/nextjsBoilerplate.git
cd nextjsBoilerplate
```

### 2. Install dependencies

```bash
bun install
# or
npm install
```

### 3. Set up `.env.local`

```env
# Use your auth microservice URL
AUTH_URL="http://localhost:8000/"
# or the port you chose in
```

### 4. Run the server

```bash
bun run dev
# or
npm run dev
```

---

## Available Scripts

```bash
bun run dev      # Start development server
bun run build    # Build for production
bun run start    # Start production server
bun run lint     # Run ESLint
```

---

## Deployment

This boilerplate can be deployed to platforms like **Vercel**, **Netlify**, or your own server.  
Remember to set your environment variables in the production environment.

---

## Contributing

Contributions are welcome!  
Please open issues and pull requests for improvements, fixes, or new features.

---

## License

This project is open-source under the MIT License.
