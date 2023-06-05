import { ApiProperty } from '@nestjs/swagger';

const MaterialUnitNamePropDoc = () => {
  return ApiProperty({
    name: 'name',
    description: 'the name of the unit',
    example: 'Num',
    required: true,
    type: String,
  });
};

const MaterialUnitSymbolPropDoc = () => {
  return ApiProperty({
    name: 'symbol',
    description: 'the symbol of the unit',
    example: '$',
    required: true,
    type: String,
  });
};

const MaterialIDPropDoc = () => {
  return ApiProperty({
    name: '_id',
    type: String,
    description: 'the mongo id identifier',
  });
};

const MaterialNamePropDoc = () => {
  return ApiProperty({
    description: 'name of material',
    example: 'موز',
    required: true,
    type: String,
  });
};

const MaterialCategoryPropDoc = () => {
  return ApiProperty({
    description: 'category of created material',
    example: 'سبزیجات',
    required: true,
    type: String,
  });
};

const MaterialSuppliersPropDoc = () => {
  return ApiProperty({
    name: 'suppliers',
    description: 'the supplier of these materials with base price',
    required: true,
    example: [
      {
        fullName: 'john doe',
        basePrice: 20_000,
      },
    ],
  });
};

const MaterialUnitOfMeasurementPropDoc = () => {
  return ApiProperty({
    name: 'unitOfMeasurement',
    description: 'the unit of measurement that include name and symbol',
    required: true,
    example: {
      name: 'عدد',
      symbol: 'num',
    },
  });
};

const MaterialStockPropDoc = () => {
  return ApiProperty({
    name: 'stock',
    description: 'the quantity of these material',
    required: true,
    example: 10,
    type: Number,
  });
};

const MaterialSupplierFullNamePropDoc = () => {
  return ApiProperty({
    name: 'fullName',
    description: 'the fullname of supplier that provide materials',
    required: true,
    example: 'john doe',
    type: String,
  });
};

const MaterialSupplierBasePricePropDoc = () => {
  return ApiProperty({
    name: 'basePrice',
    description: 'the base price that supplier provide for material',
    required: true,
    example: 10_000,
    type: Number,
  });
};

export default {
  MaterialCategoryPropDoc,
  MaterialNamePropDoc,
  MaterialIDPropDoc,
  MaterialUnitNamePropDoc,
  MaterialUnitSymbolPropDoc,
  MaterialSupplierBasePricePropDoc,
  MaterialSupplierFullNamePropDoc,
  MaterialStockPropDoc,
  MaterialUnitOfMeasurementPropDoc,
  MaterialSuppliersPropDoc,
};
