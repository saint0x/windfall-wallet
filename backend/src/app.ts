// backend/src/app.ts

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorMiddleware';

const app: Application = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan);
app.use(express.json());

// Routes
// Add your route imports here

// Error handling middleware
app.use(errorHandler);

export default app;
