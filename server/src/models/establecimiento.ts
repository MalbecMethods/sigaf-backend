import { Table, Column, Model, DataType, Default, HasMany } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Parcela } from "./parcela";

@Table({ tableName: "establecimiento" })
export class Establecimiento extends Model {
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
    provincia: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    ciudad: string;

    @Column({
        type: DataType.JSON,
        allowNull: true,
    })
    poligono: number[][]; 

    @HasMany(() => Parcela)
    parcelas: Parcela[];
}
