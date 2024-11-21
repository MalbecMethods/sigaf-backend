import { Table, Column, Model, DataType, Default, ForeignKey, BelongsTo } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Parcela } from "./parcela";
import { User } from "./user"; 

@Table({ tableName: "actividad" })
export class Actividad extends Model {
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
    titulo: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    descripcion: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    fecha: Date;

    @ForeignKey(() => Parcela)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    parcelaId: string;

    @BelongsTo(() => Parcela)
    parcela: Parcela;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    usuarioId: string;

    @BelongsTo(() => User)
    usuario: User;
}
