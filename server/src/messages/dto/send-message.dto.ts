import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  body: string;

  @IsUUID()
  @IsNotEmpty()
  senderId: string;

  @IsUUID()
  @IsNotEmpty()
  recipientId: string;

  @IsUUID()
  @IsOptional()
  assetId?: string;
}
