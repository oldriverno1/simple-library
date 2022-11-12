import { IdDto } from './../../share/dto/uuid.dto';
import { BookDto } from './../dto/book.dto';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { BookService } from '../service/book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() book: BookDto) {
    return this.bookService.create(book);
  }

  @Get()
  getAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  getById(@Param() { id }: IdDto) {
    return this.bookService.findById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param() { id }: IdDto) {
    this.bookService.deleteById(id);
  }
}
