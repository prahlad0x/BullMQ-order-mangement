import express from 'express';
import orderRoute from './orderRoute.js';
import emailRoute from './emailRoute.js';
import smsRoute from './smsRoute.js';

const router = express.Router();

router.use('/orders', orderRoute);
router.use('/notifications', emailRoute);
router.use('/notifications', smsRoute);

export default router;
