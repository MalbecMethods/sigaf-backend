import { Router } from "express";
import { getAllStocks, getStockById, createStock, deleteStock } from "../controllers/stock.controller";

const router = Router();

router.get("/api/stocks", getAllStocks);
router.get("/api/stocks/:id", getStockById);
router.post("/api/stocks", createStock);
router.delete("/api/stocks/:id", deleteStock);

export default router;
