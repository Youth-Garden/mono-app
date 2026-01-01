import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app';
import { CommonModule } from './modules/common/common.module';
import { MessagesModule } from './modules/messages/messages.module';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig],
      cache: true,
    }),
    CommonModule,
    ProjectsModule,
    MessagesModule,
  ],
})
export class AppModule {}
