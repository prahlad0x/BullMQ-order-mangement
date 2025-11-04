import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter.js";
import { ExpressAdapter } from "@bull-board/express";
import {
  orderQueue,
  notificationQueue,
  smsQueue,
  deadLetterQueue,
} from "./queues/index.js";

const app = express();
app.use(bodyParser.json());

// API Routes
app.use("/api", routes);

// Bull Board Dashboard Setup
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [
    new BullAdapter(orderQueue),
    new BullAdapter(notificationQueue),
    new BullAdapter(smsQueue),
    new BullAdapter(deadLetterQueue),
  ],
  serverAdapter,
});

// Mount dashboard
app.use("/admin/queues", serverAdapter.getRouter());

export default app;
