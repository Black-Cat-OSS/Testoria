import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для создания нового проекта
 */
export class CreateProjectDto {
  /**
   * Название проекта
   */
  @ApiProperty({
    description: 'Название проекта',
    example: 'Мой тестовый проект',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty({ message: 'Название проекта обязательно' })
  @MaxLength(255, { message: 'Название проекта должно содержать не более 255 символов' })
  name: string;
}

/**
 * DTO для представления проекта
 */
export class ProjectDto {
  /**
   * Уникальный идентификатор проекта
   */
  @ApiProperty({
    description: 'Уникальный идентификатор проекта',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  /**
   * Название проекта
   */
  @ApiProperty({
    description: 'Название проекта',
    example: 'Мой тестовый проект',
  })
  name: string;

  /**
   * Дата создания проекта
   */
  @ApiProperty({
    description: 'Дата создания проекта',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  /**
   * Дата последнего обновления проекта
   */
  @ApiProperty({
    description: 'Дата последнего обновления проекта',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
