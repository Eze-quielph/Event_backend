import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { ErrorManager } from 'src/share/error.manager';
import { UserService } from '../user/user.service';
import { ShoppingCart } from './entities/shoppingCart.entity';
import { ItemCartService } from '../ItemCart/item-cart.service';

@Injectable()
export class ShoppingCartService {
  constructor(private readonly userService: UserService, private readonly itemCartService: ItemCartService) {}
  public async create(createShoppingCartDto: CreateShoppingCartDto) {
    try {
      const existingUser = await this.userService.getUserById(createShoppingCartDto.idUser);
      
      if(!existingUser){
        throw new UnauthorizedException('User not found')
      }

      const shoppingCart = await ShoppingCart.create({
        creationDate: createShoppingCartDto.creationDate,
        total: 0,
        idUser: createShoppingCartDto.idUser
      });

      return shoppingCart.dataValues;
    } catch (error) {
      throw new Error(error)
    }
  }

  findAll() {
    return `This action returns all shoppingCart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shoppingCart`;
  }

  update(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    return `This action updates a #${id} shoppingCart`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingCart`;
  }
}
