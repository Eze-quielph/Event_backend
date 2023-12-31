import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  PrimaryKey,
  Unique,
  Default,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/Module/user/entities/user.entity';

@Table({
  tableName: 'events',
  paranoid: true,
  timestamps: true,
})
export class Event extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  Name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  Description: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  Day: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  Hour: Date;

  @Default(18)
  @Column(DataType.INTEGER)
  Age_min: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  Category: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  Ubication: string;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  Price: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  Image: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  Artist: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  Capacity: number;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
