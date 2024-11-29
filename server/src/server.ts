import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { conexiondb } from './config/conexiondb';
import authRoutes from './routes/auth.routes';
import apiRoutes from './routes/api.routes';
import establecimientoRoutes from './routes/establecimiento.routes';
import parcelaRoutes from './routes/parcela.routes';
import lensRouter from './routes/lens.routes';
import insumoRoutes from "./routes/insumo.routes";
import campaniaRoutes from "./routes/campania.routes";
import campaniaInsumoRoutes from "./routes/campania.insumo.routes";
import stockRoutes from "./routes/stock.routes";
import actividadRoutes from "./routes/actividad.routes";
import iaRespuestaRoutes from './routes/iaRespuesta.routes';

class Server {
    private app: Application;
    private port: number;

    constructor() {
        this.app = express();
        this.port = 3000;
        this.dbconexion();
        this.middlewares();
        this.routes();
    }

    async dbconexion(): Promise<void> {
        await conexiondb();
    }

    middlewares(): void {
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(helmet());
        this.app.use(express.json());
    }

    routes(): void {
        this.app.use(authRoutes);
        this.app.use(apiRoutes);
        this.app.use(establecimientoRoutes);
        this.app.use(parcelaRoutes);
        this.app.use(lensRouter);
        this.app.use(insumoRoutes)
        this.app.use(campaniaRoutes)
        this.app.use(campaniaInsumoRoutes)
        this.app.use(stockRoutes)
        this.app.use(actividadRoutes)
        this.app.use(iaRespuestaRoutes)
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en ${this.port}`);
        });
    }
}

export default Server;