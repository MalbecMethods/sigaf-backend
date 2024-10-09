// src/types/express.d.ts
import * as express from "express";

declare global {
    namespace Express {
        interface Request {
            username?: any; // Aquí puedes especificar un tipo más específico si lo deseas
        }
    }
}
