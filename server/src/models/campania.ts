import { Table, Column, Model, DataType, Default, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Parcela } from "./parcela";
import { CampaniaInsumo } from "./campania_insumo";
import { Establecimiento } from "./establecimiento";

@Table({ tableName: "campanias" })
export class Campania extends Model {
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
        type: DataType.DATE,
        allowNull: false,
    })
    fecha_inicio: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    fecha_fin: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    duracion_dias: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    finalizada: boolean;    

    @ForeignKey(() => Parcela)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    parcela_id: string;

    @BelongsTo(() => Parcela)
    parcela: Parcela;


    @ForeignKey(() => Establecimiento)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    establecimientoId: string;

    @BelongsTo(() => Establecimiento)
    establecimiento: Establecimiento;

    @HasMany(() => CampaniaInsumo)
    insumos: CampaniaInsumo[];
}
