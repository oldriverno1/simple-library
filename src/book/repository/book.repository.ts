import { BookDto } from './../dto/book.dto';
import { Injectable } from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as Memory from 'lowdb/adapters/Memory';
import { BookEntity } from '../model/book-entity.interface';

@Injectable()
export class BookRepository {
  constructor() {
    this.initDataBase();
  }
  private db: lowdb.LowdbSync<BookEntity>;
  private readonly collectionName = 'books';

  private initDataBase() {
    const adapter = new Memory('');
    this.db = lowdb(adapter);
    this.db.defaults({ [this.collectionName]: [] }).write();
  }

  findAll(): BookEntity[] {
    return this.db.get(this.collectionName).value();
  }

  findById(id: string): BookEntity {
    return this.db.get(this.collectionName).find({ id }).value() ?? {};
  }

  create(book: BookDto): BookEntity {
    const books: BookEntity[] = this.db.get(this.collectionName).value();
    const entity = book.toEntity();
    books.push(entity);
    return entity;
  }

  delete(id: string): void {
    this.db.get(this.collectionName).remove({ id }).write();
  }
}
