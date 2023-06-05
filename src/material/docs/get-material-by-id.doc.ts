import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { Material } from '../material.entity';

export function GetMaterialByIdDoc() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      description: 'the id of material that you want to see datail',
      required: true,
      example: 'mongoid',
    }),
    ApiNotFoundResponse({
      description:
        'invalid material id because is not found the material with this id',
    }),
    ApiOkResponse({ description: 'get material by id', type: Material }),
  );
}
