import { Request, Response, NextFunction } from "express";
import jwt from "jwt-simple";
import { envs } from "../environments/environments";

const { SECRET_TOKEN } = envs;

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extrae el token del encabezado
    

    if (token) {
        try {
            const decoded = jwt.decode(token, SECRET_TOKEN); // Decodifica el token
            (req as any).user = decoded; // Guarda el usuario decodificado en el objeto de solicitud
            console.log("Usuario autenticado:", (req as any).user);
            next(); // Pasa al siguiente middleware o controlador
        } catch (err) {
            return res.sendStatus(403); // Token no válido
        }
    } else {
        res.sendStatus(401); // No se proporcionó token
    }
};

