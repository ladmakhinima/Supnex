import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateMaterialDTO } from '../dtos/create-material.dto';

export function CreateMaterialDoc() {
  return applyDecorators(
    ApiCreatedResponse({
      description:
        'The material created successfully with specefic category and supplier',
    }),
    ApiConflictResponse({
      description:
        'this material with this name exist before , change name of material',
    }),
    ApiNotFoundResponse({
      description: 'selected category not found, check categories',
    }),
    ApiBody({
      type: CreateMaterialDTO,
      description: 'The Schema of create category',
    }),
  );
}
