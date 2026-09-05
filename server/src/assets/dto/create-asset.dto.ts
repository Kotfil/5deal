import { IsString, IsNotEmpty, IsEnum, IsNumber, IsOptional, IsArray, IsUUID } from 'class-validator';
import { AssetCategory } from '../../enums/asset-category.enum';

export class CreateAssetDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(AssetCategory)
  @IsNotEmpty()
  category: AssetCategory;

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

  @IsUUID()
  @IsNotEmpty()
  sellerId: string; // Temporary: passed from client since there's no JWT Auth yet
}
