import { Injectable } from '@nestjs/common';
import type { Project } from '@prisma/client';
import { PrismaService } from '../../common/services/prisma.service';
import type { IProjectRepository } from '../interfaces/project.repository.interface';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    teamId: string;
    allowedDomains?: string[];
  }): Promise<Project> {
    return this.prisma.project.create({
      data: {
        name: data.name,
        teamId: data.teamId,
        allowedDomains: data.allowedDomains || [],
      },
    });
  }

  async findAll(where?: {
    teamId?: string;
    isActive?: boolean;
  }): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: {
        ...(where?.teamId && { teamId: where.teamId }),
        ...(where?.isActive !== undefined && { isActive: where.isActive }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: { id },
    });
  }

  async findByApiKey(apiKey: string): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: { apiKey },
    });
  }

  async update(
    id: string,
    data: Partial<
      Pick<Project, 'name' | 'allowedDomains' | 'isActive' | 'settings'>
    >
  ): Promise<Project> {
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Project> {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}
