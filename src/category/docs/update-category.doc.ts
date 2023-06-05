import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { UpdateCategoryDTO } from '../dtos/update-category.dto';

export const UpdateCategoryDoc = () => {
  return applyDecorators(
    ApiNotFoundResponse({ description: 'no category found with these id' }),
    ApiConflictResponse({
      description: 'the new category name is duplicated ...',
    }),
    ApiOkResponse({
      description: 'the category update successfully',
    }),
    ApiBody({
      description: 'the schema of category that you want to update',
      type: UpdateCategoryDTO,
      required: true,
    }),
    ApiParam({
      name: 'id',
      description: 'the mongo id of category that you want to update',
    }),
  );
};
