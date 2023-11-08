import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './Config/Database/MySql/database.module';
import { UserModule } from './Module/user/user.module';
import { AuthModule } from './Authentication/auth.module';
import { EventModule } from './Module/event/event.module';
import { PaymentModule } from './Module/Payment/payment.module';
import { MercadopagoModule } from './Config/Mercadopago/mercadopago.module';
import { PostgresModule } from './Config/Database/Postgres/postgres.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostgresModule,
    UserModule,
    EventModule,
    AuthModule,
    PaymentModule,
    MercadopagoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
