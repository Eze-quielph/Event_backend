import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { ItemCartModule } from '../ItemCart/item-cart.module';
import { ItemCartService } from '../ItemCart/item-cart.service';
import { EventModule } from '../event/event.module';

@Module({
  imports: [UserModule],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService, UserService],
  exports: [ShoppingCartService]
})
export class ShoppingCartModule {}
