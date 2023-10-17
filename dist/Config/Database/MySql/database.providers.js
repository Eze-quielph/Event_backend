"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const database_1 = require("../../../Common/Constants/database");
const user_entity_1 = require("../../../Module/user/entities/user.entity");
exports.databaseProviders = [
    {
        provide: database_1.PROVIDE_CONSTANTS_MYSQL,
        useFactory: async () => {
            const sequelize = new sequelize_typescript_1.Sequelize({
                dialect: 'mysql',
                host: process.env.MYSQL_HOST,
                port: Number(process.env.MYSQL_PORT),
                username: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
            });
            sequelize.addModels([user_entity_1.User]);
            await sequelize.sync();
            return sequelize;
        }
    }
];
//# sourceMappingURL=database.providers.js.map