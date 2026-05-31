# Hackathon
---
# CSC105-G14-pdivp-7-Days-To-Survive
**Project title:** Text-based resource management webgame **| Project name:** 7-Days-To-Survive

**68130500810** Kanticha Saeung — Profile editing, Achievements, User account & Authentication <br>
**68130500819** Boonyavee Wongngern — Ending gallery, Ending board, Leaderboard <br>
**68130500847** Nunticha Wareekhun — Entire Gameplay System <br>

---

## Project Scope
7  Days to Survive is a fun little resource management webgame made to temporarily bring attention back to those types of games. It allows you to think like a leader and make decisions that explore your morality. The game contains many endings that you receive based on your playstyle and overall stats, so the choice you make will be crucial in obtaining your ideal ending.

---

## Key Features

- **Gameplay:** The gameplay system revolves around managing your resources and making sure it doesn't reach 0, once it does, you lose the game. The scenario for each session depends on the role you pick.
- **Achievements:** Achievements from play sessions are recorded in the user’s profile. They are fun tidbits for players to collect and look back to.
- **Account Interactions:** The ability to edit your username and delete your account allows you to represent yourself differently to other users, while the deletion allows you to create a new account for a brand new adventure.
- **Saving Endings:** Players can save the endings that they like into the ending gallery.
- **Ending Gallery:** Players can come back to view the endings they got on their gallery.
- **Ending Board:** Inside the ending gallery is the ending board, in there, players can write up journal entries.
- **Leaderboard:** A ranked leaderboard displays top players by total score across all users.

---

## CRUD Features Implemented

**Users**
- Get user by ID
- Create new user (Register)
- Update user by ID (Edit Profile)
- Delete user by ID

---

## How to Run

**Backend**
```
cd Hackathon
cd Backend
npm install
npx prisma generate
npx prisma migrate dev --name "user table"
npm run dev
```

**Frontend**
```
cd Hackathon
cd Frontend
npm install
npm run dev
```

---

## API Endpoints

**Auth**
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login

---

## Tech Stack

| Layer | Stack |
|---|---|
| Frontend | React · TypeScript · Vite · Tailwind CSS · Axios |
| Backend | Node.js · Express.js · CORS · bcrypt |
| Database | Prisma ORM · SQLite (libsql) |
| Auth & Security | JWT · bcrypt (password hashing) |
| Validation | Zod |
| Routing | React Router DOM |

---
