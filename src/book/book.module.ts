import { Module } from '@nestjs/common';
import { BookController } from './controller/book.controller';
import { BookRepository } from './repository/book.repository';
import { BookService } from './service/book.service';

@Module({
  controllers: [BookController],
  providers: [BookService, BookRepository]
})
export class BookModule {}
