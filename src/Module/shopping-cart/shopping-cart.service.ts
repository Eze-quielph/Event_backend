import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { ErrorManager } from 'src/share/error.manager';
import { UserService } from '../user/user.service';
import { ShoppingCart } from './entities/shoppingCart.entity';
import { ItemCartService } from '../ItemCart/item-cart.service';

@Injectable()
export class ShoppingCartService {
  constructor(
    private readonly userService: UserService,
  //  private readonly itemCartService: ItemCartService,
  ) {}
  public async create(createShoppingCartDto: CreateShoppingCartDto) {
    try {
      const existingUser = await this.userService.getUserById(
        createShoppingCartDto.idUser,
      );

      if (!existingUser) {
        throw new UnauthorizedException('User not found');
      }
      console.log(createShoppingCartDto);

      const shoppingCart = await ShoppingCart.create({
        creationDate: createShoppingCartDto.creationDate,
        total: 0,
        idUser: createShoppingCartDto.idUser,
      });

      return shoppingCart.dataValues;
    } catch (error) {
      throw new Error(error);
    }
  }


  public async update(id: string, quantity: number, price: number) {
    try {
      const total = price * quantity;

    const shoppingCart = await ShoppingCart.update(
      {
        total: total,
      },
      {
        where: {
          id,
        },
      },
    );

      if(!shoppingCart){
        throw new Error('ShoppingCart not updated');
      }

    const shopp = await ShoppingCart.findByPk(id);

    return shopp.dataValues
    } catch (error) {
      console.info(error);
    }
  }

}
