// src/routes/campaniaInsumoRoutes.ts
import { Router } from "express";
import { getAllCampaniaInsumos, getCampaniaInsumosById, createCampaniaInsumo, updateCampaniaInsumo, deleteCampaniaInsumo } from "../controllers/campaniainsumo.controller";

const router = Router();

router.get("/api/campaniaInsumos/", getAllCampaniaInsumos);
router.get("/api/campaniaInsumos/:id", getCampaniaInsumosById);
router.post("/api/campaniaInsumos/", createCampaniaInsumo);
router.put("/api/campaniaInsumos/:id", updateCampaniaInsumo);
router.delete("/api/campaniaInsumos/:id", deleteCampaniaInsumo);

export default router;
