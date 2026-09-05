import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async sendMessage(@Body() sendMessageDto: SendMessageDto) {
    return this.messagesService.sendMessage(sendMessageDto);
  }

  @Get('user/:userId')
  async getMessagesForUser(@Param('userId') userId: string) {
    return this.messagesService.getMessagesForUser(userId);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.messagesService.markAsRead(id);
  }
}
