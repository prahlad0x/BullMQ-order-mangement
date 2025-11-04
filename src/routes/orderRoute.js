import express from 'express';
import { orderQueue } from '../queues/index.js';

const router = express.Router();

// POST /orders
router.get('/', async (req, res) => {
  try {
    const { orderId = Math.random(), userEmail = `${Math.random()}@gmail.com` } = req.body;
    if (!orderId || !userEmail) return res.status(400).json({ message: 'orderId and userEmail required' });

    await orderQueue.add('process-order', { orderId, userEmail });
    res.json({ message: `Order ${orderId} enqueued` });
  } catch (err) {
    console.error('Order enqueue error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
