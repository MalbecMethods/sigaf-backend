// src/controllers/parcelaInsumoController.ts
import { Request, Response } from "express";
import { ParcelaInsumoService } from "../services/parcelainsumo.service";

const parcelaInsumoService = new ParcelaInsumoService();

export const getAllParcelaInsumos = async (req: Request, res: Response) => {
    const parcelaInsumos = await parcelaInsumoService.getAllParcelaInsumos();
    res.json(parcelaInsumos);
};

export const getParcelaInsumoById = async (req: Request, res: Response) => {
    const parcelaInsumo = await parcelaInsumoService.getParcelaInsumoById(req.params.id);
    res.json(parcelaInsumo);
};

export const createParcelaInsumo = async (req: Request, res: Response) => {
    const newParcelaInsumo = await parcelaInsumoService.createParcelaInsumo(req.body);
    res.json(newParcelaInsumo);
};

export const updateParcelaInsumo = async (req: Request, res: Response) => {
    const updatedParcelaInsumo = await parcelaInsumoService.updateParcelaInsumo(req.params.id, req.body);
    res.json(updatedParcelaInsumo);
};

export const deleteParcelaInsumo = async (req: Request, res: Response) => {
    await parcelaInsumoService.deleteParcelaInsumo(req.params.id);
    res.sendStatus(204);
};
