import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AssetsModule } from './assets/assets.module';
import { MessagesModule } from './messages/messages.module';
import { User } from './entities/user.entity';
import { BuyerProfile } from './entities/buyer-profile.entity';
import { SellerProfile } from './entities/seller-profile.entity';
import { Asset } from './entities/asset.entity';
import { AssetImage } from './entities/asset-image.entity';
import { Message } from './entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'n5deal',
      entities: [User, BuyerProfile, SellerProfile, Asset, AssetImage, Message],
      synchronize: true, // Use only in development/prototype
    }),
    UsersModule,
    AssetsModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
