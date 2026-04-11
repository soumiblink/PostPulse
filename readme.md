# PostPulse

A full-stack real-time post dashboard built with React, Node.js, MongoDB, and WebSockets.

Live demo → [post-pulse-cyan.vercel.app](https://post-pulse-cyan.vercel.app)

---

## Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS
- Recharts
- Framer Motion
- Axios
- React Router v7
- React Hot Toast

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- WebSocket (ws)
- CORS + dotenv

**Deployment**
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## Features

- Seed 100 posts from JSONPlaceholder on first load
- Real-time post updates via WebSocket (create, edit, delete)
- Live search with instant filtering
- Post trends chart
- Create, edit, and delete posts
- Responsive sidebar layout

---

## Project Structure

```
PostPulse/
├── backend/
│   ├── models/Post.js
│   ├── routes.js
│   ├── server.js
│   └── .env
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── hooks/
    │   ├── pages/
    │   └── services/
    ├── vercel.json
    └── .env
```

---

## Local Setup

**Prerequisites:** Node.js 18+, MongoDB Atlas account

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_WS_URL=ws://localhost:5000
```

```bash
npm run dev
```

App runs at `http://localhost:5173`

---

## Deployment

### Backend → Render

1. Connect your GitHub repo to Render
2. Set root directory to `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables:

```
MONGO_URI=your_atlas_connection_string
CLIENT_URL=https://your-vercel-app.vercel.app
```

### Frontend → Vercel

1. Connect your GitHub repo to Vercel
2. Set root directory to `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables:

```
VITE_API_URL=https://your-render-app.onrender.com/api
VITE_WS_URL=wss://your-render-app.onrender.com
```

### MongoDB Atlas

- Whitelist `0.0.0.0/0` under Network Access to allow Render's dynamic IPs

---

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/posts/init` | Seed posts from JSONPlaceholder |
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get single post |
| POST | `/api/posts` | Create a post |
| PUT | `/api/posts/:id` | Update a post |
| DELETE | `/api/posts/:id` | Delete a post |
| GET | `/` | Health check |

---

## WebSocket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `NEW_POST` | Server → Client | Broadcast when a post is created |
| `UPDATE_POST` | Server → Client | Broadcast when a post is updated |
| `DELETE_POST` | Server → Client | Broadcast when a post is deleted |

---

## License

MIT
