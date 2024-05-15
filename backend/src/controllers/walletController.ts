// backend/src/controllers/walletController.ts

import { Request, Response } from 'express';
import { Wallet } from '../models/Wallet';
import ExtendedRequest from '../types/extendedRequest'; 

export const createWallet = async (req: ExtendedRequest, res: Response) => {
  try {
    const { address, balance } = req.body;
    const userId = req.user?._id; // Get user ID from authenticated user

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Create new wallet
    const newWallet = new Wallet({ user: userId, address, balance });
    await newWallet.save();

    return res.status(201).json({ message: 'Wallet created successfully', wallet: newWallet });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getWallet = async (req: ExtendedRequest, res: Response) => {
  try {
    const userId = req.user?._id; // Get user ID from authenticated user

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Find wallet associated with the user
    const wallet = await Wallet.findOne({ user: userId });

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    return res.status(200).json({ wallet });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
