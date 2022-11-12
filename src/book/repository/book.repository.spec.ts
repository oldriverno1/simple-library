import { Test, TestingModule } from '@nestjs/testing';
import { BookDto } from '../dto/book.dto';
import { BookRepository } from './book.repository';

describe('BookRepository', () => {
  let service: BookRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookRepository]
    }).compile();

    service = module.get<BookRepository>(BookRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll and create', () => {
    it('should have one item in the array', () => {
      service.create(new BookDto());
      expect(service.findAll()).toHaveLength(1);
    });
  });

  describe('find by id', () => {
    it('should find the correct entity', () => {
      const entity = service.create(new BookDto());
      expect(service.findById(entity.id)).toHaveProperty('id');
    });

    it('should return empty object', () => {
      expect(service.findById('')).toMatchObject({});
    });
  });

  describe('delete', () => {
    it('should remove the item correctly', () => {
      const { id } = service.create(new BookDto());
      service.delete(id);
      expect(service.findById(id)).toMatchObject({});
    });
  });
});
