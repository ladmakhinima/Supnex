import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Category } from '../category.entity';

export const GetCategoriesDoc = () => {
  return applyDecorators(
    ApiOkResponse({
      description: 'find all categories that created',
      type: [Category],
    }),
  );
};
