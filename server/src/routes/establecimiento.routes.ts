import { Router } from "express";
import { EstablecimientoController } from "../controllers/establecimiento.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const establecimientoRoutes = Router();
const establecimientoController = new EstablecimientoController();

establecimientoRoutes.post("/api/establecimiento", authenticateJWT, establecimientoController.registerEstablecimiento);
establecimientoRoutes.get("/api/establecimientos", authenticateJWT, establecimientoController.getEstablecimientos);
establecimientoRoutes.get("/api/establecimiento/:id", authenticateJWT, establecimientoController.getEstablecimientoById);

export default establecimientoRoutes;
