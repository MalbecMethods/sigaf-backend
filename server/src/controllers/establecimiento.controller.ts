import { Request, Response } from "express";
import { EstablecimientoService } from "../services/establecimiento.service";

export class EstablecimientoController {
    private establecimientoService: EstablecimientoService;

    constructor() {
        this.establecimientoService = new EstablecimientoService();
    }

    registerEstablecimiento = async (req: Request, res: Response) => {
        const { nombre, provincia, ciudad, poligono } = req.body; // Asegúrate de que estos campos están en el cuerpo de la solicitud.

        try {
            const establecimiento = await this.establecimientoService.createEstablecimiento(nombre, provincia, ciudad, poligono);
            res.status(201).json(establecimiento);
        } catch (error) {
            console.error("Error al crear el establecimiento:", error); // Log de error
            res.status(500).json({
                message: `Error al crear el establecimiento: ${error instanceof Error ? error.message : "Error desconocido"}`,
            });
        }
    }

    getEstablecimientos = async (req: Request, res: Response) => {
        try {
            const establecimientos = await this.establecimientoService.getEstablecimientos();
            res.status(200).json(establecimientos);
        } catch (error) {
            console.error("Error al obtener establecimientos:", error); // Log de error
            res.status(500).json({
                message: `Error al obtener establecimientos: ${error instanceof Error ? error.message : "Error desconocido"}`,
            });
        }
    }

    // otros métodos
}
