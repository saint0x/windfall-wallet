// backend/src/routes/walletRoutes.ts

import express from 'express';
import { createWallet, getWallet } from '../controllers/walletController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create', authenticateToken, createWallet);
router.get('/', authenticateToken, getWallet);

export default router;
