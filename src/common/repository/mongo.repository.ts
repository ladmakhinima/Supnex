import { IRepository } from './repository.abstract';
import { Model } from 'mongoose';

export abstract class MongoRepository<T extends object>
  implements IRepository<T>
{
  updateMany(where: Partial<T>, data: Partial<T>) {
    return this.getModel().updateMany(where, { $set: data }, { new: true });
  }

  abstract getModel(): Model<T>;

  create(data: Partial<T>) {
    return this.getModel().create(data);
  }

  findOne(where: Partial<T>) {
    return this.getModel().findOne(where).lean().exec();
  }

  findAll(where?: Partial<T>) {
    return this.getModel()
      .find(where || {})
      .lean()
      .exec();
  }

  update(where: Partial<T>, data: Partial<T>) {
    return this.getModel()
      .updateOne(where, { $set: data }, { new: true })
      .lean()
      .exec();
  }

  delete(where: Partial<T>) {
    return this.getModel().deleteOne(where).lean().exec();
  }
}
