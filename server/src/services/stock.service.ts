// src/services/stockService.ts
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
    
        for (const insumo of insumos) {
            const existingStock = await Stock.findOne({
                where: { 
                    producto: insumo.nombre, 
                    establecimientoId: campaign.parcela.establecimientoId 
                },
            });
    
            if (existingStock) {
                await existingStock.update({ cantidad: existingStock.cantidad + insumo.cantidad });
            } else {
                await Stock.create({
                    producto: insumo.nombre,
                    categoria: insumo.categoria,
                    cantidad: insumo.cantidad,
                    establecimientoId: campaign.parcela.establecimientoId,
                });
            }
        }
    }
    
}
