import express from 'express';
import { smsQueue } from '../queues/index.js';

const router = express.Router();

// POST /notifications/sms
router.post('/sms', async (req, res) => {
  try {
    const { phone, message } = req.body;
    if (!phone || !message) return res.status(400).json({ message: 'phone and message required' });

    await smsQueue.add('send-sms', { phone, message });
    res.json({ message: `SMS job enqueued for ${phone}` });
  } catch (err) {
    console.error('SMS enqueue error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
