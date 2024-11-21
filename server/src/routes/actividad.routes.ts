// src/routes/actividadRoutes.ts
import { Router } from "express";
import { getAllActividades, getActividadById, createActividad, deleteActividad } from "../controllers/actividad.controller";

const router = Router();

router.get("/actividades", getAllActividades);
router.get("/actividades/:id", getActividadById);
router.post("/actividades", createActividad);
router.delete("/actividades/:id", deleteActividad);

export default router;
