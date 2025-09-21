import { CreateProjectDto, ProjectDto } from '../dto/project.dto';

/**
 * Интерфейс для сервиса управления проектами
 */
export interface IProjectService {
  /**
   * Создает новый проект
   * @param createProjectDto Данные для создания проекта
   * @returns Созданный проект
   */
  createProject(createProjectDto: CreateProjectDto): Promise<ProjectDto>;

  /**
   * Получает проект по идентификатору
   * @param id Идентификатор проекта
   * @returns Проект или null, если не найден
   */
  getProjectById(id: string): Promise<ProjectDto | null>;

  /**
   * Получает все проекты
   * @returns Список всех проектов
   */
  getAllProjects(): Promise<ProjectDto[]>;
}
