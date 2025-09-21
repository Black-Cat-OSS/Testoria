import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IProjectService } from '../interfaces/project.service.interface';
import { CreateProjectDto, ProjectDto } from '../dto/project.dto';

/**
 * Сервис для управления проектами
 */
@Injectable()
export class ProjectService implements IProjectService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Создает новый проект
   * @param createProjectDto Данные для создания проекта
   * @returns Созданный проект
   */
  async createProject(createProjectDto: CreateProjectDto): Promise<ProjectDto> {
    const project = await this.prisma.project.create({
      data: {
        name: createProjectDto.name,
      },
    });

    return {
      id: project.id,
      name: project.name,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  /**
   * Получает проект по идентификатору
   * @param id Идентификатор проекта
   * @returns Проект или null, если не найден
   */
  async getProjectById(id: string): Promise<ProjectDto | null> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return null;
    }

    return {
      id: project.id,
      name: project.name,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  /**
   * Получает все проекты
   * @returns Список всех проектов
   */
  async getAllProjects(): Promise<ProjectDto[]> {
    const projects = await this.prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return projects.map(project => ({
      id: project.id,
      name: project.name,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }));
  }
}
