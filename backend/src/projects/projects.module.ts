import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectService } from './services/project.service';
import { TestResultService } from './services/test-result.service';
import { ProjectController } from './controllers/project.controller';
import { TestResultController } from './controllers/test-result.controller';

/**
 * Модуль для управления проектами и результатами тестов
 */
@Module({
  providers: [
    PrismaService,
    ProjectService,
    TestResultService,
  ],
  controllers: [
    ProjectController,
    TestResultController,
  ],
  exports: [
    ProjectService,
    TestResultService,
  ],
})
export class ProjectsModule {}
