import { Injectable } from '@nestjs/common';
import type { Message } from '@prisma/client';
import { PrismaService } from '../../common/services/prisma.service';
import type { IMessageRepository } from '../interfaces/message.repository.interface';

@Injectable()
export class MessageRepository implements IMessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    conversationId: string;
    content: string;
    sender: string;
    agentId?: string;
  }): Promise<Message> {
    return this.prisma.message.create({
      data: {
        conversationId: data.conversationId,
        content: data.content,
        sender: data.sender as 'user' | 'agent' | 'system',
        agentId: data.agentId,
      },
    });
  }

  async findById(id: string): Promise<Message | null> {
    return this.prisma.message.findUnique({
      where: { id },
    });
  }

  async findByConversationId(conversationId: string): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
    });
  }
}
