import { BookDto } from './../dto/book.dto';
import { BookRepository } from './../repository/book.repository';
import { Injectable } from '@nestjs/common';
import { BookEntity } from '../model/book-entity.interface';

@Injectable()
export class BookService {
  constructor(private readonly bookRepo: BookRepository) {}

  create(book: BookDto): { id: string } {
    return { id: this.bookRepo.create(book).id };
  }

  findAll(): BookEntity[] {
    return this.bookRepo.findAll();
  }

  findById(id: string): BookEntity {
    return this.bookRepo.findById(id);
  }

  deleteById(id: string): void {
    this.bookRepo.delete(id);
  }
}
