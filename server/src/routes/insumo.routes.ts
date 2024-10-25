// src/routes/insumoRoutes.ts
import { Router } from "express";
import { getAllInsumos, getInsumoById, createInsumo, updateInsumo, deleteInsumo } from "../controllers/insumo.controller";

const router = Router();

router.get("/api/insumos/", getAllInsumos);
router.get("/api/insumos/:id", getInsumoById);
router.post("/api/insumos/", createInsumo);
router.put("/api/insumos/:id", updateInsumo);
router.delete("/api/insumos/:id", deleteInsumo);

export default router;
