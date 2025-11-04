import express from 'express';
import { notificationQueue } from '../queues/index.js';

const router = express.Router();

// POST /notifications/email
router.post('/email', async (req, res) => {
  try {
    const { to, subject, html } = req.body;
    if (!to || !subject || !html) return res.status(400).json({ message: 'to, subject, and html required' });

    await notificationQueue.add('send-notification', { userEmail: to, subject, html });
    res.json({ message: `Email job enqueued for ${to}` });
  } catch (err) {
    console.error('Email enqueue error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
