import { Table, Column, PrimaryKey, Unique, AllowNull, Model, Default, DataType, HasMany } from "sequelize-typescript"
import {Exclude} from 'class-transformer'
import { Event } from "src/Module/event/entities/event.entity"

@Table({
    tableName: "users",
    timestamps: true,
    paranoid: true
})
export class User extends Model{

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING)
    FirstName: string

    @AllowNull(false)
    @Column(DataType.STRING)
    LastName: string

    @AllowNull(false)
    @Column(DataType.STRING)
    Username: string

    @AllowNull(false)
    @Column(DataType.STRING)
    Adress: string

    @AllowNull(false)
    @Column(DataType.DATE)
    Birthdate: Date

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    Email: string

    @AllowNull(false)
    @Exclude()
    @Column(DataType.STRING)
    Password: string

    @Column(DataType.STRING)
    Image: string

    @Exclude()
    @Column(DataType.TEXT)
    Qr: string

    @Exclude()
    @Column(DataType.TEXT)
    Tickets: string

    @Column(DataType.TEXT)
    Role: string

    @HasMany(()=> Event)
    events: Event[]
}
