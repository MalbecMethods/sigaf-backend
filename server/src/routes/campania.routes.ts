// src/routes/campaniaRoutes.ts
import { Router } from "express";
import { getAllCampanias, getCampaniaById, createCampania, updateCampania, getCampaniasByParcelaId, getCampaniasByEstablecimiento, deleteCampania, endCampania } from "../controllers/campania.controller";

const router = Router();

router.get("/api/campanias", getAllCampanias);
router.get("/api/campanias/:id", getCampaniaById);
router.get("/api/campanias/cp/:parcela_id", getCampaniasByParcelaId );
router.get("/api/campanias/cp/:establecimientoId", getCampaniasByEstablecimiento );
router.post("/api/campanias", createCampania);
router.put("/api/campanias/:id", updateCampania);
router.delete("/api/campanias/:id", deleteCampania);
router.post("/api/campanias/:id/end", endCampania);

export default router;
