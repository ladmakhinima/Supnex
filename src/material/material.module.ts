import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialDefine } from '../app-config/model-definition';
import { CategoryModule } from '../category/category.module';
import { MaterialService } from './material.service';
import { MaterialRepository } from './material.repository';
import { MaterialController } from './material.controller';
import { MaterialEvent } from './material.event';

@Module({
  imports: [MongooseModule.forFeature([MaterialDefine]), CategoryModule],
  providers: [MaterialService, MaterialRepository, MaterialEvent],
  controllers: [MaterialController],
})
export class MaterialModule {}
