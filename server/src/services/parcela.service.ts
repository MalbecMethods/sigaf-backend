import { Parcela } from "../models/parcela";

export class ParcelaService {
    async createParcela(nombre: string, poligono: number[][], establecimientoId: string, area: number) {
        try {
            return await Parcela.create({ nombre, poligono, establecimientoId, area });
        } catch (error) {
            throw new Error(`Error al crear la parcela: ${error instanceof Error ? error.message : "Error desconocido"}`);
        }
    }

    async getParcelasByEstablecimiento(establecimientoId: string) {
        try {
            return await Parcela.findAll({ where: { establecimientoId } });
        } catch (error) {
            throw new Error(`Error al obtener las parcelas: ${error instanceof Error ? error.message : "Error desconocido"}`);
        }
    }
}