import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ItemCartService } from './item-cart.service';
import { CreateItemCartDto } from './dto/create-item-cart.dto';
import { UpdateItemCartDto } from './dto/update-item-cart.dto';

@Controller('item-cart')
export class ItemCartController {
  constructor(private readonly itemCartService: ItemCartService) {}

  @Post()
  public async createItemCart(@Body() itemCartDto: CreateItemCartDto) {
    return await this.itemCartService.createItemCart(itemCartDto);
  }

  @Put()
  public async updateItemCart(
    @Query('id') id: string,
    @Body(new ValidationPipe()) updateItemCartDto: UpdateItemCartDto,
  ) {
    console.log(updateItemCartDto + 'updateItemCartDto' + id + 'id');
    return await this.itemCartService.updateItem(id, updateItemCartDto);
  }

  @Delete(':id')
  public async deleteItemCart(@Param() id: string) {
    return await this.itemCartService.deleteItem(id);
  }
}
