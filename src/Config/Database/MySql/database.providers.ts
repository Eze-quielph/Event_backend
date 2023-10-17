import { Sequelize } from 'sequelize-typescript';
import { PROVIDE_CONSTANTS_MYSQL } from 'src/Common/Constants/database';
import { User } from 'src/Module/user/entities/user.entity';

export const databaseProviders = [
    {
        provide: PROVIDE_CONSTANTS_MYSQL,
        useFactory: async () =>{
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: process.env.MYSQL_HOST,
                port: Number(process.env.MYSQL_PORT),
                username: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
            });
            sequelize.addModels([User]);
            await sequelize.sync();
            return sequelize;
        }
    }
]