import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { UserModule } from '../user/user.module';
import { AuthGuard } from 'src/Common/Guards/auth.guards';

@Module({
  imports: [UserModule],
  controllers: [EventController],
  providers: [EventService, AuthGuard],
})
export class EventModule {}
