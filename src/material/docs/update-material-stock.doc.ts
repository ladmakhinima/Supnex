import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { EditMaterialStockDTO } from '../dtos/edit-material-stock.dto';
import { Material } from '../material.entity';

export function UpdateMaterialStockDoc() {
  return applyDecorators(
    ApiNotFoundResponse({
      description: 'the material is not found',
    }),
    ApiBody({
      description: 'the schema body of material',
      type: EditMaterialStockDTO,
    }),
    ApiOkResponse({
      description: 'increase or decrease quantity or stock of material',
      type: Material,
    }),
    ApiParam({
      name: 'id',
      description: 'the id of material that you want to edit stock',
      required: true,
      example: 'mongoid',
    }),
  );
}
