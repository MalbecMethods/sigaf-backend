import cron from "node-cron";
import { Op } from "sequelize";
import { Campania } from "../models/campania";
import { StockService } from "../services/stock.service"

const stockService = new StockService(); // Instancia del servicio de stock

console.log("Iniciando la configuración del cron job...");
// Configuración del cron job para ejecutarse diariamente a medianoche
cron.schedule(
  "0 0 * * *",
  async () => {
    console.log(`[${new Date().toISOString()}] - Ejecutando cron job.`);
    const today = new Date();
    

    try {
      console.log(`[${today.toISOString()}] - Iniciando tarea de cron para verificar campañas vencidas.`);

      // Buscar campañas vencidas no finalizadas
      const campaniasVencidas = await Campania.findAll({
        where: {
          fecha_fin: { [Op.lte]: today },
          finalizada: false, // Filtra solo las campañas no finalizadas
        },
        include: [{ all: true }], // Incluye relaciones necesarias
      });

      if (!campaniasVencidas.length) {
        console.log("No hay campañas vencidas para procesar.");
        return;
      }

      // Procesar cada campaña vencida
      for (const campania of campaniasVencidas) {
        try {
          // Marcar la campaña como finalizada
          campania.finalizada = true;
          await campania.save();

          // Actualizar el stock basado en la campaña finalizada
          await stockService.addStockFromCampaign(campania);

          console.log(`Campaña "${campania.nombre}" (ID: ${campania.id}) finalizada y stock actualizado.`);
        } catch (error) {
          const err = error as Error;
          console.error(`Error procesando la campaña "${campania.nombre}" (ID: ${campania.id}): ${err.message}`);
        }
      }
    } catch (error) {
      const err = error as Error;
      console.error("Error general en la tarea de cron:", err.message);
    }
  },
  {
    timezone: "America/Argentina/Buenos_Aires", // Asegura que el cron use la zona horaria correcta
  }
);

console.log("Cron job configurado para ejecutarse a medianoche diariamente.");
