import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  HttpStatus, 
  HttpCode,
  NotFoundException,
  BadRequestException 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { TestResultService } from '../services/test-result.service';
import { CreateTestResultDto, TestResultDto, JestTestResultsDto } from '../dto/test-result.dto';
import { ProjectNotFoundException } from '../exceptions/project-not-found.exception';

/**
 * Контроллер для управления результатами тестов
 */
@ApiTags('test-results')
@Controller('test-results')
export class TestResultController {
  constructor(private readonly testResultService: TestResultService) {}

  /**
   * Создает результат теста
   * @param createTestResultDto Данные для создания результата теста
   * @returns Созданный результат теста
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Создание результата теста',
    description: 'Создает новый результат теста в системе'
  })
  @ApiBody({ type: CreateTestResultDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Результат теста успешно создан',
    type: TestResultDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Некорректные данные запроса'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Проект не найден'
  })
  async createTestResult(@Body() createTestResultDto: CreateTestResultDto): Promise<TestResultDto> {
    try {
      return await this.testResultService.createTestResult(createTestResultDto);
    } catch (error) {
      if (error instanceof ProjectNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  /**
   * Отправляет результаты тестов Jest в формате JSON
   * @param projectId Идентификатор проекта
   * @param jestData JSON данные от Jest
   * @returns Массив созданных результатов тестов
   */
  @Post('jest/:projectId')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Отправка результатов Jest',
    description: 'Отправляет результаты тестов Jest в формате JSON и создает записи в базе данных'
  })
  @ApiParam({ 
    name: 'projectId', 
    description: 'Идентификатор проекта',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiBody({ 
    description: 'JSON данные от Jest',
    schema: {
      type: 'object',
      properties: {
        testResults: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              assertionResults: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: { type: 'string', example: 'should pass test' },
                    status: { type: 'string', enum: ['passed', 'failed', 'skipped'] },
                    duration: { type: 'number', example: 100 },
                    failureMessages: { type: 'array', items: { type: 'string' } }
                  }
                }
              }
            }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Результаты тестов успешно созданы',
    type: [TestResultDto]
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Некорректные данные запроса'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Проект не найден'
  })
  async createTestResultsFromJest(
    @Param('projectId') projectId: string,
    @Body() jestData: any,
  ): Promise<TestResultDto[]> {
    try {
      return await this.testResultService.createTestResultsFromJest(projectId, jestData);
    } catch (error) {
      if (error instanceof ProjectNotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof SyntaxError) {
        throw new BadRequestException(`Некорректный JSON: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Получает результат теста по идентификатору
   * @param id Идентификатор результата теста
   * @returns Результат теста
   */
  @Get(':id')
  @ApiOperation({ 
    summary: 'Получение результата теста по ID',
    description: 'Возвращает результат теста по его уникальному идентификатору'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Уникальный идентификатор результата теста',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Результат теста найден',
    type: TestResultDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Результат теста не найден'
  })
  async getTestResult(@Param('id') id: string): Promise<TestResultDto | null> {
    return this.testResultService.getTestResultById(id);
  }

  /**
   * Получает все результаты тестов для проекта
   * @param projectId Идентификатор проекта
   * @returns Список результатов тестов
   */
  @Get('project/:projectId')
  @ApiOperation({ 
    summary: 'Получение результатов тестов проекта',
    description: 'Возвращает все результаты тестов для указанного проекта'
  })
  @ApiParam({ 
    name: 'projectId', 
    description: 'Идентификатор проекта',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Список результатов тестов получен успешно',
    type: [TestResultDto]
  })
  async getTestResultsByProject(@Param('projectId') projectId: string): Promise<TestResultDto[]> {
    return this.testResultService.getTestResultsByProject(projectId);
  }
}
