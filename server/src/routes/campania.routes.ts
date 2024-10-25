// src/routes/campaniaRoutes.ts
import { Router } from "express";
import { getAllCampanias, getCampaniaById, createCampania, updateCampania, deleteCampania } from "../controllers/campania.controller";

const router = Router();

router.get("/api/campanias/", getAllCampanias);
router.get("/api/campanias/:id", getCampaniaById);
router.post("/api/campanias/", createCampania);
router.put("/api/campanias/:id", updateCampania);
router.delete("/api/campanias/:id", deleteCampania);

export default router;
