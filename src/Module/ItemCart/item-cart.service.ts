import { Injectable } from '@nestjs/common';
import { CreateItemCartDto } from './dto/create-item-cart.dto';
import { ErrorManager } from 'src/share/error.manager';
import { EventService } from '../event/event.service';
import { ItemCart } from './entity/ItemsCart.entity';
import { UpdateItemCartDto } from './dto/update-item-cart.dto';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Injectable()
export class ItemCartService {
  constructor(
    private readonly eventService: EventService,
    private readonly shop: ShoppingCartService,
  ) {}

  public async createItemCart(
    itemsCartDto: CreateItemCartDto,
  ): Promise<ItemCart> {
    try {
      const eventExisting = await this.eventService.findById(
        itemsCartDto.idEvent,
      );
      if (!eventExisting) {
        throw new Error('Event not found');
      }

      const itemCart = await ItemCart.create(itemsCartDto);
      console.log(itemCart);
      if (!itemCart) {
        throw new Error('ItemCart not created');
      }
      return itemCart.dataValues;
    } catch (error) {
      console.info(error);
    }
  }

  public async deleteItem(id: string) {
    try {
      const itemCart = await ItemCart.destroy({
        where: {
          id,
        },
      });
      if (!itemCart) {
        throw new Error('ItemCart not deleted');
      }
      return itemCart;
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  public async updateItem(id: string, updateQuantity: UpdateItemCartDto) {
    try {
      const itemCart = await ItemCart.update(
        {
          quantity: updateQuantity.quantity,
        },
        {
          where: {
            id,
          },
        },
      );
      if (!itemCart) {
        throw new Error('ItemCart not updated');
      }
      console.info('itemCart: ' + itemCart);

      const { dataValues } = await ItemCart.findByPk(id);

      const shop = await this.shop.update(
        dataValues.idShoppingCart,
        dataValues.quantity,
        dataValues.unitPrice,
      );

      const result = { shop, itemCart, detail: dataValues };
      return result;
    } catch (error) {
      console.info(error);
    }
  }
}
