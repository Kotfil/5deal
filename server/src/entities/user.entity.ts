import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';
import { BuyerProfile } from './buyer-profile.entity';
import { SellerProfile } from './seller-profile.entity';
import { Asset } from './asset.entity';
import { Message } from './message.entity';

/** Core platform user — owns a role-specific profile */
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 255 })
  passwordHash: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /* ── Relations ── */

  @OneToOne(() => BuyerProfile, (profile) => profile.user, { nullable: true, cascade: true })
  buyerProfile: BuyerProfile | null;

  @OneToOne(() => SellerProfile, (profile) => profile.user, { nullable: true, cascade: true })
  sellerProfile: SellerProfile | null;

  @OneToMany(() => Asset, (asset) => asset.seller)
  assets: Asset[];

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.recipient)
  receivedMessages: Message[];
}
