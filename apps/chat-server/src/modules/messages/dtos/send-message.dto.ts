import { IsObject, IsOptional, IsString } from 'class-validator';

export class SendMessageDto {
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  visitorId?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
