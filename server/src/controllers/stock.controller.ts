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

export const getStockByEstablecimientoAndProducto = async (req: Request, res: Response) => {
    const { establecimientoId, producto } = req.query;
    const stock = await stockService.getStockByEstablecimientoAndProducto(
        establecimientoId as string,
        producto as string
    );
    res.json(stock);
};

export const createStock = async (req: Request, res: Response) => {
    const {Stock} = req.body
    const newStock = await stockService.createStock(Stock);
    res.json(newStock);
};

export const deleteStock = async (req: Request, res: Response) => {
    await stockService.deleteStock(req.params.id);
    res.sendStatus(204);
};
