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
    try {
        // Verificamos si el id existe
        const campaniaInsumoId = req.params.id;
        const { cosechado, cantidad_utilizada } = req.body; // Extraemos los datos necesarios del cuerpo

        // Actualizamos el CampaniaInsumo con los nuevos valores
        const updatedCampaniaInsumo = await campaniaInsumoService.updateCampaniaInsumo(campaniaInsumoId, { cosechado, cantidad_utilizada });

        // Respondemos con el CampaniaInsumo actualizado
        res.json(updatedCampaniaInsumo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el CampaniaInsumo' });
    }
};

export const deleteCampaniaInsumo = async (req: Request, res: Response) => {
    await campaniaInsumoService.deleteCampaniaInsumo(req.params.id);
    res.sendStatus(204);
};
