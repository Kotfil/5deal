import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AssetStatus } from '../enums/asset-status.enum';
import { AssetCategory } from '../enums/asset-category.enum';
import { User } from './user.entity';
import { AssetImage } from './asset-image.entity';

/** An M&A asset listed by a Seller */
@Entity('assets')
export class Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: AssetCategory })
  category: AssetCategory;

  @Column({ type: 'enum', enum: AssetStatus, default: AssetStatus.DRAFT })
  status: AssetStatus;

  /** Asking price in USD */
  @Column({ type: 'numeric', precision: 18, scale: 2, nullable: true })
  price: number | null;

  @Column({ length: 100, nullable: true })
  country: string | null;

  @Column({ length: 100, nullable: true })
  industry: string | null;

  /** Annual revenue (USD) — for quick screening */
  @Column({ type: 'numeric', precision: 18, scale: 2, nullable: true })
  annualRevenue: number | null;

  /** EBITDA (USD) */
  @Column({ type: 'numeric', precision: 18, scale: 2, nullable: true })
  ebitda: number | null;

  /** Year business was founded */
  @Column({ type: 'smallint', nullable: true })
  yearFounded: number | null;

  /** Number of employees */
  @Column({ type: 'int', nullable: true })
  employees: number | null;

  /** Tags for smart filtering / AI suggestions */
  @Column({ type: 'text', array: true, default: '{}' })
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /* ── Relations ── */

  @ManyToOne(() => User, (user) => user.assets, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  seller: User;

  @OneToMany(() => AssetImage, (image) => image.asset, { cascade: true })
  images: AssetImage[];
}
