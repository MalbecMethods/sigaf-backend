import { Campania } from "../models/campania";
import { Insumo } from "../models/insumo";
import { Parcela } from "../models/parcela";
import { CampaniaInsumo } from "../models/campania_insumo";

export class CampaniaService {
    async getAllCampanias() {
        return Campania.findAll({
            include: [
                { model: Parcela },
                { 
                    model: CampaniaInsumo,
                    include: [Insumo]
                }
            ]
        });
    }

    async getCampaniaById(id: string) {
        return Campania.findByPk(id, {
            include: [
                { model: Parcela },
                { 
                    model: CampaniaInsumo,
                    include: [Insumo]
                }
            ]
        });
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
