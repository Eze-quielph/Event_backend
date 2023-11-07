declare namespace NodeJS {
  interface proccesEnv {
    GOOGLE_APPLICATION_CREDENTIALS: string;
    MYSQL_DATABASE: string;
    MYSQL_HOST: string;
    MYSQL_PASSWORD: string;
    MYSQL_PORT: number;
    MYSQL_USER: string;
    PORT: number;
    USERNODEMAILER: string;
    PASSWORDNODEMAILER: string;
    MERCADOPAGO_ACCESS_TOKEN: string;
    JWT_SECRET: string;
  }
}
