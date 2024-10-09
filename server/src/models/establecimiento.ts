import { Table, Column, Model, DataType, Default, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Parcela } from "./parcela";
import { User } from "./user"; // Importamos el modelo User

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

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId: string;
    
    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Parcela)
    parcelas: Parcela[];
}
