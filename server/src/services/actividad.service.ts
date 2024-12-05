// src/services/actividadService.ts
import { Actividad } from "../models/actividad";
import { User } from "../models/user";
import { Campania } from "../models/campania";
import { Parcela } from "../models/parcela";

export class ActividadService {
    async getAllActividades() {
        return Actividad.findAll();
    }

    async getActividadById(id: string) {
        return Actividad.findByPk(id);
    }

    async getActividadByIdCampania(campaniaId: string) {
        return Actividad.findAll({
          where: { campaniaId },
          include: [
            {
              model: User,
              attributes: ["id", "nombre"],
            },
            {
              model: Campania,
              attributes: ["id", "nombre"],
            },
            {
              model: Parcela,
              attributes: ["id", "nombre"],
            },
          ],
        });
    }

    async createActividad(data: any) {
        return Actividad.create(data);
    }

    async deleteActividad(id: string) {
        const actividad = await Actividad.findByPk(id);
        return actividad ? actividad.destroy() : null;
    }
}
