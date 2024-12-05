import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import bcryptjs from "bcryptjs";
import { TokenService } from "../services/token.service";

export class AuthController {
    async registerAdmin(req: Request, res: Response) {
        try {
            const { nombre, apellido, username, email, password, cuil, idEstablecimiento } = req.body;
            const role = "admin";
            console.log(req.body);

            const user = await AuthService.createUser(nombre, apellido, username, email, password, role, cuil, idEstablecimiento);
            const token = TokenService.generateToken(user);

            res.status(201).json({ token });
        } catch (error) {
            console.error("Error during register:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async registerUser(req: Request, res: Response) {
        try {
            const { nombre, apellido, username, email, password, cuil, establecimientoId } = req.body;
            const role = "user";

            console.log("---------------------");

            const user = await AuthService.createUser(nombre, apellido, username, email, password, role, cuil, establecimientoId);
            const token = TokenService.generateToken(user);

            res.status(201).json({ token });
        } catch (error) {
            console.error("Error during register:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const user = await new AuthService().getUserById(userId);

            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            res.status(500).json({ message: "Error interno del servidor", error: (error as Error).message });
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await new AuthService().getUserByRole("user");
            res.status(200).json(users);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async getUsersByEstablecimientoId(req: Request, res: Response) {
        try {
            const { establecimientoId } = req.params;
            const users = await new AuthService().getUserByEstablecimientoId(establecimientoId);
            res.status(200).json(users);
        } catch (error) {
            console.error("Error al obtener usuarios por establecimiento:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { username } = req.params;
            const user = await new AuthService().getUserByUsername(username);

            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            await new AuthService().deleteUser(username);
            res.status(200).json({ message: "Usuario eliminado correctamente" });
        } catch (error) {
            console.error("Error durante la eliminación del usuario:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async getUserByUsername(req: Request, res: Response) {
        try {
            const { username } = req.params;
            const user = await new AuthService().getUserByUsername(username);

            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error("Error al obtener el usuario por username:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async Login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const user = await new AuthService().getUserByUsername(username);

            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            if (bcryptjs.compareSync(password, user.password)) {
                const token = TokenService.generateToken(user);
                return res.status(200).json({ token });
            } else {
                return res.status(401).json({ message: "Credenciales inválidas" });
            }
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}
