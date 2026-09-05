import { IsString, IsEnum, IsNumber, IsOptional, IsArray } from 'class-validator';
import { AssetCategory } from '../../enums/asset-category.enum';
import { AssetStatus } from '../../enums/asset-status.enum';

export class UpdateAssetDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(AssetCategory)
  @IsOptional()
  category?: AssetCategory;

  @IsEnum(AssetStatus)
  @IsOptional()
  status?: AssetStatus;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsNumber()
  @IsOptional()
  annualRevenue?: number;

  @IsNumber()
  @IsOptional()
  ebitda?: number;

  @IsNumber()
  @IsOptional()
  yearFounded?: number;

  @IsNumber()
  @IsOptional()
  employees?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
