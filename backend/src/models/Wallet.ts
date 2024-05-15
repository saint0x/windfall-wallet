// backend/src/models/Wallet.ts

import { Schema, model, Types } from 'mongoose';

interface Wallet {
  user: Types.ObjectId;
  address: string;
  balance: number;
}

const walletSchema = new Schema<Wallet>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: String, required: true },
  balance: { type: Number, default: 0 },
});

export const Wallet = model<Wallet>('Wallet', walletSchema);
