import { Injectable } from '@nestjs/common';
import { CreateItemCartDto } from './dto/create-item-cart.dto';
import { ErrorManager } from 'src/share/error.manager';
import { EventService } from '../event/event.service';
import { ItemCart } from './entity/ItemsCart.entity';

@Injectable()
export class ItemCartService {
  constructor(private readonly eventService: EventService) {}

  public async createItemCart(
    itemsCartDto: CreateItemCartDto,
  ): Promise<ItemCart> {
    try {
      const eventExisting = await this.eventService.findById(
        itemsCartDto.idEvent,
      );
      if (!eventExisting) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Event not found',
        });
      }

      const itemCart = await ItemCart.create(itemsCartDto);
      if (!itemCart) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'ItemCart not created',
        });
      }
      return itemCart.dataValues;
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
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
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'ItemCart not deleted',
        });
      }
      return itemCart;
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  public async updateItem(id: string, quantity: number) {
    try {
      const itemCart = await ItemCart.update(
        {
          quantity,
        },
        {
          where: {
            id,
          },
        },
      );
      if (!itemCart) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'ItemCart not updated',
        });
      }
      return itemCart;
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }
}
