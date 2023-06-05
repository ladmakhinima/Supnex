import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Material } from './material.entity';
import { CategoryService } from '../category/category.service';
import { MaterialRepository } from './material.repository';
import { EditMaterialStockDTO } from './dtos/edit-material-stock.dto';
import {
  CreateMaterialDTO,
  CreateMaterialSupplierDTO,
} from './dtos/create-material.dto';

@Injectable()
export class MaterialService {
  @Inject(CategoryService)
  private readonly categoryService: CategoryService;

  @Inject(MaterialRepository)
  private readonly materialRepository: MaterialRepository;

  async createMaterial(dto: CreateMaterialDTO) {
    const duplicateMaterialByName = await this.findOneMaterial({
      name: dto.name,
    });
    if (duplicateMaterialByName) {
      throw new ConflictException('material duplicated by name');
    }

    const category = await this.categoryService.find(
      {
        name: dto.category,
      },
      true,
    );

    return this.materialRepository.create({
      name: dto.name,
      category: category.name,
      stock: dto.stock,
      suppliers: dto.suppliers,
      unitOfMeasurement: dto.unitOfMeasurement,
    });
  }

  async editMaterialStock(_id: string, dto: EditMaterialStockDTO) {
    const material = await this.findOneMaterial({ _id }, true);
    material.stock += dto.stock;
    await this.materialRepository.update(
      { _id: material._id },
      {
        stock: material.stock,
      },
    );
    return material;
  }

  async findOneMaterial(where: Partial<Material>, throwNotFoundErr = false) {
    const material = await this.materialRepository.findOne(where);
    if (throwNotFoundErr && !material) {
      throw new NotFoundException('material not found');
    }
    return material;
  }

  async addOrUpdateSupplierMaterial(
    _id: string,
    dto: CreateMaterialSupplierDTO,
  ) {
    const material = await this.findOneMaterial({ _id }, true);
    const materialSupplierIndex = material.suppliers.findIndex(
      (element) => element.fullName === dto.fullName,
    );
    if (materialSupplierIndex > -1) {
      material.suppliers[materialSupplierIndex].basePrice = dto.basePrice;
    } else {
      material.suppliers.push(dto);
    }
    await this.materialRepository.update(
      { _id: material._id },
      { suppliers: material.suppliers },
    );
    return material;
  }

  findAllMaterials(where?: Partial<Material>) {
    return this.materialRepository.findAll(where || {});
  }

  async updateAllCategoriesOfMaterial(
    oldCategory: string,
    newCategory: string,
  ) {
    const materials = await this.materialRepository.findAll({
      category: oldCategory,
    });
    if (materials.length === 0) {
      throw new BadRequestException(
        'not found any materials with these categories ...',
      );
    }
    return this.materialRepository.updateMany(
      {
        _id: materials.map((e) => e._id) as any,
      },
      { category: newCategory },
    );
  }
}
