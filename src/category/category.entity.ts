import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import docsProps from './docs-props/docs-props';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @docsProps.CategoryIDPropDoc()
  _id?: string;

  @Prop({ name: 'name', type: String, required: true })
  @docsProps.CategoryNamePropDoc()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
