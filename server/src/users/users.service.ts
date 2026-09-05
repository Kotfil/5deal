import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { BuyerProfile } from '../entities/buyer-profile.entity';
import { SellerProfile } from '../entities/seller-profile.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserRole } from '../enums/user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(BuyerProfile)
    private readonly buyerProfileRepository: Repository<BuyerProfile>,
    @InjectRepository(SellerProfile)
    private readonly sellerProfileRepository: Repository<SellerProfile>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = this.userRepository.create({
      email: createUserDto.email,
      passwordHash: createUserDto.password, // In a real app, hash the password
      role: createUserDto.role,
    });

    await this.userRepository.save(user);

    if (user.role === UserRole.BUYER) {
      const profile = this.buyerProfileRepository.create({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        user,
      });
      await this.buyerProfileRepository.save(profile);
    } else if (user.role === UserRole.SELLER) {
      const profile = this.sellerProfileRepository.create({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        user,
      });
      await this.sellerProfileRepository.save(profile);
    }

    return this.userRepository.findOne({
      where: { id: user.id },
      relations: ['buyerProfile', 'sellerProfile'],
    });
  }

  async getProfile(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['buyerProfile', 'sellerProfile'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<User> {
    const user = await this.getProfile(id);

    if (user.role === UserRole.BUYER && user.buyerProfile) {
      Object.assign(user.buyerProfile, updateProfileDto);
      await this.buyerProfileRepository.save(user.buyerProfile);
    } else if (user.role === UserRole.SELLER && user.sellerProfile) {
      Object.assign(user.sellerProfile, updateProfileDto);
      await this.sellerProfileRepository.save(user.sellerProfile);
    }

    return this.getProfile(id);
  }
}
