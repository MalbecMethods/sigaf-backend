import { Router } from "express";
import { getAllStocks, getStockById, createStock, deleteStock, updateStock, getStockByEstablecimientoId } from "../controllers/stock.controller";

const router = Router();

router.get("/api/stocks", getAllStocks);
router.get("/api/stocks/:id", getStockById);
router.get("/api/stocks/se/:establecimientoId", getStockByEstablecimientoId);
router.put("/api/stocks/:id", updateStock);
router.post("/api/stocks", createStock);
router.delete("/api/stocks/:id", deleteStock);

export default router;
