import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config'
import { DatabaseModule } from './Config/Database/MySql/database.module';
import { UserModule } from './Module/user/user.module';
import { AuthModule } from './Authentication/auth.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), DatabaseModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
