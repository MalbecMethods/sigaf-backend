import { Request, Response } from "express";
import { EstablecimientoService } from "../services/establecimiento.service";

export class EstablecimientoController {
    private establecimientoService: EstablecimientoService;

    constructor() {
        this.establecimientoService = new EstablecimientoService();
    }

    registerEstablecimiento = async (req: Request, res: Response) => {
        const { nombre, provincia, ciudad, poligono } = req.body;
        
        // Aserción de tipo para indicarle a TypeScript que req.user tiene un id
        const userId = (req as any).user?.sub;
        console.log("ID del usuario:", userId);

        
    
        if (!userId) {
            return res.status(403).json({ message: 'No autorizado' });
        }
    
        try {
            const establecimiento = await this.establecimientoService.createEstablecimiento(userId, nombre, provincia, ciudad, poligono);
            res.status(201).json(establecimiento);
        } catch (error) {
            console.error("Error al crear el establecimiento:", error);
            res.status(500).json({
                message: `Error al crear el establecimiento: ${error instanceof Error ? error.message : "Error desconocido"}`,
            });
        }
    };
    

    getEstablecimientos = async (req: Request, res: Response) => { 
        try {
            // Obtener el userId desde la solicitud (asumiendo que viene del middleware de autenticación)
            const userId = (req as any).user?.sub; // Asegúrate de que 'user' esté siendo añadido correctamente en el middleware de autenticación
    
            // Llamar al servicio con el userId para filtrar los establecimientos
            const establecimientos = await this.establecimientoService.getEstablecimientos(userId);
    
            res.status(200).json(establecimientos);
        } catch (error) {
            console.error("Error al obtener establecimientos:", error); // Log de error
            res.status(500).json({
                message: `Error al obtener establecimientos: ${error instanceof Error ? error.message : "Error desconocido"}`,
            });
        }
    }
    

    getEstablecimientoById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const establecimiento = await this.establecimientoService.getEstablecimientoById(id);
            if (!establecimiento) {
                return res.status(404).json({ message: "Establecimiento no encontrado" });
            }
            res.status(200).json(establecimiento);
        } catch (error) {
            console.error("Error al obtener establecimiento:", error);
            res.status(500).json({
                message: `Error al obtener establecimiento: ${error instanceof Error ? error.message : "Error desconocido"}`,
            });
        }
    };


    // otros métodos
}
