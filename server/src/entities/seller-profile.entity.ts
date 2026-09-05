import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

/** Public profile of a Seller on the marketplace */
@Entity('seller_profiles')
export class SellerProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 255, nullable: true })
  company: string | null;

  @Column({ length: 255, nullable: true })
  position: string | null;

  @Column({ type: 'text', nullable: true })
  bio: string | null;

  @Column({ length: 20, nullable: true })
  phone: string | null;

  @Column({ length: 255, nullable: true })
  avatarUrl: string | null;

  @Column({ length: 100, nullable: true })
  country: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /* ── Relations ── */

  @OneToOne(() => User, (user) => user.sellerProfile)
  @JoinColumn()
  user: User;
}
