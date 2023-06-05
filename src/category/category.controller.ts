import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { IsMongoIDPipe } from '../common/pipes';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';
import { CreateCategoryDoc } from './docs/create-category.doc';
import { GetCategoriesDoc } from './docs/get-categories.doc';
import { GetCategoryByIdDoc } from './docs/get-category-by-id.doc';
import { UpdateCategoryDoc } from './docs/update-category.doc';

@ApiTags('Category Endpoint')
@Controller('category')
export class CategoryController {
  @Inject(CategoryService)
  private readonly categoryService: CategoryService;

  @Post()
  @CreateCategoryDoc()
  createCategoryAction(@Body() body: CreateCategoryDTO) {
    return this.categoryService.create(body);
  }

  @Get()
  @GetCategoriesDoc()
  findCategoriesAction() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @GetCategoryByIdDoc()
  findCategoryById(@Param('id', IsMongoIDPipe) _id: string) {
    return this.categoryService.findById(_id, true);
  }

  @Patch(':id')
  @UpdateCategoryDoc()
  updateCategoryById(
    @Param('id', IsMongoIDPipe) id: string,
    @Body() body: UpdateCategoryDTO,
  ) {
    return this.categoryService.updateName(id, body);
  }
}
