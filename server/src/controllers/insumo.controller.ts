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

export const getInsumosByEstablecimiento = async (req: Request, res: Response) => {
    const { establecimientoId } = req.params;
    try {
        const campanias = await insumoService.getInsumosByEstablecimiento(establecimientoId);
        res.status(200).json(campanias);
    } catch (error) {
        console.error("Error al obtener los insumos:", error);
        res.status(500).json({
            message: `Error al obtener los insumos: ${error instanceof Error ? error.message : "Error desconocido"}`,
        });
    }
};

export const createInsumo = async (req: Request, res: Response) => {
    const { Insumo } = req.body
    console.log(req.body)
    const newInsumo = await insumoService.createInsumo({ ...req.body });
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

export const patchInsumo = async (req: Request, res: Response) => {
    try {
        const updatedInsumo = await insumoService.updateInsumo(req.params.id, req.body);
        if (!updatedInsumo) {
            return res.status(404).json({ message: 'Insumo no encontrado' });
        }
        res.status(200).json(updatedInsumo);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar el insumo', error: error.message });
    }
};
