import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ErrorManager } from 'src/share/types/error.manager';
import { Event } from './entities/event.entity';
import { Op } from 'sequelize';

@Injectable()
export class EventService {
  async create(createEventDto: CreateEventDto) {
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

  async findByName(name: string) {
    try {
      const event = await Event.findAndCountAll({
        where: { Name: { [Op.like]: `${name}%`, [Op.regexp]: '^[a-zA-Z]' } },
      });

      if (event.count === 0) {
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
        throw new ErrorManager({ type: 'BAD_REQUEST', message: 'ID is required' });
      }
  
      const updatedEvent = await Event.update(updateEventDto, {
        where: { id },
      })

      const event = await Event.findByPk(id)
  
      return {updatedEvent, event}
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
}
