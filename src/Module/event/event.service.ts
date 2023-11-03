import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import * as dayjs from 'dayjs'

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ErrorManager } from '../../share/types/error.manager';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  async create(createEventDto: CreateEventDto) {
    console.info('info dto service: ', createEventDto);
    try {
      const [event, created] = await Event.findOrCreate({
        where: { Name: createEventDto.Name },
        defaults: {
          Name: createEventDto.Name,
          Description: createEventDto.Description,
          Day: createEventDto.Day,
          Hour: createEventDto.Hour,
          Age_min: createEventDto.Age_min,
          Category: createEventDto.Category,
          Ubication: createEventDto.Ubication,
          Price: createEventDto.Price,
          Image: createEventDto.Image,
          Artist: createEventDto.Artist,
          Capacity: createEventDto.Capacity,
        },
      });

      console.log(created)
      if (!created) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Event already exists',
        });
      }
      return event;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findByName(name: string, limit: number, off_set: number) {
    try {
      const Limit: number = +limit || 20;
      const OffLimit: number = +off_set || 0;
      const {rows, count} = await Event.findAndCountAll({
        where: {
          Name: {
            [Op.like]: `${name}%`,
            [Op.regexp]: '^[a-zA-Z]',
          },
        },
        limit: Limit,
        offset: OffLimit,
      });

      if (count === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Event not found',
        });
      }

      const events = []

      for(const event in rows){
        events.push(rows[event].dataValues)
      }

      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findById(id: string) {
    try {
      const event = await Event.findByPk(id);
      if (!event) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Event not found',
        });
      }
      return event;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    try {
      if (!id) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'ID is required',
        });
      }

      const updatedEvent = await Event.update(updateEventDto, {
        where: { id },
      });

      const event = await Event.findByPk(id);

      return { updatedEvent, event };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: string) {
    try {
      const remove = await Event.destroy({ where: { id } });
      if (!remove) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Event not found',
        });
      }
      return remove;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async restore(id: string): Promise<Event> {
    try {
      const restoreCount: any = await Event.restore({ where: { id } });

      if (restoreCount === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Event not found or already restored',
        });
      }

      const restoredEvent: Event | null = await Event.findByPk(id);

      if (!restoredEvent) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Event not found after restoration',
        });
      }

      return restoredEvent;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async SearchByCategory(category: string, limit: number, off_set: number) {
    try {
      const Limit: number = +limit || 20;
      const OffLimit: number = +off_set || 0;
      const {rows, count} = await Event.findAndCountAll({
        where: {
          Category: { [Op.like]: `${category}`, [Op.regexp]: '^[a-zA-Z]' },
        },
        limit: Limit,
        offset: OffLimit,
      });

      if (count === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Event not found',
        });
      }

      const events = []

      for(const event in rows){
        events.push(rows[event].dataValues)
      }

      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async SearchByCategoryAndPrice(
    category: string,
    max_price: number,
    min_price: number,
    limit: number,
    off_set: number,
  ) {
    try {
      const Limit: number = +limit || 20;
      const OffLimit: number = +off_set || 0;
      const {rows, count} = await Event.findAndCountAll({
        where: {
          Category: { [Op.like]: `${category}`, [Op.regexp]: '^[a-zA-Z]' },
          Price: { [Op.and]: { [Op.lte]: max_price, [Op.gte]: min_price } },
        },
        limit: Limit,
        offset: OffLimit
      });

      if (count === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Event not found',
        });
      }
      const events = []

      for(const event in rows){
        events.push(rows[event].dataValues)
      }

      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async SearchByPrice(
    min_price: number,
    max_price: number,
    limit: number,
    off_set: number,
  ) {
    try {
      const Limit: number = +limit || 20;
      const OffLimit: number = +off_set || 0;
      const {rows, count} = await Event.findAndCountAll({
        where: {
          Price: {
            [Op.and]: {
              [Op.lte]: max_price,
              [Op.gte]: min_price,
            },
          },
        },
        limit: Limit,
        offset: OffLimit
      });

      if (count === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Event not found of price',
        });
      }

      const events = []

      for(const event in rows){
        events.push(rows[event].dataValues)
      }

      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async SearchByDays(
    min_day: Date,
    max_day: Date,
    limit: number,
    off_set: number,
  ) {
    try {
      const Limit: number = +limit || 20;
      const OffLimit: number = +off_set || 0;
      const minDay = new Date(min_day);
      const maxDay = new Date(max_day);

      const {rows, count} = await Event.findAndCountAll({
        where: {
          Day: {
            [Op.and]: {
              [Op.lte]: maxDay,
              [Op.gte]: minDay,
            },
          },
        },
        limit: Limit,
        offset: OffLimit
      });

      if (count === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Event not found of range day',
        });
      }

      const events = []

      for(const event in rows){
        events.push(rows[event].dataValues)
      }

      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async SearchByCategoryAndDay(
    category: string,
    max_day: Date,
    min_day: Date,
    limit: number,
    off_set: number,
  ) {
    try {
      const minDay = new Date(min_day);
      const maxDay = new Date(max_day);
      const Limit: number = +limit || 20;
      const OffLimit: number = +off_set || 0;

      const {rows, count} = await Event.findAndCountAll({
        where: {
          Category: { [Op.like]: `${category}`, [Op.regexp]: '^[a-zA-Z]' },
          Day: { [Op.and]: { [Op.lte]: maxDay, [Op.gte]: minDay } },
        },
        limit: Limit,
        offset: OffLimit
      });

      if (count === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Event not found',
        });
      }
      const events = []

      for(const event in rows){
        events.push(rows[event].dataValues)
      }

      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async SearchByPriceAndDay(
    min_price: number,
    max_price: number,
    max_day: Date,
    min_day: Date,
    limit: number,
    off_set: number,
  ) {
    try {
      const Limit: number = +limit || 20;
      const OffLimit: number = +off_set || 0;
      const minDay = new Date(min_day);
      const maxDay = new Date(max_day);
      const {rows, count} = await Event.findAndCountAll({
        where: {
          Day: { [Op.and]: { [Op.lte]: maxDay, [Op.gte]: minDay } },
          Price: { [Op.and]: { [Op.lte]: max_price, [Op.gte]: min_price } },
        },
        limit: Limit,
        offset: OffLimit
      });

      if (count === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Event not found',
        });
      }

      const events = []

      for(const event in rows){
        events.push(rows[event].dataValues)
      }

      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getAllEvents(
    limit: number,
    off_set: number
  ) {
    try {
      console.info('info service: ', limit, off_set)
      const Limit: number = limit || 20;
      const OffLimit: number = off_set || 0;
      
      const {count, rows} = await Event.findAndCountAll({
        limit: Limit,
        offset: OffLimit
      });
      console.info('info service: ', )
      if (count === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Event not found',
        });
      }
      const events = []

      for(const event in rows){
        events.push(rows[event].dataValues)
      }
      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getUpcomingEvents(
    limit: number
  ) {
    try {
      const currentDate = dayjs();
      const Limit: number = limit || 6;
      const {count, rows} = await Event.findAndCountAll({
        where: {
          Day: { [Op.gt]: currentDate }
        },
        order: [['Day', 'ASC']],
        limit: Limit
      });

      if (count === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Event not found',
        });
      }
      const events = []

      for(const event in rows){
        events.push(rows[event].dataValues)
      }

      return events;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
