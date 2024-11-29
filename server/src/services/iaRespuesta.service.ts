import { IaRespuesta } from "../models/iaRespuesta";

export class IaRespuestaService {
    // Método existente para guardar una respuesta de la ia
    async createIaRespuesta(imagen: string, respuesta: string, fecha: Date,  establecimientoId: string) {
        try {
            return await IaRespuesta.create({ imagen, respuesta, fecha, establecimientoId});
        } catch (error) {
            throw new Error(`Error al guardar la respuesta: ${error instanceof Error ? error.message : "Error desconocido"}`);
        }
    }

    // Método existente para obtener respuestas por establecimiento
    async getIaRespuestasByEstablecimiento(establecimientoId: string) {
        try {
            return await IaRespuesta.findAll({ where: { establecimientoId } });
        } catch (error) {
            throw new Error(`Error al obtener las respuestas de la ia: ${error instanceof Error ? error.message : "Error desconocido"}`);
        }
    }

    async getAllIaRespuestas() {
        try {
            return await IaRespuesta.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todas las respuestas de la ia: ${error instanceof Error ? error.message : "Error desconocido"}`);
        }
    }

    async getIaRespuestaById(id: string) {
        try {
            return await IaRespuesta.findByPk(id);
        } catch (error) {
            throw new Error(`Error al obtener la parcela: ${error instanceof Error ? error.message : "Error desconocido"}`);
        }
    }

    async deleteIaRespuestaById(id: string) {
        try {
            return await IaRespuesta.destroy({ where: { id } });
        } catch (error) {
            throw new Error(`Error al eliminar la parcela: ${error instanceof Error ? error.message : "Error desconocido"}`);
        }
    }
}