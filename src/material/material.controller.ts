import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { IsMongoIDPipe } from '../common/pipes';
import { ApiTags } from '@nestjs/swagger';
import { EditMaterialStockDTO } from './dtos/edit-material-stock.dto';
import {
  CreateMaterialDTO,
  CreateMaterialSupplierDTO,
} from './dtos/create-material.dto';
import { CreateMaterialDoc } from './docs/create-material.doc';
import { GetMaterialsDoc } from './docs/get-materials.doc';
import { GetMaterialByIdDoc } from './docs/get-material-by-id.doc';
import { AddOrEditMaterialSupplierDoc } from './docs/add-or-edit-supplier.doc';
import { UpdateMaterialStockDoc } from './docs/update-material-stock.doc';

@ApiTags('Material Endpoint')
@Controller('material')
export class MaterialController {
  @Inject()
  private readonly materialService: MaterialService;

  @Post()
  @CreateMaterialDoc()
  createMaterial(@Body() body: CreateMaterialDTO) {
    return this.materialService.createMaterial(body);
  }

  @Get()
  @GetMaterialsDoc()
  getMaterials() {
    return this.materialService.findAllMaterials();
  }

  @Get(':id')
  @GetMaterialByIdDoc()
  getMaterialById(@Param('id', IsMongoIDPipe) _id: string) {
    return this.materialService.findOneMaterial({ _id }, true);
  }

  @Patch('supplier/:id')
  @AddOrEditMaterialSupplierDoc()
  addOrUpdateSupplierMaterial(
    @Param('id', IsMongoIDPipe) id: string,
    @Body() body: CreateMaterialSupplierDTO,
  ) {
    return this.materialService.addOrUpdateSupplierMaterial(id, body);
  }

  @Patch(':id')
  @UpdateMaterialStockDoc()
  updateMaterialsStock(
    @Param('id', IsMongoIDPipe) _id: string,
    @Body() body: EditMaterialStockDTO,
  ) {
    return this.materialService.editMaterialStock(_id, body);
  }
}
