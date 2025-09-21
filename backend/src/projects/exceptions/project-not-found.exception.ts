import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Исключение, возникающее когда проект не найден
 */
export class ProjectNotFoundException extends HttpException {
  constructor(projectId: string) {
    super(`Проект с идентификатором ${projectId} не найден`, HttpStatus.NOT_FOUND);
  }
}
