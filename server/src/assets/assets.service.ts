import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from '../entities/asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    private readonly usersService: UsersService,
  ) {}

  async createAsset(createAssetDto: CreateAssetDto): Promise<Asset> {
    const seller = await this.usersService.getProfile(createAssetDto.sellerId);

    const asset = this.assetRepository.create({
      ...createAssetDto,
      seller,
    });

    return this.assetRepository.save(asset);
  }

  async getAllAssets(): Promise<Asset[]> {
    return this.assetRepository.find({
      relations: ['images', 'seller', 'seller.sellerProfile'],
    });
  }

  async getAssetById(id: string): Promise<Asset> {
    const asset = await this.assetRepository.findOne({
      where: { id },
      relations: ['images', 'seller', 'seller.sellerProfile'],
    });

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    return asset;
  }

  async updateAsset(id: string, updateAssetDto: UpdateAssetDto): Promise<Asset> {
    const asset = await this.getAssetById(id);

    Object.assign(asset, updateAssetDto);
    return this.assetRepository.save(asset);
  }

  async deleteAsset(id: string): Promise<void> {
    const result = await this.assetRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Asset not found');
    }
  }
}
