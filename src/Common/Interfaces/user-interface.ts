
export interface UserInterface {
    FirstName: string;
    LastName: string;
    Username: string;
    Adress: string;
    Birthdate: Date;
    Email: string;
    Password: string;
    Image?: string;
    Qr?: string;
    Tickets?: string;
    Role?: string;
}


export interface UserReturn {
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly role: string
}