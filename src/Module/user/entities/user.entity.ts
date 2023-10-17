import { Table, Column, PrimaryKey, Unique, AllowNull, Model, Default, DataType } from "sequelize-typescript"

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
    @Column(DataType.STRING)
    Password: string

    @Column(DataType.STRING)
    Image: string

    @Column(DataType.TEXT)
    Qr: string

    @Column(DataType.TEXT)
    Tickets: string

    @Column(DataType.TEXT)
    Role: string
}
