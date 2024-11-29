import { Stock } from "../models/stock";

export class StockService {
    async getAllStocks() {
        return Stock.findAll();
    }

    async getStockById(id: string) {
        return Stock.findByPk(id);
    }

    async getStockByEstablecimientoAndProducto(establecimientoId: string, producto: string) {
        return Stock.findAll({
            where: { establecimientoId, producto },
        });
    }

    async getStockByEstablecimientoId(establecimientoId: string) {
        return Stock.findAll({
            where: { establecimientoId },
        });
    }

    async createStock(data: any) { 
        return await Stock.create(data); 
    } 

    async updateStock(id: string, data: any) {
        const stock = await Stock.findByPk(id);
        return stock ? stock.update(data) : null;
    }

    async deleteStock(id: string) {
        const stock = await Stock.findByPk(id);
        return stock ? stock.destroy() : null;
    }

    async addStockFromCampaign(campaign: any) {
        const { insumos } = campaign; 
        console.log('Campaign:', JSON.stringify(campaign, null, 2));
    
        for (const insumo of insumos) {
            try {
                const { nombre, categoria, cantidad, establecimientoId } = insumo;
                if (!nombre || !categoria || !cantidad || !establecimientoId) {
                    throw new Error("Datos incompletos para actualizar el stock");
                }
            
                const existingStock = await Stock.findOne({
                    where: { producto: nombre, establecimientoId },
                });
    
                if (existingStock) {
                    await existingStock.update({ cantidad: existingStock.cantidad + cantidad });
                } else {
                    await Stock.create({ producto: nombre, categoria, cantidad, establecimientoId });
                }
            } catch (error) {
                const err = error as Error
                console.error("Error al actualizar/crear stock:", err.message);
            }
        }
    }
}
