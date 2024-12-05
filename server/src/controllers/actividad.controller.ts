// src/controllers/actividadController.ts
import { Request, Response } from "express";
import { ActividadService } from "../services/actividad.service";
import { Actividad } from '../models/actividad';

const actividadService = new ActividadService();

export const getAllActividades = async (req: Request, res: Response) => {
    const actividades = await actividadService.getAllActividades();
    res.json(actividades);
};

export const getActividadById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        console.log("ID recibido:", id);  // Verifica el ID recibido

        if (!id) {
            return res.status(400).json({ message: 'El parámetro id es requerido' });
        }

        const actividades = await Actividad.findAll({
            where: { parcelaId: id },
        });

        console.log("Actividades encontradas:", actividades);

        // Retornar un array vacío si no hay actividades
        res.json(actividades || []);
    } catch (error) {
        console.error('Error al obtener actividades:', error);
        res.status(500).json({ message: 'Error al obtener actividades', error: (error as Error).message });
    }
};



export const getActividadByIdCampania = async (req: Request, res: Response) => {
    try {
        const { campaniaId } = req.params;

        if (!campaniaId) {
            return res.status(400).json({ message: 'El parámetro campaniaId es requerido' });
        }

        const actividades = await actividadService.getActividadByIdCampania(campaniaId);

        if (!actividades || actividades.length === 0) {
            return res.status(404).json({ message: 'No se encontraron actividades para esta campaña' });
        }

        console.log("Actividades generales encontradas:", actividades);
        res.json(actividades);
    } catch (error) {
        console.error('Error al obtener actividades:', error);
        res.status(500).json({ message: 'Error al obtener actividades', error: (error as Error).message });
    }
};


export const createActividad = async (req: Request, res: Response) => {
    console.log('Received request body:', req.body);  // Log the received data
    try {
        const { titulo, descripcion, fecha_aplicacion, campania_id, usuario_id, parcela_id } = req.body;

        console.log('Extracted fields:', { titulo, descripcion, fecha_aplicacion, campania_id, usuario_id, parcela_id });  // Log extracted fields

        if (!titulo || !descripcion || !fecha_aplicacion || !campania_id || !usuario_id || !parcela_id) {
            console.log('Missing required fields');  // Log if fields are missing
            return res.status(400).json({ 
                error: "Faltan campos requeridos: titulo, descripcion, fecha_aplicacion, campania_id, usuario_id, parcela_id" 
            });
        }

        const newActividad = await Actividad.create({
            titulo,
            descripcion,
            fecha: fecha_aplicacion,
            campaniaId: campania_id,
            usuarioId: usuario_id,
            parcelaId: parcela_id
        });

        console.log('Created new actividad:', newActividad);  // Log the created actividad

        res.status(201).json(newActividad);
    } catch (error) {
        console.error('Error al crear la actividad:', error);
        res.status(500).json({ error: 'Error interno del servidor al crear la actividad' });
    }
};

export const deleteActividad = async (req: Request, res: Response) => {
    await actividadService.deleteActividad(req.params.id);
    res.sendStatus(204);
};
