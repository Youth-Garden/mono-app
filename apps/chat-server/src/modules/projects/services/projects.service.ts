import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from '../dtos/create-project.dto';
import type { IProjectRepository } from '../interfaces/project.repository.interface';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository
  ) {}

  async create(dto: CreateProjectDto & { teamId: string }) {
    return this.projectRepo.create({
      name: dto.name,
      teamId: dto.teamId,
      allowedDomains: dto.allowedDomains,
    });
  }

  async findAll(teamId?: string) {
    return this.projectRepo.findAll({
      teamId,
      isActive: true,
    });
  }

  async findByApiKey(apiKey: string) {
    const project = await this.projectRepo.findByApiKey(apiKey);

    if (!project || !project.isActive) {
      throw new NotFoundException('Project not found or inactive');
    }

    return project;
  }

  async findById(id: string) {
    const project = await this.projectRepo.findById(id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(id: string, dto: Partial<CreateProjectDto>) {
    await this.findById(id); // Ensure exists
    return this.projectRepo.update(id, dto);
  }

  async delete(id: string) {
    await this.findById(id); // Ensure exists
    return this.projectRepo.delete(id);
  }
}
