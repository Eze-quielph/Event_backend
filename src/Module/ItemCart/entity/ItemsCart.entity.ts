import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Event } from 'src/Module/event/entities/event.entity';
import { ShoppingCart } from '../../shopping-cart/entities/shoppingCart.entity';

@Table({tableName: 'itemsCart', modelName: 'itemsCart', timestamps: false})
export class ItemCart extends Model<ItemCart> {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  unitPrice: number;

  // Relación muchos-a-uno con CarritoDeCompras
  @ForeignKey(() => ShoppingCart)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  idShoppingCart: string;

  @BelongsTo(() => ShoppingCart)
  shoppingCart: ShoppingCart;

  // Relación muchos-a-uno con Event
  @ForeignKey(() => Event)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  idEvent: string;

  @BelongsTo(() => Event)
  event: Event;
}
