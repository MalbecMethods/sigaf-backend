// src/services/campaniaInsumoService.ts
import { CampaniaInsumo } from "../models/campania_insumo";

export class CampaniaInsumoService {
    async getAllCampaniaInsumos() {
        return CampaniaInsumo.findAll();
    }

    async getCampaniaInsumoById(id: string) {
        return CampaniaInsumo.findByPk(id);
    }

    async createCampaniaInsumo(data: any) {
        return CampaniaInsumo.create(data);
    }

    async updateCampaniaInsumo(id: string, data: any) {
        const campaniaInsumo = await CampaniaInsumo.findByPk(id);
        return campaniaInsumo ? campaniaInsumo.update(data) : null;
    }

    async deleteCampaniaInsumo(id: string) {
        const campaniaInsumo = await CampaniaInsumo.findByPk(id);
        return campaniaInsumo ? campaniaInsumo.destroy() : null;
    }
}
