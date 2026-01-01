import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IProjectService } from '../../projects/interfaces/project.repository.interface';
import { SendMessageDto } from '../dtos/send-message.dto';
import type {
  IConversationRepository,
  IMessageRepository,
} from '../interfaces/message.repository.interface';

@Injectable()
export class MessagesService {
  constructor(
    @Inject('IMessageRepository')
    private readonly messageRepo: IMessageRepository,
    @Inject('IConversationRepository')
    private readonly conversationRepo: IConversationRepository,
    @Inject('IProjectService')
    private readonly projectService: IProjectService
  ) {}

  /**
   * Send a message from the widget
   * This is the main endpoint the widget will call
   */
  async sendMessage(projectId: string, dto: SendMessageDto) {
    // Validate project exists
    await this.projectService.findById(projectId);

    // Find or create conversation
    let conversation = await this.conversationRepo.findOpenByVisitor(
      projectId,
      dto.visitorId
    );

    if (!conversation) {
      conversation = await this.conversationRepo.create({
        projectId,
        visitorId: dto.visitorId,
        metadata: dto.metadata,
      });
    }

    // Create the user message
    const message = await this.messageRepo.create({
      conversationId: conversation.id,
      content: dto.content,
      sender: 'user',
    });

    // TODO: Here you would trigger bot response or notify agents
    // For now, we return a mock bot response
    const botResponse = await this.messageRepo.create({
      conversationId: conversation.id,
      content: 'Thank you for your message. An agent will respond shortly.',
      sender: 'agent',
    });

    return {
      conversation: {
        id: conversation.id,
        status: conversation.status,
      },
      userMessage: message,
      botResponse: botResponse,
    };
  }

  /**
   * Get conversation history
   */
  async getConversation(conversationId: string) {
    const conversation =
      await this.conversationRepo.findByIdWithMessages(conversationId);

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    return conversation;
  }

  /**
   * Get all conversations for a project
   */
  async getProjectConversations(projectId: string) {
    return this.conversationRepo.findByProjectId(projectId);
  }
}
