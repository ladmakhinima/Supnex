import { Injectable } from '@nestjs/common';
import { MongoRepository } from '../common/repository/mongo.repository';
import { Material, MaterialDocument } from './material.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MaterialRepository extends MongoRepository<MaterialDocument> {
  constructor(
    @InjectModel(Material.name)
    private readonly materialModel: Model<MaterialDocument>,
  ) {
    super();
  }

  getModel(): Model<MaterialDocument> {
    return this.materialModel;
  }
}
