import { ApiProperty } from '@nestjs/swagger';

const CategoryNamePropDoc = () => {
  return ApiProperty({
    name: 'name',
    description: 'the name of category that you want to create',
    type: String,
    required: true,
    example: 'سبزیجات',
  });
};

const CategoryIDPropDoc = () => {
  return ApiProperty({
    name: '_id',
    description: 'the mongo id of category',
    type: String,
    required: true,
  });
};

export default {
  CategoryNamePropDoc,
  CategoryIDPropDoc,
};
