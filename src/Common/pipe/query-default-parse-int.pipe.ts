import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';


import { ErrorManager } from '../../share/types/error.manager'

@Injectable()
export class QueryDefaultParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (typeof value === 'undefined') return value;

      if (!this.isNumeric(value)) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Validation failed (numeric string is expected)'
        }
        );

      }
      return parseInt(value, 10);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }


  private isNumeric(value: string): boolean {
    return (
      ['string', 'number'].includes(typeof value) &&
      /^-?\d+$/.test(value) &&
      isFinite(value as any)
    );
  }

}
