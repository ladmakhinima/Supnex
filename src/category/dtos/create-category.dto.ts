import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import docsProps from '../docs-props/docs-props';

export class CreateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @docsProps.CategoryNamePropDoc()
  name: string;
}
