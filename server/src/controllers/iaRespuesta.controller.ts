import { Request, Response } from "express";
import { IaRespuestaService } from "../services/iaRespuesta.service";

export class IaRespuestaController {
    private iaRespuestaService: IaRespuestaService;

    constructor() {
        this.iaRespuestaService = new IaRespuestaService();
    }

    createIaRespuesta = async (req: Request, res: Response) => {
        const { imagen, respuesta, fecha, establecimientoId } = req.body;
        try {
            const iaRespuesta = await this.iaRespuestaService.createIaRespuesta(imagen, respuesta, fecha, establecimientoId);
            res.status(201).json(iaRespuesta);
        } catch (error) {
            console.error("Error al guardar la respuesta:", error);
            res.status(500).json({
                message: `Error al guardar la respuesta: ${error instanceof Error ? error.message : "Error desconocido"}`,
            });
        }
    };

    getIaRespuestasByEstablecimiento = async (req: Request, res: Response) => {
        const { establecimientoId } = req.params;
        try {
            const iaRespuestas = await this.iaRespuestaService.getIaRespuestasByEstablecimiento(establecimientoId);
            res.status(200).json(iaRespuestas);
        } catch (error) {
            console.error("Error al obtener las respuestas de la ia:", error);
            res.status(500).json({
                message: `Error al obtener las respuestas de la ia: ${error instanceof Error ? error.message : "Error desconocido"}`,
            });
        }
    };

    getAllIaRespuestas = async (req: Request, res: Response) => {
        try {
            const iaRespuestas = await this.iaRespuestaService.getAllIaRespuestas();
            res.status(200).json(iaRespuestas);
        } catch (error) {
            console.error("Error al obtener todas las respuestas de la ia:", error);
            res.status(500).json({
                message: `Error al obtener todas las respuestas de la ia: ${error instanceof Error ? error.message : "Error desconocido"}`,
            });
        }
    }

    getIaRespuestaById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const iaRespuesta = await this.iaRespuestaService.getIaRespuestaById(id);
            res.status(200).json(iaRespuesta);
        } catch (error) {
            console.error("Error al obtener la respuesta de la ia:", error);
            res.status(500).json({
                message: `Error al obtener la respuesta de la ia: ${error instanceof Error ? error.message : "Error desconocido"}`,
            });
        }
    }

    deleteIaRespuestaById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const iaRespuesta = await this.iaRespuestaService.deleteIaRespuestaById(id);
            res.status(200).json(iaRespuesta);
        } catch (error) {
            console.error("Error al eliminar la respuesta de la ia:", error);
            res.status(500).json({
                message: `Error al eliminar la respuesta de la ia: ${error instanceof Error ? error.message : "Error desconocido"}`,
            });
        }
    }
}
