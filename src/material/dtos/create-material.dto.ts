import { Transform } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import docsProps from '../docs-props/docs-props';

export class CreateMaterialSupplierDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @docsProps.MaterialSupplierFullNamePropDoc()
  fullName: string;

  @IsNotEmpty()
  @IsNumber()
  @docsProps.MaterialSupplierBasePricePropDoc()
  basePrice: number;
}

export class MaterialUnitOfMeasurement {
  @docsProps.MaterialUnitNamePropDoc()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @docsProps.MaterialUnitSymbolPropDoc()
  symbol: string;
}

export class CreateMaterialDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @docsProps.MaterialNamePropDoc()
  name: string;

  @IsNotEmpty()
  @IsString()
  @docsProps.MaterialCategoryPropDoc()
  category: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @docsProps.MaterialSuppliersPropDoc()
  suppliers: CreateMaterialSupplierDTO[];

  @IsNotEmpty()
  @IsInt()
  @docsProps.MaterialStockPropDoc()
  stock: number;

  @IsNotEmpty()
  @Transform(() => MaterialUnitOfMeasurement)
  @docsProps.MaterialUnitOfMeasurementPropDoc()
  unitOfMeasurement: Record<string, string>;
}
