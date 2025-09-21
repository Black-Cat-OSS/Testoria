import { Controller, Get, Post, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { IProjectService } from '../interfaces/project.service.interface';
import { CreateProjectDto, ProjectDto } from '../dto/project.dto';

/**
 * Контроллер для управления проектами
 */
@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: IProjectService) {}

  /**
   * Создает новый проект
   * @param createProjectDto Данные для создания проекта
   * @returns Созданный проект
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Создание проекта',
    description: 'Создает новый проект в системе'
  })
  @ApiBody({ type: CreateProjectDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Проект успешно создан',
    type: ProjectDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Некорректные данные запроса'
  })
  async createProject(@Body() createProjectDto: CreateProjectDto): Promise<ProjectDto> {
    return this.projectService.createProject(createProjectDto);
  }

  /**
   * Получает проект по идентификатору
   * @param id Идентификатор проекта
   * @returns Проект
   */
  @Get(':id')
  @ApiOperation({ 
    summary: 'Получение проекта по ID',
    description: 'Возвращает проект по его уникальному идентификатору'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Уникальный идентификатор проекта',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Проект найден',
    type: ProjectDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Проект не найден'
  })
  async getProject(@Param('id') id: string): Promise<ProjectDto | null> {
    return this.projectService.getProjectById(id);
  }

  /**
   * Получает все проекты
   * @returns Список всех проектов
   */
  @Get()
  @ApiOperation({ 
    summary: 'Получение всех проектов',
    description: 'Возвращает список всех проектов в системе'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Список проектов получен успешно',
    type: [ProjectDto]
  })
  async getAllProjects(): Promise<ProjectDto[]> {
    return this.projectService.getAllProjects();
  }
}
