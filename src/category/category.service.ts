import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { SendUpdatedCategoryEvent } from './decorators/send-updated-category-event.decorator';
import { EventService } from '../common/event/event.service';
import { Category } from './category.entity';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';

@Injectable()
export class CategoryService {
  @Inject(CategoryRepository)
  private readonly categoryRepository: CategoryRepository;

  @Inject(EventService)
  public readonly eventService: EventService;

  async create(dto: CreateCategoryDTO) {
    const duplicatedCategory = await this.find({
      name: dto.name,
    });
    if (duplicatedCategory) {
      throw new ConflictException('category duplicated by name');
    }
    return this.categoryRepository.create({ name: dto.name });
  }

  async findById(_id: string, throwNotFoundErr = false) {
    const category = await this.categoryRepository.findOne({ _id });
    if (throwNotFoundErr && !category) {
      throw new NotFoundException('category is not found ...');
    }
    return category;
  }

  async find(where: Partial<Category>, throwNotFoundErr = false) {
    const category = await this.categoryRepository.findOne(where);
    if (throwNotFoundErr && !category) {
      throw new NotFoundException('category is not found ...');
    }
    return category;
  }

  findAll() {
    return this.categoryRepository.findAll();
  }

  @SendUpdatedCategoryEvent()
  async updateName(_id: string, dto: UpdateCategoryDTO) {
    const category = await this.findById(_id, true);
    const duplicatedCategory = await this.find({
      name: dto.name,
      _id: { $not: { $eq: _id } } as any,
    });
    if (duplicatedCategory) {
      throw new ConflictException('category duplicated by name');
    }
    await this.categoryRepository.update({ _id }, { name: dto.name });
    return {
      oldCategory: category.name,
      newCategory: dto.name,
      _id,
    };
  }
}
