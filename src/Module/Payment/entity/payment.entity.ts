import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  modelName: 'payment',
  tableName: 'payment',
  freezeTableName: true,
  timestamps: true,
  paranoid: true,
})
export class Payment extends Model<Payment> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  userId: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  paymentId: string;

  @AllowNull(false)
  @Default('pending')
  @Column(DataType.STRING)
  status: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  result: string;
}
