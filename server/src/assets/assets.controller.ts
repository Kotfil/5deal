import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  async createAsset(@Body() createAssetDto: CreateAssetDto) {
    return this.assetsService.createAsset(createAssetDto);
  }

  @Get()
  async getAllAssets() {
    return this.assetsService.getAllAssets();
  }

  @Get(':id')
  async getAssetById(@Param('id') id: string) {
    return this.assetsService.getAssetById(id);
  }

  @Patch(':id')
  async updateAsset(
    @Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
  ) {
    return this.assetsService.updateAsset(id, updateAssetDto);
  }

  @Delete(':id')
  async deleteAsset(@Param('id') id: string) {
    return this.assetsService.deleteAsset(id);
  }
}
