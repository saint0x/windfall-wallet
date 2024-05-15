// backend/src/models/User.ts

import { Schema, model } from 'mongoose';

interface User {
  username: string;
  password: string;
}

const userSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = model<User>('User', userSchema);
