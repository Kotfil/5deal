import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { MessageStatus } from '../enums/message-status.enum';

/** Direct message between a Buyer and a Seller (contact flow) */
@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'enum', enum: MessageStatus, default: MessageStatus.SENT })
  status: MessageStatus;

  /** Optional reference to the asset that prompted this message */
  @Column({ type: 'uuid', nullable: true })
  assetId: string | null;

  @CreateDateColumn()
  createdAt: Date;

  /* ── Relations ── */

  @ManyToOne(() => User, (user) => user.sentMessages, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedMessages, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipientId' })
  recipient: User;
}
