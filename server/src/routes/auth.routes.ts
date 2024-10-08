import { AuthController } from "../controllers/auth.controller";
import { Router } from "express";
 
const app = Router();
const userController = new AuthController();


app.post("/auth/register", userController.registerAdmin);
app.post("/auth/registerEmpleado", userController.registerUser);
app.get("/api/empleados", userController.getUsers);
app.post("/auth/login", userController.Login); 


export default app
