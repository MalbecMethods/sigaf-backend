import { Table, Column, Model, DataType, Default, ForeignKey } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Establecimiento } from "./establecimiento";

@Table({ tableName: "parcela" })
export class Parcela extends Model {
    @Default(uuidv4)
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
    })
    id: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    geojson: string;

    @ForeignKey(() => Establecimiento)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    establecimientoId: string; // Clave foránea que apuntará a Establecimiento
}
