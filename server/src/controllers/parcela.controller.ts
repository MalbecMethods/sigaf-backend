import { Request, Response } from "express";
import { ParcelaService } from "../services/parcela.service";

export class ParcelaController {
    private parcelaService: ParcelaService;

    constructor() {
        this.parcelaService = new ParcelaService();
    }

    createParcela = async (req: Request, res: Response) => {
        const { nombre, poligono, establecimientoId, area} = req.body;
        const userId = (req as any).user?.sub;

        if (!userId) {
            return res.status(403).json({ message: 'No autorizado' });
        }

        try {
            const parcela = await this.parcelaService.createParcela(nombre, poligono, establecimientoId, area);
            res.status(201).json(parcela);
        } catch (error) {
            console.error("Error al crear la parcela:", error);
            res.status(500).json({
                message: `Error al crear la parcela: ${error instanceof Error ? error.message : "Error desconocido"}`,
            });
        }
    };

    getParcelasByEstablecimiento = async (req: Request, res: Response) => {
        const { establecimientoId } = req.params;
        const userId = (req as any).user?.sub;

        if (!userId) {
            return res.status(403).json({ message: 'No autorizado' });
        }

        try {
            const parcelas = await this.parcelaService.getParcelasByEstablecimiento(establecimientoId);
            res.status(200).json(parcelas);
        } catch (error) {
            console.error("Error al obtener las parcelas:", error);
            res.status(500).json({
                message: `Error al obtener las parcelas: ${error instanceof Error ? error.message : "Error desconocido"}`,
            });
        }
    };
}