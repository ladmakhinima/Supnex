import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Material } from '../material.entity';

export function GetMaterialsDoc() {
  return applyDecorators(
    ApiOkResponse({
      description: 'get all created materials with suppliers and categories',
      type: [Material],
    }),
  );
}
