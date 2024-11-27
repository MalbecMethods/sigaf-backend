import { Router } from "express";
import { ParcelaController } from "../controllers/parcela.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const parcelaRoutes = Router();
const parcelaController = new ParcelaController();

parcelaRoutes.post("/api/parcela", authenticateJWT, parcelaController.createParcela);
parcelaRoutes.get("/api/parcelas/:establecimientoId", authenticateJWT, parcelaController.getParcelasByEstablecimiento);
parcelaRoutes.get("/api/parcelas", authenticateJWT, parcelaController.getAllParcelas);
parcelaRoutes.get("/api/parcela/:id", parcelaController.getParcelaById);

export default parcelaRoutes;