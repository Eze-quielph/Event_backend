import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './Module/user/user.module';
import { AuthModule } from './Authentication/auth.module';
import { EventModule } from './Module/event/event.module';
import { PostgresModule } from './Config/Database/Postgres/postgres.module';
import { ShoppingCartModule } from './Module/shopping-cart/shopping-cart.module';
import { ItemCartModule } from './Module/ItemCart/item-cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostgresModule,
    UserModule,
    EventModule,
    AuthModule,
    ShoppingCartModule,
    ItemCartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
