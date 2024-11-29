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

export const updateStock = async (req: Request, res: Response) => {
    try {
        const stockId = req.params.id;
        const data = req.body;

        if (!data.cantidad) {
            return res.status(400).json({ message: "La cantidad es obligatoria" });
        }

        const updatedStock = await stockService.updateStock(stockId, data);

        if (!updatedStock) {
            return res.status(404).json({ message: "Stock no encontrado" });
        }

        res.json(updatedStock);
    } catch (error) {
        const err = error as Error
        console.error("Error al actualizar el stock:", err);
        res.status(500).json({ message: "Error al actualizar el stock" });
    }
};


export const getStockByEstablecimientoAndProducto = async (req: Request, res: Response) => {
    const { establecimientoId, producto } = req.query;
    const stock = await stockService.getStockByEstablecimientoAndProducto(
        establecimientoId as string,
        producto as string
    );
    res.json(stock);
};

export const getStockByEstablecimientoId = async (req: Request, res: Response) => {
    const { establecimientoId } = req.params;
    try {
        const campanias = await stockService.getStockByEstablecimientoId(establecimientoId);
        res.status(200).json(campanias);
    } catch (error) {
        console.error("Error al obtener los stocks:", error);
        res.status(500).json({
            message: `Error al obtener los stocks: ${error instanceof Error ? error.message : "Error desconocido"}`,
        });
    }
};



export const createStock = async (req: Request, res: Response) => {
    try {
        const { producto, categoria, cantidad, establecimientoId, unidad, parcelaNombre, campaniaNombre, fechaCampaniaInicio, fechaCampaniaFin } = req.body;

        if (!producto || !categoria || !cantidad || !establecimientoId || !unidad || !parcelaNombre || !campaniaNombre || !fechaCampaniaInicio || !fechaCampaniaFin) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const newStock = await stockService.createStock({
            producto,
            categoria,
            cantidad,
            establecimientoId,
            unidad,
            parcelaNombre,
            fechaCampaniaInicio,
            fechaCampaniaFin,
            campaniaNombre

        });

        res.json(newStock);
    } catch (error) {
        console.error("Error al crear stock:", error);
        res.status(500).json({ message: "Error al crear stock" });
    }
};


export const deleteStock = async (req: Request, res: Response) => {
    await stockService.deleteStock(req.params.id);
    res.sendStatus(204);
};
