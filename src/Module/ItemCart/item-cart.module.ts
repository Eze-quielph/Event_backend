import { Module } from '@nestjs/common';
import { ItemCartService } from './item-cart.service';
import { ItemCartController } from './item-cart.controller';
import { EventModule } from '../event/event.module';
import { EventService } from '../event/event.service';

@Module({
  imports: [EventModule],
  providers: [ItemCartService, EventService],
  controllers: [ItemCartController],
  exports: [ItemCartService],
})
export class ItemCartModule {}
