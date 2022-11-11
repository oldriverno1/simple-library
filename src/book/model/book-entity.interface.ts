import { BookDto } from '../dto/book.dto';

// normally it should be a class with @Entity annotation if using ORM
export interface BookEntity extends BookDto {
  id: string;
}
