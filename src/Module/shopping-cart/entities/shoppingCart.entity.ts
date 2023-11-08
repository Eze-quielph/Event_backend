import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/Module/user/entities/user.entity";

@Table({tableName: 'shoppingCart', modelName: 'shoppingCart', timestamps: false})
export class ShoppingCart extends Model<ShoppingCart>{
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;
  
    @Column({
      type: DataType.DATE,
      allowNull: false,
    })
    creationDate: String;
  
    @Column({
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
    })
    total: number;
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    idUser: string;
  
    @BelongsTo(() => User)
    user: User;
}