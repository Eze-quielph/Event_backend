import { Sequelize } from 'sequelize-typescript';
import { Event } from 'src/Module/event/entities/event.entity';
import { User } from 'src/Module/user/entities/user.entity';

export const Postgres = [
    {
        provide: 'PROVIDE_CONSTANTS_POSTGRES',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: process.env.PGHOST,
                port: Number(process.env.PGPORT),
                username: process.env.PGUSER,
                password: process.env.PGPASSWORD,
                database: process.env.PGDATABASE,
            });
            sequelize.addModels([User, Event]);
            await sequelize.sync();
            return sequelize;
        }
    }
]
