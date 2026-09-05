import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { SendMessageDto } from './dto/send-message.dto';
import { UsersService } from '../users/users.service';
import { MessageStatus } from '../../src/enums/message-status.enum';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly usersService: UsersService,
  ) {}

  async sendMessage(sendMessageDto: SendMessageDto): Promise<Message> {
    const sender = await this.usersService.getProfile(sendMessageDto.senderId);
    const recipient = await this.usersService.getProfile(sendMessageDto.recipientId);

    const message = this.messageRepository.create({
      body: sendMessageDto.body,
      assetId: sendMessageDto.assetId,
      sender,
      recipient,
    });

    return this.messageRepository.save(message);
  }

  async getMessagesForUser(userId: string): Promise<Message[]> {
    return this.messageRepository.find({
      where: [
        { sender: { id: userId } },
        { recipient: { id: userId } },
      ],
      relations: ['sender', 'recipient'],
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: string): Promise<Message> {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException('Message not found');
    }

    message.status = MessageStatus.READ;
    return this.messageRepository.save(message);
  }
}
