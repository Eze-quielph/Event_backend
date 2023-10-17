import { Model } from "sequelize-typescript";
export declare class User extends Model {
    id: string;
    FirstName: string;
    LastName: string;
    Username: string;
    Adress: string;
    Birthdate: Date;
    Email: string;
    Password: string;
    Image: string;
    Qr: string;
    Tickets: string;
    Role: string;
}
