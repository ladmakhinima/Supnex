import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UPDATE_CATEGORY_EVENT } from '../constants';
import { MaterialService } from './material.service';
import { OnCategoryUpdateType } from './types/on-category-update.type';
import { ReceiveEventPayload } from '../common/event/types';

@Injectable()
export class MaterialEvent {
  @Inject(MaterialService)
  private readonly materialService: MaterialService;

  @OnEvent(UPDATE_CATEGORY_EVENT)
  async onUpdateCategory(data: ReceiveEventPayload<OnCategoryUpdateType>) {
    await this.materialService.updateAllCategoriesOfMaterial(
      data.payload.oldCategory,
      data.payload.newCategory,
    );
  }
}
