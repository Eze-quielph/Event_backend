import { Controller, Post } from '@nestjs/common';
import { ItemCartService } from './item-cart.service';
import { CreateItemCartDto } from './dto/create-item-cart.dto';

@Controller('item-cart')
export class ItemCartController {
    constructor(private readonly itemCartService: ItemCartService) {}

    @Post()
    public async createItemCart(itemCartDto: CreateItemCartDto){
        return await this.itemCartService.createItemCart(itemCartDto);
    }
}
