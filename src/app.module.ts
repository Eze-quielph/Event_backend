import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config'
import { DatabaseModule } from './Config/Database/MySql/database.module';
import { UserModule } from './Module/user/user.module';
import { AuthModule } from './Authentication/auth.module';
import { EventModule } from './Module/event/event.module';
import { YourMulterModule } from './Config/Multer/multer.module';
import { FirebaseModule } from './Config/Firebase/firebase.module';
import { FirebaseStorageModule } from './Service/Firebase/FirebaseStorage.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), DatabaseModule, FirebaseModule, FirebaseStorageModule, UserModule, EventModule, AuthModule, YourMulterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
