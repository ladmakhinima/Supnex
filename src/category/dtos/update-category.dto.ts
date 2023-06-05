import { IsOptional, IsString, MinLength } from 'class-validator';
import docsProps from '../docs-props/docs-props';

export class UpdateCategoryDTO {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @docsProps.CategoryNamePropDoc()
  name: string;
}
