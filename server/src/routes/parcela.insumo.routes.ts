// src/routes/parcelaInsumoRoutes.ts
import { Router } from "express";
import { getAllParcelaInsumos, getParcelaInsumoById, createParcelaInsumo, updateParcelaInsumo, deleteParcelaInsumo } from "../controllers/parcelainsumo.controller";

const router = Router();

router.get("/api/parcelaInsumos/", getAllParcelaInsumos);
router.get("/api/parcelaInsumos/:id", getParcelaInsumoById);
router.post("/api/parcelaInsumos/", createParcelaInsumo);
router.put("/api/parcelaInsumos/:id", updateParcelaInsumo);
router.delete("/api/parcelaInsumos/:id", deleteParcelaInsumo);

export default router;
