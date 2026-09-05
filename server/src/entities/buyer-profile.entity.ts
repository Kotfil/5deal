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

/** Investment/acquisition interests of a Buyer */
@Entity('buyer_profiles')
export class BuyerProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  company: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  position: string | null;

  @Column({ type: 'text', nullable: true })
  bio: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatarUrl: string | null;

  /** Investment budget range — min (USD) */
  @Column({ type: 'numeric', precision: 18, scale: 2, nullable: true })
  budgetMin: number | null;

  /** Investment budget range — max (USD) */
  @Column({ type: 'numeric', precision: 18, scale: 2, nullable: true })
  budgetMax: number | null;

  /** Free-text description of acquisition interests */
  @Column({ type: 'text', nullable: true })
  interests: string | null;

  /** Preferred asset categories — stored as a simple text array */
  @Column({ type: 'text', array: true, default: '{}' })
  preferredCategories: string[];

  /** Countries of interest */
  @Column({ type: 'text', array: true, default: '{}' })
  preferredCountries: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /* ── Relations ── */

  @OneToOne(() => User, (user) => user.buyerProfile)
  @JoinColumn()
  user: User;
}
