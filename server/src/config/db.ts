import { Sequelize } from "sequelize-typescript";
import { envs } from "../environments/environments";
import { User } from "../models/user";
import { Parcela } from "../models/parcela";
import { Establecimiento } from '../models/establecimiento'; 
import { CampaniaInsumo } from '../models/campania_insumo'; 
import { Insumo } from '../models/insumo'; 
import { Campania } from '../models/campania';
import { Stock } from '../models/stock';
import { Actividad } from '../models/actividad'
import { IaRespuesta } from "../models/iaRespuesta";


const { DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = envs;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    models: [User, Parcela, Establecimiento, CampaniaInsumo, Insumo, Campania, Stock, Actividad, IaRespuesta],
});


export default db