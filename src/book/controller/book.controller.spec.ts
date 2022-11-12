import { BookDto } from './../dto/book.dto';
import { BookRepository } from './../repository/book.repository';
import { BookService } from './../service/book.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService, BookRepository]
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get all', () => {
    it('should return empty array', () => {
      jest.spyOn(service, 'findAll').mockImplementation(() => []);
      expect(controller.getAll()).toHaveLength(0);
    });
  });

  describe('create', () => {
    it('should return correct id', () => {
      const dto = new BookDto();
      const { id } = dto.toEntity();
      jest.spyOn(service, 'create').mockImplementation(() => ({ id }));
      expect(controller.create(dto)).toMatchObject({ id });
    });
  });

  describe('get by id', () => {
    it('should get correct entity', () => {
      const entity = new BookDto().toEntity();
      jest.spyOn(service, 'findById').mockImplementation(() => entity);
      expect(controller.getById({ id: entity.id })).toMatchObject(entity);
    });
  });

  describe('delete', () => {
    it('should call with a correct id', () => {
      const fakeId = 'fakeId';
      const mBookService = { deleteById: jest.fn((id) => {}) };
      const mBookController = new BookController(mBookService as any);
      mBookController.deleteById({ id: fakeId });
      expect(mBookService.deleteById).toHaveBeenCalledWith(fakeId);
    });
  });
});
