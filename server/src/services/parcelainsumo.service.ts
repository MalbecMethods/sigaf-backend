// src/services/parcelaInsumoService.ts
import { ParcelaInsumo } from "../models/parcela_insumo";

export class ParcelaInsumoService {
    async getAllParcelaInsumos() {
        return ParcelaInsumo.findAll();
    }

    async getParcelaInsumoById(id: string) {
        return ParcelaInsumo.findByPk(id);
    }

    async createParcelaInsumo(data: any) {
        return ParcelaInsumo.create(data);
    }

    async updateParcelaInsumo(id: string, data: any) {
        const parcelaInsumo = await ParcelaInsumo.findByPk(id);
        return parcelaInsumo ? parcelaInsumo.update(data) : null;
    }

    async deleteParcelaInsumo(id: string) {
        const parcelaInsumo = await ParcelaInsumo.findByPk(id);
        return parcelaInsumo ? parcelaInsumo.destroy() : null;
    }
}
