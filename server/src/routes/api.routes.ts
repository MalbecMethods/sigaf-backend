import { AuthController } from "../controllers/auth.controller";
import { Router } from "express";
 
const app = Router();
const userController = new AuthController();



app.get("/api/empleados", userController.getUsers);



export default app
