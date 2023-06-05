import { Model } from 'mongoose';

export abstract class IRepository<T extends object> {
  abstract create(data: Partial<T>);
  abstract findOne(where: Partial<T>);
  abstract findAll(where?: Partial<T>);
  abstract update(where: Partial<T>, data: Partial<T>);
  abstract delete(where: Partial<T>);
  abstract updateMany(where: Partial<T>, data: Partial<T>);
  abstract getModel(): Model<T>;
}
