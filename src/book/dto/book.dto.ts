import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import * as Moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { BookEntity } from '../model/book-entity.interface';

export class BookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsDate()
  @Transform(({ value }) => {
    const moment = Moment(value, 'YYYY-MM-DD');
    if (!moment.isValid()) throw new BadRequestException('publishDate should be in YYYY-MM-DD format');
    return moment.toDate();
  })
  publishDate: Date;

  toEntity(): BookEntity {
    return { ...this, id: uuidv4() };
  }
}
