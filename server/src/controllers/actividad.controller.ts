// src/controllers/actividadController.ts
import { Request, Response } from "express";
import { ActividadService } from "../services/actividad.service";

const actividadService = new ActividadService();

export const getAllActividades = async (req: Request, res: Response) => {
    const actividades = await actividadService.getAllActividades();
    res.json(actividades);
};

export const getActividadById = async (req: Request, res: Response) => {
    const actividad = await actividadService.getActividadById(req.params.id);
    res.json(actividad);
};

export const createActividad = async (req: Request, res: Response) => {
    const newActividad = await actividadService.createActividad(req.body);
    res.json(newActividad);
};

export const deleteActividad = async (req: Request, res: Response) => {
    await actividadService.deleteActividad(req.params.id);
    res.sendStatus(204);
};
