import { Router } from "express";
import { IaRespuestaController } from "../controllers/iaRespuesta.controller";

const iaRespuestaRoutes = Router();
const iaRespuestaController = new IaRespuestaController();

iaRespuestaRoutes.post("/api/IaRespuesta", iaRespuestaController.createIaRespuesta);
iaRespuestaRoutes.get("/api/IaRespuestas/:establecimientoId", iaRespuestaController.getIaRespuestasByEstablecimiento);
iaRespuestaRoutes.get("/api/IaRespuestas", iaRespuestaController.getAllIaRespuestas);
iaRespuestaRoutes.get("/api/IaRespuesta/:id", iaRespuestaController.getIaRespuestaById);
iaRespuestaRoutes.delete("/api/IaRespuesta/:id", iaRespuestaController.deleteIaRespuestaById);

export default iaRespuestaRoutes;
