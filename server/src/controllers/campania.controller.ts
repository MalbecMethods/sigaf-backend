// src/controllers/campaniaController.ts
import { Request, Response } from "express";
import { CampaniaService } from "../services/campania.service";

const campaniaService = new CampaniaService();

export const getAllCampanias = async (req: Request, res: Response) => {
    const campanias = await campaniaService.getAllCampanias();
    res.json(campanias);
};

export const getCampaniaById = async (req: Request, res: Response) => {
    const campania = await campaniaService.getCampaniaById(req.params.id);
    res.json(campania);
};

export const createCampania = async (req: Request, res: Response) => {
    const newCampania = await campaniaService.createCampania(req.body);
    res.json(newCampania);
};

export const updateCampania = async (req: Request, res: Response) => {
    const updatedCampania = await campaniaService.updateCampania(req.params.id, req.body);
    res.json(updatedCampania);
};

export const deleteCampania = async (req: Request, res: Response) => {
    await campaniaService.deleteCampania(req.params.id);
    res.sendStatus(204);
};
