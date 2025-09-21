import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID, IsIn, IsObject, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO для создания результата теста
 */
export class CreateTestResultDto {
  /**
   * Идентификатор проекта
   */
  @ApiProperty({
    description: 'Идентификатор проекта',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID(4, { message: 'Некорректный формат UUID для проекта' })
  @IsNotEmpty({ message: 'Идентификатор проекта обязателен' })
  projectId: string;

  /**
   * Название теста
   */
  @ApiProperty({
    description: 'Название теста',
    example: 'should return correct result',
    maxLength: 500,
  })
  @IsString()
  @IsNotEmpty({ message: 'Название теста обязательно' })
  @MaxLength(500, { message: 'Название теста должно содержать не более 500 символов' })
  testName: string;

  /**
   * Статус теста (passed, failed, skipped)
   */
  @ApiProperty({
    description: 'Статус теста',
    example: 'passed',
    enum: ['passed', 'failed', 'skipped'],
  })
  @IsString()
  @IsIn(['passed', 'failed', 'skipped'], { message: 'Статус теста должен быть: passed, failed или skipped' })
  @IsNotEmpty({ message: 'Статус теста обязателен' })
  status: string;

  /**
   * Длительность выполнения теста в миллисекундах
   */
  @ApiPropertyOptional({
    description: 'Длительность выполнения теста в миллисекундах',
    example: 150.5,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Длительность теста должна быть числом' })
  duration?: number;

  /**
   * Сообщение об ошибке (если тест провалился)
   */
  @ApiPropertyOptional({
    description: 'Сообщение об ошибке (если тест провалился)',
    example: 'Expected 5 but received 3',
    maxLength: 2000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000, { message: 'Сообщение об ошибке не должно превышать 2000 символов' })
  errorMessage?: string;

  /**
   * Стек вызовов ошибки (если тест провалился)
   */
  @ApiPropertyOptional({
    description: 'Стек вызовов ошибки (если тест провалился)',
    example: 'Error: Expected 5 but received 3\n    at Object.<anonymous> (test.js:10:5)',
    maxLength: 10000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(10000, { message: 'Стек вызовов не должен превышать 10000 символов' })
  stackTrace?: string;

  /**
   * Полные данные теста в формате Jest JSON
   */
  @ApiProperty({
    description: 'Полные данные теста в формате Jest JSON',
    example: { test: 'data', duration: 100 },
  })
  @IsObject({ message: 'Данные теста должны быть объектом' })
  @IsNotEmpty({ message: 'Данные теста обязательны' })
  rawData: any;
}

/**
 * DTO для представления результата теста
 */
export class TestResultDto {
  /**
   * Уникальный идентификатор результата теста
   */
  @ApiProperty({
    description: 'Уникальный идентификатор результата теста',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  /**
   * Идентификатор проекта
   */
  @ApiProperty({
    description: 'Идентификатор проекта',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  projectId: string;

  /**
   * Название теста
   */
  @ApiProperty({
    description: 'Название теста',
    example: 'should return correct result',
  })
  testName: string;

  /**
   * Статус теста (passed, failed, skipped)
   */
  @ApiProperty({
    description: 'Статус теста',
    example: 'passed',
    enum: ['passed', 'failed', 'skipped'],
  })
  status: string;

  /**
   * Длительность выполнения теста в миллисекундах
   */
  @ApiPropertyOptional({
    description: 'Длительность выполнения теста в миллисекундах',
    example: 150.5,
  })
  duration?: number;

  /**
   * Сообщение об ошибке (если тест провалился)
   */
  @ApiPropertyOptional({
    description: 'Сообщение об ошибке (если тест провалился)',
    example: 'Expected 5 but received 3',
  })
  errorMessage?: string;

  /**
   * Стек вызовов ошибки (если тест провалился)
   */
  @ApiPropertyOptional({
    description: 'Стек вызовов ошибки (если тест провалился)',
    example: 'Error: Expected 5 but received 3\n    at Object.<anonymous> (test.js:10:5)',
  })
  stackTrace?: string;

  /**
   * Полные данные теста в формате Jest JSON
   */
  @ApiProperty({
    description: 'Полные данные теста в формате Jest JSON',
    example: { test: 'data', duration: 100 },
  })
  rawData: any;

  /**
   * Дата создания записи
   */
  @ApiProperty({
    description: 'Дата создания записи',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;
}

/**
 * DTO для отправки результатов тестов Jest
 */
export class JestTestResultsDto {
  /**
   * Идентификатор проекта
   */
  @ApiProperty({
    description: 'Идентификатор проекта',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID(4, { message: 'Некорректный формат UUID для проекта' })
  @IsNotEmpty({ message: 'Идентификатор проекта обязателен' })
  projectId: string;

  /**
   * JSON данные от Jest
   */
  @ApiProperty({
    description: 'JSON данные от Jest',
    example: {
      testResults: [
        {
          assertionResults: [
            {
              title: 'should pass test',
              status: 'passed',
              duration: 100
            }
          ]
        }
      ]
    },
  })
  @IsObject({ message: 'Данные Jest должны быть объектом' })
  @IsNotEmpty({ message: 'Данные Jest обязательны' })
  jestData: any;
}
