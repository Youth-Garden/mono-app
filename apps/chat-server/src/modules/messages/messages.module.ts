import { Module } from '@nestjs/common';
import { ProjectsModule } from '../projects/projects.module';
import { MessagesController } from './controllers/messages.controller';
import { ConversationRepository } from './repositories/conversation.repository';
import { MessageRepository } from './repositories/message.repository';
import { MessagesService } from './services/messages.service';

@Module({
  imports: [ProjectsModule],
  controllers: [MessagesController],
  providers: [
    {
      provide: 'IMessageRepository',
      useClass: MessageRepository,
    },
    {
      provide: 'IConversationRepository',
      useClass: ConversationRepository,
    },
    MessagesService,
  ],
  exports: [MessagesService],
})
export class MessagesModule {}
