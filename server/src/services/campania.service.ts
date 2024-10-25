// src/services/campaniaService.ts
import { Campania } from "../models/campania";

export class CampaniaService {
    async getAllCampanias() {
        return Campania.findAll();
    }

    async getCampaniaById(id: string) {
        return Campania.findByPk(id);
    }

    async createCampania(data: any) {
        return Campania.create(data);
    }

    async updateCampania(id: string, data: any) {
        const campania = await Campania.findByPk(id);
        return campania ? campania.update(data) : null;
    }

    async deleteCampania(id: string) {
        const campania = await Campania.findByPk(id);
        return campania ? campania.destroy() : null;
    }
}
