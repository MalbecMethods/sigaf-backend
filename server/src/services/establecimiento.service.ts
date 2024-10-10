import { Establecimiento } from "../models/establecimiento"; 
import { Parcela } from "../models/parcela"; 

export class EstablecimientoService {
    async createEstablecimiento(userId:string ,nombre: string, provincia: string, ciudad: string, poligono: number[][]) {
        try {
            return await Establecimiento.create({ userId ,nombre, provincia, ciudad, poligono });
        } catch (error) {
            throw new Error(`Error al crear el establecimiento: ${error instanceof Error ? error.message : "Error desconocido"}`);
        }
    }

    async getEstablecimientos(userId: string): Promise<Establecimiento[]> {
        try {
            return await Establecimiento.findAll({
                where: { userId }, // Filtrar por el userId del usuario autenticado
                include: [Parcela]  // Incluir las parcelas relacionadas
            });
        } catch (error) {
            throw new Error(`Error al obtener establecimientos: ${error instanceof Error ? error.message : "Error desconocido"}`);
        }
    }
    

    async getEstablecimientoById(id: string) {
        try {
            return await Establecimiento.findByPk(id, { include: [Parcela] });
        } catch (error) {
            throw new Error(`Error al obtener establecimiento: ${error instanceof Error ? error.message : "Error desconocido"}`);
        }
    }

    // otros métodos
}
