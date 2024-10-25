// src/controllers/insumoController.ts
import { Request, Response } from "express";
import { InsumoService } from "../services/insumo.service";

const insumoService = new InsumoService();

export const getAllInsumos = async (req: Request, res: Response) => {
    const insumos = await insumoService.getAllInsumos();
    res.json(insumos);
};

export const getInsumoById = async (req: Request, res: Response) => {
    const insumo = await insumoService.getInsumoById(req.params.id);
    res.json(insumo);
};

export const createInsumo = async (req: Request, res: Response) => {
    const newInsumo = await insumoService.createInsumo(req.body);
    res.json(newInsumo);
};

export const updateInsumo = async (req: Request, res: Response) => {
    const updatedInsumo = await insumoService.updateInsumo(req.params.id, req.body);
    res.json(updatedInsumo);
};

export const deleteInsumo = async (req: Request, res: Response) => {
    await insumoService.deleteInsumo(req.params.id);
    res.sendStatus(204);
};
