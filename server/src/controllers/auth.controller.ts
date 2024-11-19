import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import bcryptjs from 'bcryptjs'
import { TokenService } from "../services/token.service";
import { error } from "console";


export class AuthController {

    async registerAdmin(req: Request, res: Response) {
        try {
            const { nombre, apellido, username, email, password, cuil} = req.body;
        const role = 'admin';
        console.log(req.body)
        const user = await AuthService.createUser(nombre, apellido, username, email, password, role, cuil);
        
        const token = TokenService.generateToken(user);
        res.status(201).json({ token });
        }catch{
            console.error('Error during register:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    async registerUser(req: Request, res: Response) {
        try{
            const { nombre, apellido, username, email, password, cuil } = req.body;
            const role = 'user';
            const user = await AuthService.createUser(nombre, apellido, username, email, password, role, cuil);
            const token = TokenService.generateToken(user);
            res.status(201).json({ token });
        }
        catch{

            console.error('Error during register:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    async getUsers(req: Request, res: Response) {
        const users = await new AuthService().getUserByRole('user');
        res.status(200).json(users);

    }

    async Login(req: Request, res: Response) {
        const { username, password } = req.body;
    
        try {
            const user = await new AuthService().getUserByUsername(username);
    
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
    
            if (bcryptjs.compareSync(password, user.password)) {
                const token = TokenService.generateToken(user);
                return res.status(200).json({ token });
            } else {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    
}
