import { Module } from '@nestjs/common';
import { ItemCartService } from './item-cart.service';
import { ItemCartController } from './item-cart.controller';
import { EventModule } from '../event/event.module';
import { EventService } from '../event/event.service';
import { ShoppingCartModule } from '../shopping-cart/shopping-cart.module';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [EventModule, ShoppingCartModule,UserModule],
  providers: [ItemCartService, EventService, ShoppingCartService],
  controllers: [ItemCartController],
  exports: [ItemCartService],
})
export class ItemCartModule {}
