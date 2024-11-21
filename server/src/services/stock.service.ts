import { Stock } from "../models/stock";

export class StockService {
    async getAllStocks() {
        return Stock.findAll();
    }

    async getStockById(id: string) {
        return Stock.findByPk(id);
    }

    async createStock(data: any) {
        return Stock.create(data);
    }

    async deleteStock(id: string) {
        const stock = await Stock.findByPk(id);
        return stock ? stock.destroy() : null;
    }
}
