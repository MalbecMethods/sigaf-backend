import { Establecimiento } from "../models/establecimiento"; 
import { Parcela } from "../models/parcela"; 

export class EstablecimientoService {
    async createEstablecimiento(nombre: string, provincia: string, ciudad: string, poligono: number[][]) {
        try {
            return await Establecimiento.create({ nombre, provincia, ciudad, poligono });
        } catch (error) {
            throw new Error(`Error al crear el establecimiento: ${error instanceof Error ? error.message : "Error desconocido"}`);
        }
    }

    async getEstablecimientos(): Promise<Establecimiento[]> {
        try {
            return await Establecimiento.findAll({ include: [Parcela] });
        } catch (error) {
            throw new Error(`Error al obtener establecimientos: ${error instanceof Error ? error.message : "Error desconocido"}`);
        }
    }

    // otros métodos
}
