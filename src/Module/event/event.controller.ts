import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
  Inject,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import * as admin from 'firebase-admin';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ErrorManager } from '../../share/types/error.manager';
import { QueryDefaultParseIntPipe } from '../../Common/pipe/query-default-parse-int.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { FirebaseStorageService } from 'src/Service/Firebase/FirebaseStorage.service';

@Controller('event')
export class EventController {
  constructor( private readonly firebaseStorageService: FirebaseStorageService, @Inject('firebaseAdmin') private readonly firebaseAdmin: admin.app.App, private readonly eventService: EventService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  async uploadImage(@UploadedFile() file: any) {
    const destinationPath = `image_user/${file.originalname}`;

    try {
      await this.firebaseStorageService.uploadImage(file, destinationPath)
      const imageUrl = await this.firebaseStorageService.getDownloadUrl(destinationPath);

      console.log(`Imagen subida exitosamente a ${imageUrl}`);
      return imageUrl
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  }

  @Post('create')
  async CreateEvents(@Body() createEventDto: CreateEventDto) {
    try {
      console.log("info dto controller: ", createEventDto)
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

  @Get()
  async getAllEvents(
    @Query('limit', QueryDefaultParseIntPipe) limit: number, // uso un pipe para convertir el string a int y si no se puede convertir aroja un error
    @Query('off-set', QueryDefaultParseIntPipe) off_set: number,
  ) {
    try {
      const events = await this.eventService.getAllEvents(limit, off_set);
      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  @Get('upcoming')
  async getUpcomingEvents(
    @Query('limit', QueryDefaultParseIntPipe) limit: number,
  ) {
    try {
      const events = await this.eventService.getUpcomingEvents(limit);
      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
