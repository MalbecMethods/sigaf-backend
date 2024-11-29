import { Table, Column, Model, DataType, Default, ForeignKey, BelongsTo, AllowNull } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Establecimiento } from "./establecimiento";
import { Insumo } from "./insumo";

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

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    unidad: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    parcelaNombre: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    campaniaNombre: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    fechaCampaniaInicio: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    fechaCampaniaFin: Date;

    @ForeignKey(() => Establecimiento)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    establecimientoId: string;
    

    @BelongsTo(() => Establecimiento)
    establecimiento: Establecimiento;
    
    

}
