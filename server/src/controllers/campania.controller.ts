// src/controllers/campaniaController.ts
import { Request, Response } from "express";
import { CampaniaService } from "../services/campania.service";
import { StockService } from "../services/stock.service";

const campaniaService = new CampaniaService();
const stockService = new StockService();

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

export const endCampania = async (req: Request, res: Response) => {
    try {
        const campaniaId = req.params.id;
        const campania = await campaniaService.getCampaniaById(campaniaId);

        if (!campania) {
            return res.status(404).json({ message: "Campaña no encontrada" });
        }

        if (campania.finalizada) {
            return res.status(400).json({ message: "La campaña ya está finalizada" });
        }

        const today = new Date();
        if (campania.fecha_fin && new Date(campania.fecha_fin) > today) {
            return res.status(400).json({ message: "La campaña aún no ha finalizado" });
        }

        campania.finalizada = true;
        await campania.save();

        await stockService.addStockFromCampaign(campania);
        res.json({ message: "Campaña finalizada y stock actualizado" });
    } catch (error) {
        const err = error as Error;
        console.error("Error finalizando campaña:", err.message);
        res.status(500).json({ message: "Error al finalizar la campaña" });
    }
};


