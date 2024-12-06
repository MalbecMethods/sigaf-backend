import { Table, Column, Model, DataType, Default, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Establecimiento } from "./establecimiento";
import { v4 as uuidv4 } from "uuid";

@Table({ tableName: "insumos" })
export class Insumo extends Model {
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
    nombre: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    tipo: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    unidad: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    categoria: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    stock: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    cantidad_disponible: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
        defaultValue: 0,
    })
    cantidad_ocupada: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    precio_por_unidad: number;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    fecha_expiracion: Date;

    @ForeignKey(() => Establecimiento)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    establecimientoId: string;

    @BelongsTo(() => Establecimiento)
    establecimiento: Establecimiento;

    
}
