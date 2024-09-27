import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import bcryptjs from 'bcryptjs'
import { TokenService } from "../services/token.service";


export class AuthController {

    async registerAdmin(req: Request, res: Response) {
        const { nombre, apellido, username, email, password, cuil} = req.body;
        const role = 'admin';
        console.log(req.body)
        const user = await AuthService.createUser(nombre, apellido, username, email, password, role, cuil);
        
        const token = TokenService.generateToken(user);
        res.status(201).json({ token });
    }

    async registerUser(req: Request, res: Response) {
        const { nombre, apellido, username, email, password, cuil } = req.body;
        const role = 'user';
        const user = await AuthService.createUser(nombre, apellido, username, email, password, role, cuil);
        const token = TokenService.generateToken(user);
        res.status(201).json({ token });
    }

    async getUsers(req: Request, res: Response) {
        const users = await new AuthService().getUserByRole('user');
        res.status(200).json(users);

    }

    async Login(req: Request, res: Response) {
        const { username, password } = req.body;
        const user = await new AuthService().getUserByUsername(username);
        if (bcryptjs.compareSync(password, user.password)) {
            const token =  TokenService.generateToken(user);
            res.status(200).json({ token});
        } else {    
            res.status(401).json({ message: 'Credenciales inválidas' });
        }      
    }

    
}
