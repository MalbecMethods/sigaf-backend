// src/services/actividadService.ts
import { Actividad } from "../models/actividad"

export class ActividadService {
    async getAllActividades() {
        return Actividad.findAll();
    }

    async getActividadById(id: string) {
        return Actividad.findByPk(id);
    }

    async createActividad(data: any) {
        return Actividad.create(data);
    }

    async deleteActividad(id: string) {
        const actividad = await Actividad.findByPk(id);
        return actividad ? actividad.destroy() : null;
    }
}
