import { Test, TestingModule } from '@nestjs/testing';
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
});
