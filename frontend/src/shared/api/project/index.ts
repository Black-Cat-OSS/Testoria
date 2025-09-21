import { ProjectInfo } from '@entities';
import { IApiClient } from '../../interfaces';
import mockData from './mock-data.json';

/**
 * API клиент для работы с проектами
 */
export class ProjectAPI implements IApiClient<ProjectInfo> {
  /**
   * Получает все проекты
   * @returns Promise с массивом всех проектов
   */
  async getAll(): Promise<ProjectInfo[]> {
    // Имитация задержки API
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return mockData as ProjectInfo[];
  }

  /**
   * Получает проект по ID
   * @param id - Уникальный идентификатор проекта
   * @returns Promise с проектом или null, если проект не найден
   */
  async getById(id: string): Promise<ProjectInfo | null> {
    // Имитация задержки API
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const project = mockData.find(item => item.id === id);
    return project ? (project as ProjectInfo) : null;
  }
}

// Экспорт экземпляра класса
export const projectAPI = new ProjectAPI();
