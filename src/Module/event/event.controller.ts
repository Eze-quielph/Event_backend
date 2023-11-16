import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ErrorManager } from '../../share/error.manager';
import { AuthGuard } from 'src/Common/Guards/auth.guards';
import { RolesAccess } from 'src/Common/Decorators/roles.decoractors';
import { RolesGuard } from 'src/Common/Guards/roles.guard';
import { PublicAccess } from 'src/Common/Decorators/public.decoractors';

@Controller('event')
@UseGuards(AuthGuard, RolesGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @RolesAccess('CREATOR')
  @Post('create')
  async CreateEvents(@Body() createEventDto: CreateEventDto) {
    try {
      console.log('info dto controller: ', createEventDto);

      const currentDate = new Date();
      const dateEvent = new Date(createEventDto.Day);
      if (dateEvent < currentDate) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Date is invalid',
        });
      }

      const currentHour = new Date();
      const hourEvent = new Date(createEventDto.Hour);

      if (hourEvent < currentHour) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Hour is invalid',
        });
      }

      const event = await this.eventService.create(createEventDto);
      return event;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @RolesAccess('ADMIN', 'CREATOR')
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

  @RolesAccess('USER', 'ADMIN', 'CREATOR')
  @Get('search')
  async SearchEventsByName(
    @Query('name') name: string,
    @Query('limit') limit: number,
    @Query('off-set') off_set: number,
  ) {
    try {
      if (!name) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Name is required',
        });
      }
      console.log(name);
      const event = await this.eventService.findByName(name, limit, off_set);
      return event;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @RolesAccess('USER', 'ADMIN', 'CREATOR')
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

  // @RolesAccess('ADMIN', 'CREATOR')
  @PublicAccess()
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

  @PublicAccess()
  @Get('restore')
  async RestoreEventsById(@Query('name') name: string) {
    try {
      if (!name) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'name is required',
        });
      }
      const event = await this.eventService.restore(name);
      return event;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @RolesAccess('USER', 'ADMIN', 'CREATOR')
  @Get('filter/category')
  async SearchByCategory(
    @Query('category') category: string,
    @Query('limit') limit: number,
    @Query('off-set') off_set: number,
  ) {
    try {
      if (!category)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'category is required',
        });
      const events = await this.eventService.SearchByCategory(
        category,
        limit,
        off_set,
      );
      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @RolesAccess('USER', 'ADMIN', 'CREATOR')
  @Get('filter/price')
  async SearchByPrice(
    @Query('min_price') min_price: number,
    @Query('max_price') max_price: number,
    @Query('limit') limit: number,
    @Query('off-set') off_set: number,
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
        limit,
        off_set,
      );
      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @RolesAccess('USER', 'ADMIN', 'CREATOR')
  @Get('filter/day')
  async SearchByDay(
    @Query('min_day') min_day: Date,
    @Query('max_day') max_day: Date,
    @Query('limit') limit: number,
    @Query('off-set') off_set: number,
  ) {
    try {
      if (!min_day || !max_day)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'range day is required',
        });
      const events = await this.eventService.SearchByDays(
        min_day,
        max_day,
        limit,
        off_set,
      );
      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @RolesAccess('USER', 'ADMIN', 'CREATOR')
  @Get('filter/category_price')
  async SearchByCategoryAndPrice(
    @Query('min_price') min_price: number,
    @Query('max_price') max_price: number,
    @Query('category') category: string,
    @Query('limit') limit: number,
    @Query('off-set') off_set: number,
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
        min_price,
        limit,
        off_set,
      );
      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @RolesAccess('USER', 'ADMIN', 'CREATOR')
  @Get('filter/category_day')
  async SearchByCategoryAndDay(
    @Query('min_day') min_day: Date,
    @Query('max_day') max_day: Date,
    @Query('category') category: string,
    @Query('limit') limit: number,
    @Query('off-set') off_set: number,
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
        min_day,
        limit,
        off_set,
      );
      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @RolesAccess('USER', 'ADMIN', 'CREATOR')
  @Get('filter/price_day')
  async SearchByPriceAndDay(
    @Query('min_day') min_day: Date,
    @Query('max_day') max_day: Date,
    @Query('min_price') min_price: number,
    @Query('max_price') max_price: number,
    @Query('limit') limit: number,
    @Query('off-set') off_set: number,
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
        limit,
        off_set,
      );
      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @RolesAccess('USER', 'ADMIN', 'CREATOR')
  @Get()
  async getAllEvents(
    @Query('limit') limit: number,
    @Query('off-set') off_set: number,
  ) {
    try {
      const events = await this.eventService.getAllEvents(+limit, +off_set);
      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @PublicAccess()
  @Get('upcoming')
  async getUpcomingEvents(@Query('limit') limit: number) {
    try {
      const events = await this.eventService.getUpcomingEvents(+limit);
      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @RolesAccess('USER', 'ADMIN', 'CREATOR')
  @Get('filter')
  public async getEventsByUserId(
    @Query('user_id') user_id: string,
    @Query('limit') limit: number,
    @Query('off_set') off_set: number,
  ) {
    try {
      return this.eventService.searchEventUserId(+limit, +off_set, user_id);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
