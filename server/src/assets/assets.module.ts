import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { Asset } from '../entities/asset.entity';
import { AssetImage } from '../entities/asset-image.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, AssetImage]), UsersModule],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
