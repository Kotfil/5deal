import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Asset } from './asset.entity';

/** Images attached to an Asset listing */
@Entity('asset_images')
export class AssetImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 512 })
  url: string;

  /** Display order index */
  @Column({ type: 'smallint', default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  /* ── Relations ── */

  @ManyToOne(() => Asset, (asset) => asset.images, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  asset: Asset;
}
