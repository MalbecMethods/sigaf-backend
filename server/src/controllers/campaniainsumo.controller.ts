// src/controllers/campaniaInsumoController.ts
import { Request, Response } from "express";
import { CampaniaInsumoService } from "../services/campaniainsumo.service";

const campaniaInsumoService = new CampaniaInsumoService();

export const getAllCampaniaInsumos = async (req: Request, res: Response) => {
    const campaniaInsumos = await campaniaInsumoService.getAllCampaniaInsumos();
    res.json(campaniaInsumos);
};

export const getCampaniaInsumosById = async (req: Request, res: Response) => {
    const campaniaInsumo = await campaniaInsumoService.getCampaniaInsumoById(req.params.id);
    res.json(campaniaInsumo);
};

export const createCampaniaInsumo = async (req: Request, res: Response) => {
    const newCampaniaInsumo = await campaniaInsumoService.createCampaniaInsumo(req.body);
    res.json(newCampaniaInsumo);
};

export const updateCampaniaInsumo = async (req: Request, res: Response) => {
    const updatedCampaniaInsumo = await campaniaInsumoService.updateCampaniaInsumo(req.params.id, req.body);
    res.json(updatedCampaniaInsumo);
};

export const deleteCampaniaInsumo = async (req: Request, res: Response) => {
    await campaniaInsumoService.deleteCampaniaInsumo(req.params.id);
    res.sendStatus(204);
};
