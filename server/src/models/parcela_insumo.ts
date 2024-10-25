import { Table, Column, Model, DataType, Default, ForeignKey, BelongsTo } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Parcela } from "./parcela";
import { Campania } from "./campania";
import { Insumo } from "./insumo";

@Table({ tableName: "parcela_insumo" })
export class ParcelaInsumo extends Model {
    @Default(uuidv4)
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
    })
    id: string;

    @ForeignKey(() => Parcela)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    parcela_id: string;

    @BelongsTo(() => Parcela)
    parcela: Parcela;

    @ForeignKey(() => Insumo)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    insumo_id: string;

    @BelongsTo(() => Insumo)
    insumo: Insumo;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    cantidad_utilizada: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    fecha_aplicacion: Date;

    @ForeignKey(() => Campania)
    @Column({
        type: DataType.UUID,
        allowNull: true,
    })
    campania_id: string;

    @BelongsTo(() => Campania)
    campania: Campania;
}
