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

    updateCampaniaInsumo = async (id: string, data: { cosechado?: boolean, cantidad_utilizada?: number }) => {
        try {
            // Buscamos el CampaniaInsumo con el id proporcionado
            const campaniaInsumo = await CampaniaInsumo.findByPk(id);
    
            if (!campaniaInsumo) {
                throw new Error('CampaniaInsumo no encontrado');
            }
    
            // Actualizamos los campos proporcionados
            if (data.cosechado !== undefined) {
                campaniaInsumo.cosechado = data.cosechado;
            }
            if (data.cantidad_utilizada !== undefined) {
                campaniaInsumo.cantidad_utilizada = data.cantidad_utilizada;
            }
    
            // Guardamos los cambios
            await campaniaInsumo.save();
    
            return campaniaInsumo;
        } catch (error) {
            console.error(error);
            throw new Error('Error al actualizar el CampaniaInsumo');
        }
    };

    async deleteCampaniaInsumo(id: string) {
        const campaniaInsumo = await CampaniaInsumo.findByPk(id);
        return campaniaInsumo ? campaniaInsumo.destroy() : null;
    }
}
