// src/services/insumoService.ts
import { Insumo } from "../models/insumo";

export class InsumoService {
    async getAllInsumos() {
        return Insumo.findAll();
    }

    async getInsumoById(id: string) {
        return Insumo.findByPk(id);
    }

    async createInsumo(data: any) {
        return Insumo.create(data);
    }

    async updateInsumo(id: string, data: any) {
        const insumo = await Insumo.findByPk(id);
        return insumo ? insumo.update(data) : null;
    }

    async deleteInsumo(id: string) {
        const insumo = await Insumo.findByPk(id);
        return insumo ? insumo.destroy() : null;
    }
}
