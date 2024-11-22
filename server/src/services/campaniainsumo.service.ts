// src/services/campaniaInsumoService.ts
import { CampaniaInsumo } from "../models/campania_insumo";
import { Establecimiento } from "../models/establecimiento";
import { Insumo } from "../models/insumo";
import { Parcela } from "../models/parcela";

export class CampaniaInsumoService {
    async getAllCampaniaInsumos() {
        return await CampaniaInsumo.findAll({
            include: [
                {
                    model: Parcela,
                    include: [
                        {
                            model: Establecimiento,
                        }
                    ]
                }
            ]
        });
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
