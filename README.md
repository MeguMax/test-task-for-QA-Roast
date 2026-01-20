<img width="1879" height="874" alt="image" src="https://github.com/user-attachments/assets/c4fb54ff-609e-4b2f-9a0e-5c5f78093744" />
<img width="1898" height="871" alt="image" src="https://github.com/user-attachments/assets/cb582de4-7ee1-4a09-8a1f-9b8e1dc55dcb" />
<img width="1899" height="877" alt="image" src="https://github.com/user-attachments/assets/a9e2a036-f516-46cb-9236-947d49226ba4" />
<img width="1902" height="876" alt="image" src="https://github.com/user-attachments/assets/0e6a354f-0885-4bb2-b6f0-6d571a833124" />
<img width="1876" height="873" alt="image" src="https://github.com/user-attachments/assets/d520e436-532b-435c-a1dc-30f20d9555ea" />
<img width="811" height="270" alt="image" src="https://github.com/user-attachments/assets/135866ea-457e-461c-9d05-d0e707e11ac9" />
<img width="814" height="262" alt="image" src="https://github.com/user-attachments/assets/d0cb0f0a-e04f-4c81-a825-bf9bdc8114d6" />

# Quiz Builder

A full-stack web application for creating and managing custom quizzes with multiple question types.

**Backend:** Node.js + Express + TypeScript + Prisma + SQLite  
**Frontend:** Next.js + React + TypeScript + Tailwind CSS

---

## Features

- Create quizzes with a **title** and one or more questions
- Supported question types:
  - **Boolean** – True/False
  - **Input** – short text answer
  - **Checkbox** – multiple choice with several options
- Dynamic add/remove of questions in the UI
- Quiz dashboard with:
  - List of all quizzes
  - Question count per quiz
  - Link to quiz details
  - Delete action with confirmation
- Quiz details page:
  - Read-only view of all questions
  - Proper rendering of input/checkbox/boolean structures
- Clean UX:
  - Toast notifications for success/errors
  - Custom confirmation modal (no browser alerts)
- Responsive layout (desktop and mobile)
- ESLint + Prettier configured

---

## Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- SQLite
- CORS

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 3
- Axios

---

## API Endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/quizzes` | Create a new quiz |
| GET | `/quizzes` | Get all quizzes |
| GET | `/quizzes/:id` | Get quiz by ID |
| DELETE | `/quizzes/:id` | Delete quiz |

### Request/Response Examples

**POST /quizzes**
```json
{
  "title": "JavaScript Basics",
  "questions": [
    { "type": "boolean", "text": "JS is dynamically typed" },
    { "type": "input", "text": "What does HTML stand for?" },
    {
      "type": "checkbox",
      "text": "Which are JS frameworks?",
      "options": ["React", "Vue", "Angular"]
    }
  ]
}
```

**GET /quizzes**
```json
[
  { "id": 1, "title": "JavaScript Basics", "questionCount": 4 },
  { "id": 2, "title": "Web Fundamentals", "questionCount": 3 }
]
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- Git

### Installation

#### 1. Clone Repository

```bash
git clone https://github.com/MeguMax/test-task-for-QA-Roast.git
cd test-task-for-QA-Roast
```

#### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev --name init
npx prisma generate
npm run seed
npm run dev
```

Backend runs on: `http://localhost:5000`

#### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Frontend runs on: `http://localhost:3000`

---

## Usage

1. **Home Page** - Entry point with two main actions
2. **Create Quiz** - Form to build a new quiz with questions
3. **Quiz List** - View all quizzes, click to see details or delete
4. **Quiz Details** - Read-only view of quiz structure

---

## Development Scripts

### Backend

```bash
npm run dev      # Start dev server
npm run build    # Compile TypeScript
npm run seed     # Populate database
npm run lint     # Run ESLint
npm run format   # Format code
```

### Frontend

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run format   # Format code
```

---

## Troubleshooting

### Port Already in Use

Change `PORT` in `backend/.env` or run frontend with:
```bash
PORT=3001 npm run dev
```

### Database Issues

```bash
cd backend
rm prisma/dev.db
npx prisma migrate dev --name init
npm run seed
```

### Dependencies Issues

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## License

MIT

## Author

Artem Serdyuk

---

**Built for QA Roast**
