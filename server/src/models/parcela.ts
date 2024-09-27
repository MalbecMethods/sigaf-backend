import { Table, Column, Model, DataType, Default } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

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
        unique: true
    })
    geojson: string;

}
