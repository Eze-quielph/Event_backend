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
      console.log(name)
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
}
