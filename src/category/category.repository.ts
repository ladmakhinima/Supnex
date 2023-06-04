import { MongoRepository } from '../common/repository/mongo.repository';
import { Category, CategoryDocument } from './category.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export class CategoryRepository extends MongoRepository<CategoryDocument> {
  constructor(
    @InjectModel(Category.name) private readonly model: Model<CategoryDocument>,
  ) {
    super();
  }

  getModel(): Model<CategoryDocument> {
    return this.model;
  }
}
