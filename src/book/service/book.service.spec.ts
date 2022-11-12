import { BookDto } from './../dto/book.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { BookRepository } from '../repository/book.repository';
import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;
  let repo: BookRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService, BookRepository]
    }).compile();

    service = module.get<BookService>(BookService);
    repo = module.get<BookRepository>(BookRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return correct entity id', () => {
      const dto = new BookDto();
      const entity = dto.toEntity();
      jest.spyOn(repo, 'create').mockImplementation(() => entity);
      expect(service.create(dto)).toMatchObject({ id: entity.id });
    });
  });

  describe('create', () => {
    it('should return correct entity id', () => {
      const dto = new BookDto();
      const entity = dto.toEntity();
      jest.spyOn(repo, 'create').mockImplementation(() => entity);
      expect(service.create(dto)).toMatchObject({ id: entity.id });
    });
  });

  describe('find all', () => {
    it('should return an empty arrray', () => {
      jest.spyOn(repo, 'findAll').mockImplementation(() => []);
      expect(service.findAll()).toHaveLength(0);
    });

    it('should return one item in the array', () => {
      jest.spyOn(repo, 'findAll').mockImplementation(() => [{} as any]);
      expect(service.findAll()).toHaveLength(1);
    });
  });

  describe('find by id', () => {
    it('should return an empty object', () => {
      jest.spyOn(repo, 'findById').mockImplementation(() => ({} as any));
      expect(service.findById('')).toMatchObject({});
    });

    it('should return a correct entity', () => {
      const entity = new BookDto().toEntity();
      jest.spyOn(repo, 'findById').mockImplementation(() => entity);
      expect(service.findById(entity.id)).toMatchObject(entity);
    });
  });

  describe('delete by id', () => {
    it('should call with a correct id', () => {
      const fakeId = 'fakeId';
      const mBookRepository = { delete: jest.fn((id) => {}) };
      const mBookService = new BookService(mBookRepository as any);
      mBookService.deleteById(fakeId);
      expect(mBookRepository.delete).toHaveBeenCalledWith(fakeId);
    });
  });
});
