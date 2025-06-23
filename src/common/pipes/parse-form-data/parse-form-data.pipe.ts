import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ParseFormDataPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {

    const dto = plainToInstance(metadata.metatype as any, value);


    const error = await validate(dto);

    console.log('error', error);

    if (error.length > 0) throw new BadRequestException('Validación fallida')

    return dto;
  }
}
