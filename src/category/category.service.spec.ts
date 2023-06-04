import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';
import { EventService } from '../common/event/event.service';
import {
  mockCategories,
  mockCreateCategoryDto,
  mockCreateCategoryResult,
} from './category.stub';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('Category Service', () => {
  let categoryService: CategoryService;
  let categoryRepository: CategoryRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CategoryRepository,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: EventService,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    categoryService = moduleRef.get<CategoryService>(CategoryService);
    categoryRepository = moduleRef.get<CategoryRepository>(CategoryRepository);
  });

  describe('create', () => {
    it('create should return anything returned by category repository create', () => {
      jest
        .spyOn(categoryRepository, 'create')
        .mockResolvedValueOnce(mockCreateCategoryResult() as any);

      expect(categoryService.create(mockCreateCategoryDto())).resolves.toEqual(
        mockCreateCategoryResult(),
      );
    });
    it('category find method should called with correct parameters', async () => {
      const spyFindCategory = jest.spyOn(categoryService, 'find');
      await categoryService.create(mockCreateCategoryDto());
      expect(spyFindCategory).toBeCalledWith({
        name: mockCreateCategoryDto().name,
      });
    });
    it('create should return exception if find method return exception', () => {
      jest
        .spyOn(categoryService, 'find')
        .mockReturnValueOnce(
          new ConflictException('category duplicated by name') as any,
        );
      expect(
        categoryService.create(mockCreateCategoryDto()),
      ).rejects.toBeInstanceOf(ConflictException);
    });
  });

  describe('find all', () => {
    it('find all category result should be equal with category repository find all method', () => {
      jest
        .spyOn(categoryRepository, 'findAll')
        .mockResolvedValueOnce(mockCategories() as any);
      expect(categoryService.findAll()).resolves.toEqual(mockCategories());
    });

    it('category repository find all method should called once', async () => {
      const spyFindAll = jest.spyOn(categoryRepository, 'findAll');
      await categoryService.findAll();
      expect(spyFindAll).toBeCalledTimes(1);
    });
  });

  describe('find', () => {
    it('find method should return anything that returned by category repository findone', () => {
      jest
        .spyOn(categoryRepository, 'findOne')
        .mockResolvedValueOnce(mockCreateCategoryResult() as any);
      expect(
        categoryService.find({ name: mockCreateCategoryDto().name }),
      ).resolves.toEqual(mockCreateCategoryResult());
    });

    it('find method should return notfound exception when no category found and throwNotFoundError param Become true', () => {
      jest
        .spyOn(categoryRepository, 'findOne')
        .mockResolvedValueOnce(undefined);
      expect(
        categoryService.find({ name: 'anything' }, true),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('find method should not return notfound exception when no category found and not passed any param as throwNotFoundError', () => {
      jest
        .spyOn(categoryRepository, 'findOne')
        .mockResolvedValueOnce(undefined);
      expect(categoryService.find({ name: 'anything' })).resolves.toEqual(
        undefined,
      );
    });

    it('when find method called, the findOne should called once', async () => {
      const spyFindOneMongooseRepo = jest.spyOn(categoryRepository, 'findOne');
      await categoryService.find({ name: mockCreateCategoryDto().name });
      expect(spyFindOneMongooseRepo).toBeCalledTimes(1);
    });
    it('when find method called, the findOne should called with correct param', async () => {
      const spyFindOneMongooseRepo = jest.spyOn(categoryRepository, 'findOne');
      categoryService.find({ name: mockCreateCategoryDto().name });
      expect(spyFindOneMongooseRepo).toHaveBeenCalledWith({
        name: mockCreateCategoryDto().name,
      });
    });
  });

  describe('update name', () => {
    it('it should return exception if find by id throw exception', () => {
      jest
        .spyOn(categoryService, 'findById')
        .mockRejectedValueOnce(
          new NotFoundException('category is not found ...'),
        );

      expect(
        categoryService.updateName('some id', { name: 'some name' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('it should return exception if find method return category', () => {
      jest
        .spyOn(categoryService, 'findById')
        .mockResolvedValueOnce(mockCreateCategoryResult() as any);
      jest
        .spyOn(categoryService, 'find')
        .mockResolvedValueOnce(mockCreateCategoryResult() as any);
      expect(
        categoryService.updateName('some id', { name: 'some name' }),
      ).rejects.toBeInstanceOf(ConflictException);
    });

    it('it should call update method if no duplicated category found and specefic category found', async () => {
      jest
        .spyOn(categoryService, 'findById')
        .mockResolvedValueOnce(mockCreateCategoryResult() as any);
      jest.spyOn(categoryService, 'find').mockResolvedValueOnce(undefined);
      const spyUpdate = jest.spyOn(categoryRepository, 'update');
      await categoryService.updateName('some id', { name: 'some name' });
      expect(spyUpdate).toHaveBeenCalled();
    });

    it('it should call the update method with correct param', async () => {
      jest
        .spyOn(categoryService, 'findById')
        .mockResolvedValueOnce(mockCreateCategoryResult() as any);
      jest.spyOn(categoryService, 'find').mockResolvedValueOnce(undefined);
      const spyUpdate = jest.spyOn(categoryRepository, 'update');
      await categoryService.updateName('some id', { name: 'some name' });
      expect(spyUpdate).toHaveBeenCalledWith(
        { _id: 'some id' },
        { name: 'some name' },
      );
    });

    it('it should return correct result', async () => {
      jest
        .spyOn(categoryService, 'findById')
        .mockResolvedValueOnce(mockCreateCategoryResult() as any);
      jest.spyOn(categoryService, 'find').mockResolvedValueOnce(undefined);
      await expect(
        categoryService.updateName('some id', { name: 'some name' }),
      ).resolves.toEqual(
        expect.objectContaining({
          oldCategory: mockCreateCategoryResult().name,
          newCategory: 'some name',
          _id: 'some id',
        }),
      );
    });
  });
});
