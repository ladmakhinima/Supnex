import { IsNumber } from 'class-validator';
import docsProps from '../docs-props/docs-props';

export class EditMaterialStockDTO {
  @docsProps.MaterialStockPropDoc()
  @IsNumber()
  stock: number;
}
