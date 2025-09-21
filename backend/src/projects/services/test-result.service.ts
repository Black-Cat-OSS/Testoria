import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IProjectService } from '../interfaces/project.service.interface';
import { CreateTestResultDto, TestResultDto, JestTestResultsDto } from '../dto/test-result.dto';
import { ProjectNotFoundException } from '../exceptions/project-not-found.exception';

/**
 * Сервис для управления результатами тестов
 */
@Injectable()
export class TestResultService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly projectService: IProjectService,
  ) {}

  /**
   * Создает результат теста
   * @param createTestResultDto Данные для создания результата теста
   * @returns Созданный результат теста
   * @throws ProjectNotFoundException Если проект не найден
   */
  async createTestResult(createTestResultDto: CreateTestResultDto): Promise<TestResultDto> {
    // Проверяем существование проекта
    const project = await this.projectService.getProjectById(createTestResultDto.projectId);
    if (!project) {
      throw new ProjectNotFoundException(createTestResultDto.projectId);
    }

    const testResult = await this.prisma.testResult.create({
      data: {
        projectId: createTestResultDto.projectId,
        testName: createTestResultDto.testName,
        status: createTestResultDto.status,
        duration: createTestResultDto.duration,
        errorMessage: createTestResultDto.errorMessage,
        stackTrace: createTestResultDto.stackTrace,
        rawData: createTestResultDto.rawData,
      },
    });

    return {
      id: testResult.id,
      projectId: testResult.projectId,
      testName: testResult.testName,
      status: testResult.status,
      duration: testResult.duration,
      errorMessage: testResult.errorMessage,
      stackTrace: testResult.stackTrace,
      rawData: testResult.rawData,
      createdAt: testResult.createdAt,
    };
  }

  /**
   * Создает результаты тестов из Jest JSON
   * @param projectId Идентификатор проекта
   * @param jestData JSON данные от Jest
   * @returns Массив созданных результатов тестов
   * @throws ProjectNotFoundException Если проект не найден
   */
  async createTestResultsFromJest(projectId: string, jestData: any): Promise<TestResultDto[]> {
    // Проверяем существование проекта
    const project = await this.projectService.getProjectById(projectId);
    if (!project) {
      throw new ProjectNotFoundException(projectId);
    }

    const results: TestResultDto[] = [];

    // Парсим Jest JSON
    if (jestData.testResults && Array.isArray(jestData.testResults)) {
      for (const testResult of jestData.testResults) {
        if (testResult.assertionResults && Array.isArray(testResult.assertionResults)) {
          for (const assertion of testResult.assertionResults) {
            const createDto: CreateTestResultDto = {
              projectId,
              testName: assertion.title || 'Unknown Test',
              status: this.getStatusFromJest(assertion),
              duration: assertion.duration,
              errorMessage: this.getErrorMessageFromJest(assertion),
              stackTrace: this.getStackTraceFromJest(assertion),
              rawData: assertion,
            };

            const result = await this.createTestResult(createDto);
            results.push(result);
          }
        }
      }
    }

    return results;
  }

  /**
   * Получает результаты тестов для проекта
   * @param projectId Идентификатор проекта
   * @returns Массив результатов тестов
   */
  async getTestResultsByProject(projectId: string): Promise<TestResultDto[]> {
    const testResults = await this.prisma.testResult.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });

    return testResults.map(testResult => ({
      id: testResult.id,
      projectId: testResult.projectId,
      testName: testResult.testName,
      status: testResult.status,
      duration: testResult.duration,
      errorMessage: testResult.errorMessage,
      stackTrace: testResult.stackTrace,
      rawData: testResult.rawData,
      createdAt: testResult.createdAt,
    }));
  }

  /**
   * Получает результат теста по идентификатору
   * @param id Идентификатор результата теста
   * @returns Результат теста или null, если не найден
   */
  async getTestResultById(id: string): Promise<TestResultDto | null> {
    const testResult = await this.prisma.testResult.findUnique({
      where: { id },
    });

    if (!testResult) {
      return null;
    }

    return {
      id: testResult.id,
      projectId: testResult.projectId,
      testName: testResult.testName,
      status: testResult.status,
      duration: testResult.duration,
      errorMessage: testResult.errorMessage,
      stackTrace: testResult.stackTrace,
      rawData: testResult.rawData,
      createdAt: testResult.createdAt,
    };
  }

  /**
   * Преобразует статус Jest в внутренний формат
   * @param assertion Результат теста от Jest
   * @returns Статус теста
   */
  private getStatusFromJest(assertion: any): string {
    switch (assertion.status) {
      case 'passed':
        return 'passed';
      case 'failed':
        return 'failed';
      case 'pending':
      case 'todo':
        return 'skipped';
      default:
        return 'unknown';
    }
  }

  /**
   * Извлекает сообщение об ошибке из результата Jest
   * @param assertion Результат теста от Jest
   * @returns Сообщение об ошибке или null
   */
  private getErrorMessageFromJest(assertion: any): string | null {
    if (assertion.failureMessages && Array.isArray(assertion.failureMessages) && assertion.failureMessages.length > 0) {
      return assertion.failureMessages[0];
    }
    return null;
  }

  /**
   * Извлекает стек вызовов из результата Jest
   * @param assertion Результат теста от Jest
   * @returns Стек вызовов или null
   */
  private getStackTraceFromJest(assertion: any): string | null {
    if (assertion.failureMessages && Array.isArray(assertion.failureMessages) && assertion.failureMessages.length > 1) {
      return assertion.failureMessages.slice(1).join('\n');
    }
    return null;
  }
}
