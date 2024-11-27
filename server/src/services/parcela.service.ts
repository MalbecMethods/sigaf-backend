import { Parcela } from "../models/parcela";

export class ParcelaService {
    // Método existente para crear parcela
    async createParcela(nombre: string, poligono: number[][], establecimientoId: string, area: number) {
        try {
            return await Parcela.create({ nombre, poligono, establecimientoId, area });
        } catch (error) {
            throw new Error(`Error al crear la parcela: ${error instanceof Error ? error.message : "Error desconocido"}`);
        }
    }

    // Método existente para obtener parcelas por establecimiento
    async getParcelasByEstablecimiento(establecimientoId: string) {
        try {
            return await Parcela.findAll({ where: { establecimientoId } });
        } catch (error) {
            throw new Error(`Error al obtener las parcelas: ${error instanceof Error ? error.message : "Error desconocido"}`);
        }
    }

    async getAllParcelas() {
        try {
            return await Parcela.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todas las parcelas: ${error instanceof Error ? error.message : "Error desconocido"}`);
        }
    }

    async getParcelaById(id: string) {
        try {
            return await Parcela.findByPk(id);
        } catch (error) {
            throw new Error(`Error al obtener la parcela: ${error instanceof Error ? error.message : "Error desconocido"}`);
        }
    }
}
