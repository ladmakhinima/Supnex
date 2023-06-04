import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialDefine } from '../app-config/model-definition';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [MongooseModule.forFeature([MaterialDefine]), CategoryModule],
})
export class MaterialModule {}
