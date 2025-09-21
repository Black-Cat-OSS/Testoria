import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Сервис для работы с базой данных через Prisma
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * Инициализация подключения к базе данных
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Закрытие подключения к базе данных
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
