import { Table, Column, Model, DataType, Default, ForeignKey, BelongsTo } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Establecimiento } from "./establecimiento";

@Table({ tableName: "stock" })
export class Stock extends Model {
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
    producto: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    categoria: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    cantidad: number;

    @ForeignKey(() => Establecimiento)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    establecimientoId: string;

    @BelongsTo(() => Establecimiento)
    establecimiento: Establecimiento;
}
