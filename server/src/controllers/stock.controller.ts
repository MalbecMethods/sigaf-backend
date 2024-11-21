// src/controllers/stockController.ts
import { Request, Response } from "express";
import { StockService } from "../services/stock.service";

const stockService = new StockService();

export const getAllStocks = async (req: Request, res: Response) => {
    const stocks = await stockService.getAllStocks();
    res.json(stocks);
};

export const getStockById = async (req: Request, res: Response) => {
    const stock = await stockService.getStockById(req.params.id);
    res.json(stock);
};

export const createStock = async (req: Request, res: Response) => {
    const newStock = await stockService.createStock(req.body);
    res.json(newStock);
};

export const deleteStock = async (req: Request, res: Response) => {
    await stockService.deleteStock(req.params.id);
    res.sendStatus(204);
};
