import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { Category } from '../category.entity';
import { CreateCategoryDTO } from '../dtos/create-category.dto';

export const CreateCategoryDoc = () => {
  return applyDecorators(
    ApiConflictResponse({ description: 'the category name is duplicated ...' }),
    ApiCreatedResponse({
      type: Category,
      description: 'category created successfully ...',
    }),
    ApiBody({
      required: true,
      type: CreateCategoryDTO,
      description: 'the schema of create category',
    }),
  );
};
