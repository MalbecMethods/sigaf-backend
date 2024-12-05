import { AuthController } from "../controllers/auth.controller";
import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";

const app = Router();
const userController = new AuthController();

// Rutas para autenticación y usuarios
app.post("/auth/register", userController.registerAdmin); // Registrar administrador
app.post("/auth/registerEmpleado", authenticateJWT, userController.registerUser); // Registrar empleado (con autenticación)
app.post("/auth/login", userController.Login); // Iniciar sesión

// Rutas para gestión de usuarios
app.get("/api/empleados", authenticateJWT, userController.getUsers); // Obtener todos los empleados
app.get("/api/empleados/:username", userController.getUserByUsername); // Obtener empleado por nombre de usuario
app.delete("/api/empleados/:username", authenticateJWT, userController.deleteUser); // Eliminar empleado por nombre de usuario
app.get("/api/empleados/ue/:establecimientoId", authenticateJWT, userController.getUsersByEstablecimientoId); // Obtener empleados por ID de establecimiento
app.get("/api/empleados/id/:id", authenticateJWT, userController.getUserById); // Obtener empleado por ID

export default app;
