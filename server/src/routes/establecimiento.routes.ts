import { Router } from "express";
import { EstablecimientoController } from "../controllers/establecimiento.controller";

const establecimientoRoutes = Router();
const establecimientoController = new EstablecimientoController();

establecimientoRoutes.post("/api/establecimiento", establecimientoController.registerEstablecimiento);
establecimientoRoutes.get("/api/establecimientos", establecimientoController.getEstablecimientos);
establecimientoRoutes.get("/api/establecimiento/:id", establecimientoController.getEstablecimientoById);

export default establecimientoRoutes;
