import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { FirebaseModule } from 'src/Config/Firebase/firebase.module';
import { FirebaseStorageModule } from 'src/Service/Firebase/FirebaseStorage.module';

@Module({
  imports: [FirebaseModule, FirebaseStorageModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
