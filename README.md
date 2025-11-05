import { Badge } from '@chakra-ui/react'
import { Code } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'

# 🚀 BullMQ Order Management System <Badge colorScheme="green">v1.0.0</Badge>

> A modular and scalable **order management system** built with **Node.js**, **BullMQ**, and **Redis**, designed for managing distributed jobs, queues, and workers efficiently.  
> This system demonstrates retry handling, job tracking, and real-time monitoring via Bull Board.

---

## 🧩 Repository

[![GitHub Repository](https://img.shields.io/badge/GitHub-View%20Repo-black?logo=github)](https://github.com/prahlad0x/BullMQ-order-mangement)

```bash
https://github.com/prahlad0x/BullMQ-order-mangement.git
```

---

## 📦 Tech Stack

- **Node.js** (v18+)
- **BullMQ** (Queue system)
- **Redis** (In-memory job store)
- **Express.js** (Web server)
- **Bull Board** (Queue dashboard)
- **dotenv** (Environment configuration)

---

## 📂 Folder Structure

```bash
BullMQ-order-mangement/
│
├── src/
│   ├── config/
│   │   └── redis.js           # Redis connection config
│   ├── queues/
│   │   └── orderQueue.js      # Queue initialization
│   ├── workers/
│   │   └── orderWorker.js     # Worker consuming queue jobs
│   ├── utils/
│   │   └── retryHandler.js    # Retry logic for failed jobs
│   ├── routes/
│   │   └── queueRoutes.js     # Express routes for queue management
│   ├── app.js                 # Express app setup + Bull Board UI
│   └── server.js              # Server start script
│
├── .env.example               # Sample environment variables
├── package.json
└── README.mdx
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```bash
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
PORT=4000
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/prahlad0x/BullMQ-order-mangement.git
cd BullMQ-order-mangement
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start Redis (Docker recommended)

```bash
docker run -d -p 6379:6379 redis
```

### 4️⃣ Run the App

```bash
npm run dev
```

Your app should now be running on **http://localhost:4000**  
and the **Bull Board Dashboard** available at **http://localhost:4000/admin/queues**

---

## 🧠 Core Concepts

### 🧵 Queue Creation

Queues are created using **BullMQ**. Example:

```js
import { Queue } from 'bullmq';
import { redisConnection } from '../config/redis.js';

export const orderQueue = new Queue('orderQueue', { connection: redisConnection });
```

---

### ⚙️ Worker Setup

The worker listens to incoming jobs and processes them:

```js
import { Worker } from 'bullmq';
import { redisConnection } from '../config/redis.js';

export const orderWorker = new Worker(
  'orderQueue',
  async (job) => {
    console.log('Processing order:', job.data);
  },
  { connection: redisConnection }
);
```

---

### 🔁 Retry Mechanism

Custom retry logic using backoff and exponential delay:

```js
{
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 2000
  }
}
```

---

## 📊 Bull Board Dashboard

A real-time UI to monitor queues and jobs.

```js
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
```

Visit **http://localhost:4000/admin/queues** for:

✅ Job Monitoring  
✅ Retry / Delete Jobs  
✅ Pause / Resume Queues  
✅ View Active, Delayed, Failed Jobs

---

## 🧪 Example API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **POST** | `/add-order` | Adds a new order to queue |
| **GET** | `/orders` | View all queued jobs |
| **DELETE** | `/remove/:id` | Remove specific job |

---

## 🧱 Project Highlights

- 📦 Modular architecture  
- 🔁 Built-in retry mechanism  
- 🧠 Configurable concurrency  
- 💾 Redis-based persistent queues  
- 🧰 Real-time dashboard with Bull Board  
- 🔐 Environment variable support via `.env`

---

## 🧩 Integration Example (Queue + Chat/Call System)

This queue architecture can integrate directly into:
- Chat-based waiting systems (e.g., astrologer consultation queues)
- Call retry & scheduling flows
- Task/job retry systems for billing, notification, or report generation

---

## 🧹 Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Start app in development |
| `npm run start` | Run production build |
| `npm run lint` | Run linter |

---

## 🧰 Troubleshooting

**Error: "maxRetriesPerRequest must be null"**  
➡ Set this in your Redis config:

```js
maxRetriesPerRequest: null,
enableReadyCheck: false,
```

---

## 📜 License

MIT © 2025 [Prahlad0x](https://github.com/prahlad0x)

---

## 💬 Contact

For discussions, feature requests, or contributions —  
feel free to open an issue or PR on GitHub.

<Box bg="gray.800" color="white" p={3} borderRadius="md">
  <FaGithub /> <Code>github.com/prahlad0x/BullMQ-order-mangement</Code>
</Box>
