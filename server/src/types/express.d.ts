// src/types/express.d.ts
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: string; // o el tipo que necesites
        username: string;
        role: string;
      };
    }
  }
}
