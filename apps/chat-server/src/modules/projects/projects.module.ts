import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectRepository } from './repositories/project.repository';
import { ProjectsService } from './services/projects.service';

@Module({
  controllers: [ProjectsController],
  providers: [
    {
      provide: 'IProjectRepository',
      useClass: ProjectRepository,
    },
    {
      provide: 'IProjectService',
      useClass: ProjectsService,
    },
    ProjectsService,
  ],
  exports: ['IProjectService', ProjectsService],
})
export class ProjectsModule {}
