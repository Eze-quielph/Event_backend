import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ErrorManager } from '../../share/types/error.manager';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('create')
  async CreateEvents(@Body() createEventDto: CreateEventDto) {
    try {
      const event = await this.eventService.create(createEventDto);
      return event;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Put('update/:id')
  async UpdateEventsById(
    @Body() updateEventDto: UpdateEventDto,
    @Param('id') id: string,
  ) {
    try {
      if (!id) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Id is required',
        });
      }
      const event = await this.eventService.update(id, updateEventDto);

      return event;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Get('search')
  async SearchEventsByName(@Query('name') name: string) {
    try {
      if (!name) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Name is required',
        });
      }
      console.log(name);
      const event = await this.eventService.findByName(name);
      return event;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Get('search/:id')
  async SearchEventsById(@Param('id') id: string) {
    try {
      if (!id) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Id is required',
        });
      }
      const event = await this.eventService.findById(id);
      return event;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Delete('delete/:id')
  async DeleteEventsById(@Param('id') id: string) {
    try {
      if (!id) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Id is required',
        });
      }
      const event = await this.eventService.remove(id);
      return event;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Get('restore/:id')
  async RestoreEventsById(@Param('id') id: string) {
    try {
      if (!id) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Id is required',
        });
      }
      const event = await this.eventService.restore(id);
      return event;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Get('filter/category')
  async SearchByCategory(@Query('category') category: string) {
    try {
      if (!category)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'category is required',
        });
      const events = await this.eventService.SearchByCategory(category);
      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Get('filter/price')
  async SearchByPrice(
    @Query('min_price') min_price: number,
    @Query('max_price') max_price: number,
  ) {
    try {
      if (!min_price || !max_price)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'range price is required',
        });
      const events = await this.eventService.SearchByPrice(
        min_price,
        max_price,
      );
      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Get('filter/day')
  async SearchByDay(
    @Query('min_day') min_day: Date,
    @Query('max_day') max_day: Date,
  ) {
    try {
      if (!min_day || !max_day)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'range day is required',
        });
      const events = await this.eventService.SearchByDays(min_day, max_day);
      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Get('filter/category_price')
  async SearchByCategoryAndPrice(
    @Query('min_price') min_price: number,
    @Query('max_price') max_price: number,
    @Query('category') category: string,
  ) {
    try {
      if (!min_price || !max_price || !category)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'range price is required',
        });
      const events = await this.eventService.SearchByCategoryAndPrice(
        category,
        max_price,
        min_price
      );
      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Get('filter/category_day')
  async SearchByCategoryAndDay(
    @Query('min_day') min_day: Date,
    @Query('max_day') max_day: Date,
    @Query('category') category: string,
  ) {
    try {
      if (!min_day || !max_day || !category)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'range price is required',
        });
      const events = await this.eventService.SearchByCategoryAndDay(
        category,
        max_day,
        min_day
      );
      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Get('filter/price_day')
  async SearchByPriceAndDay(
    @Query('min_day') min_day: Date,
    @Query('max_day') max_day: Date,
    @Query('min_price') min_price: number,
    @Query('max_price') max_price: number
  ) {
    try {
      if (!min_day || !max_day || !min_price || !max_price)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'range price is required',
        });
      const events = await this.eventService.SearchByPriceAndDay(
        min_price,
        max_price,
        max_day,
        min_day,
      );
      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
