import type { Conversation, Message } from '@prisma/client';

export interface IMessageRepository {
  create(data: {
    conversationId: string;
    content: string;
    sender: string;
    agentId?: string;
  }): Promise<Message>;

  findById(id: string): Promise<Message | null>;

  findByConversationId(conversationId: string): Promise<Message[]>;
}

export interface IConversationRepository {
  create(data: {
    projectId: string;
    visitorId?: string;
    metadata?: object;
  }): Promise<Conversation>;

  findById(id: string): Promise<Conversation | null>;

  findByIdWithMessages(
    id: string
  ): Promise<(Conversation & { messages: Message[] }) | null>;

  findByProjectId(projectId: string): Promise<Conversation[]>;

  findOpenByVisitor(
    projectId: string,
    visitorId: string
  ): Promise<Conversation | null>;

  updateStatus(id: string, status: string): Promise<Conversation>;
}
