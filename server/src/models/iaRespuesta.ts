import { Table, Column, Model, DataType, Default, ForeignKey, BelongsTo } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Establecimiento } from "./establecimiento";

@Table({ tableName: "ia" })
export class IaRespuesta extends Model {
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
    imagen: string;

    @Column({
        type: DataType.TEXT, 
        allowNull: false,
    })
    respuesta: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    fecha: string;

    @ForeignKey(() => Establecimiento)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    establecimientoId: string;

    @BelongsTo(() => Establecimiento)
    establecimiento: Establecimiento;
}
