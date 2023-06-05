import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { Category } from '../category.entity';

export const GetCategoryByIdDoc = () => {
  return applyDecorators(
    ApiNotFoundResponse({ description: 'no category find with this id' }),
    ApiOkResponse({
      description: 'find single category by id',
      type: Category,
    }),
    ApiParam({
      name: 'id',
      type: String,
      required: true,
      description: 'the mongo id of category that you want to select',
    }),
  );
};
