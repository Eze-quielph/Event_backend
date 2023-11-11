import { Sequelize } from 'sequelize-typescript';
import { Event } from 'src/Module/event/entities/event.entity';
import { Payment } from 'src/Module/Payment/entity/payment.entity';
import { User } from 'src/Module/user/entities/user.entity';
import { ShoppingCart } from 'src/Module/shopping-cart/entities/shoppingCart.entity';
import { ItemCart } from 'src/Module/ItemCart/entity/ItemsCart.entity';

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
      sequelize.addModels([User, Event, ItemCart, Payment, ShoppingCart]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];
