import { Request, Response, NextFunction } from "express";
import jwt from "jwt-simple";
import { envs } from "../environments/environments";

const { SECRET_TOKEN } = envs;

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        try {
            const decoded = jwt.decode(token, SECRET_TOKEN);
            (req as any).user = decoded; // Aquí es donde se añade el usuario al req
            console.log("Usuario autenticado:", (req as any).user);
            next();
        } catch (err) {
            return res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
};
