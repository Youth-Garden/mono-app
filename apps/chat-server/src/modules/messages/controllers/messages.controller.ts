import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendMessageDto } from '../dtos/send-message.dto';
import { MessagesService } from '../services/messages.service';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  /**
   * Widget endpoint: Send a message
   * POST /api/v1/messages
   * Header: x-project-id: <project-uuid>
   */
  @Post()
  @ApiOperation({ summary: 'Send a message from the widget' })
  @ApiHeader({
    name: 'x-project-id',
    description: 'Project ID',
    required: true,
  })
  sendMessage(
    @Headers('x-project-id') projectId: string,
    @Body() dto: SendMessageDto
  ) {
    return this.messagesService.sendMessage(projectId, dto);
  }

  /**
   * Get conversation history
   * GET /api/v1/messages/conversations/:id
   */
  @Get('conversations/:id')
  @ApiOperation({ summary: 'Get conversation history' })
  getConversation(@Param('id') id: string) {
    return this.messagesService.getConversation(id);
  }

  /**
   * Get all conversations for a project (admin)
   * GET /api/v1/messages/projects/:projectId/conversations
   */
  @Get('projects/:projectId/conversations')
  @ApiOperation({ summary: 'Get all conversations for a project' })
  getProjectConversations(@Param('projectId') projectId: string) {
    return this.messagesService.getProjectConversations(projectId);
  }
}
