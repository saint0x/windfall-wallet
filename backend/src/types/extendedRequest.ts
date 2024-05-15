// backend/src/types/extendedRequest.ts

import { Request } from 'express';
import { Document } from 'mongoose'; // Import Document type from mongoose
import { User } from '../models/User';

interface ExtendedRequest extends Request {
  user?: Document<typeof User>; // Define the user property with the Document type
}

export default ExtendedRequest;
