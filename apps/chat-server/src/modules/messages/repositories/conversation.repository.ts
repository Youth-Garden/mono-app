import { Injectable } from '@nestjs/common';
import type { Conversation, Message } from '@prisma/client';
import { PrismaService } from '../../common/services/prisma.service';
import type { IConversationRepository } from '../interfaces/message.repository.interface';

@Injectable()
export class ConversationRepository implements IConversationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    projectId: string;
    visitorId?: string;
    metadata?: object;
  }): Promise<Conversation> {
    return this.prisma.conversation.create({
      data: {
        projectId: data.projectId,
        visitorId: data.visitorId,
        metadata: data.metadata || {},
      },
    });
  }

  async findById(id: string): Promise<Conversation | null> {
    return this.prisma.conversation.findUnique({
      where: { id },
    });
  }

  async findByIdWithMessages(
    id: string
  ): Promise<(Conversation & { messages: Message[] }) | null> {
    return this.prisma.conversation.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }

  async findByProjectId(projectId: string): Promise<Conversation[]> {
    return this.prisma.conversation.findMany({
      where: { projectId },
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { messages: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOpenByVisitor(
    projectId: string,
    visitorId: string
  ): Promise<Conversation | null> {
    return this.prisma.conversation.findFirst({
      where: {
        projectId,
        visitorId,
        status: 'Open',
      },
    });
  }

  async updateStatus(id: string, status: string): Promise<Conversation> {
    return this.prisma.conversation.update({
      where: { id },
      data: { status: status as 'Open' | 'Closed' | 'Pending' },
    });
  }
}
