import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  MaterialSupplier,
  MaterialSupplierSchema,
} from './material-supplier.entity';
import docsProp from './docs-props/docs-props';

export type MaterialDocument = HydratedDocument<Material>;

@Schema()
export class Material {
  @docsProp.MaterialIDPropDoc()
  _id: string;

  @Prop({ name: 'name', type: String, required: true })
  @docsProp.MaterialNamePropDoc()
  name: string;

  @Prop({ name: 'category', type: String, required: true })
  @docsProp.MaterialCategoryPropDoc()
  category: string;

  @Prop({ name: 'suppliers', required: true, type: [MaterialSupplierSchema] })
  @docsProp.MaterialSuppliersPropDoc()
  suppliers: MaterialSupplier[];

  @Prop(
    raw({
      name: {
        type: String,
        name: 'name',
        required: true,
      },
      symbol: {
        type: String,
        name: 'symbol',
        required: true,
      },
    }),
  )
  @docsProp.MaterialUnitOfMeasurementPropDoc()
  unitOfMeasurement: Record<string, string>;

  @Prop({ name: 'stock', type: Number, required: true })
  @docsProp.MaterialStockPropDoc()
  stock: number;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
