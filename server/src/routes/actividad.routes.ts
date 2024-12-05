// src/routes/actividadRoutes.ts
import { Router } from "express";
import { getAllActividades, getActividadById, createActividad, deleteActividad, getActividadByIdCampania } from "../controllers/actividad.controller";

const router = Router();

router.get("/api/actividades", getAllActividades);
router.get('/api/actividades/campania/:campaniaId', getActividadByIdCampania);
router.get("/api/actividades/:id", getActividadById);
router.post("/api/actividades", createActividad);
router.delete("/api/actividades/:id", deleteActividad);

export default router;
