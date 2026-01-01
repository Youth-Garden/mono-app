import type { Project } from '@prisma/client';

export interface IProjectRepository {
  create(data: {
    name: string;
    teamId: string;
    allowedDomains?: string[];
  }): Promise<Project>;
  findAll(where?: { teamId?: string; isActive?: boolean }): Promise<Project[]>;
  findById(id: string): Promise<Project | null>;
  findByApiKey(apiKey: string): Promise<Project | null>;
  update(
    id: string,
    data: Partial<
      Pick<Project, 'name' | 'allowedDomains' | 'isActive' | 'settings'>
    >
  ): Promise<Project>;
  delete(id: string): Promise<Project>;
}

export interface IProjectService {
  findById(id: string): Promise<Project>;
  findByApiKey(apiKey: string): Promise<Project>;
}
