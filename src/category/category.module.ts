import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { CategoryModelDefine } from '../app-config/model-definition';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { EventModule } from '../common/event/event.module';

@Module({
  imports: [MongooseModule.forFeature([CategoryModelDefine]), EventModule],
  providers: [
    CategoryService,
    CategoryRepository,
    { provide: 'DYNAMICModel', useValue: getModelToken(Category.name) },
  ],
  controllers: [CategoryController],
  exports: [CategoryService]
})
export class CategoryModule {}
