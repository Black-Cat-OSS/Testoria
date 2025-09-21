import { Container, ContainerAction } from './types';
import containerData from './data.json';

// Генератор случайных названий контейнеров
const adjectives = [
  'swift', 'bright', 'clever', 'bold', 'calm', 'cool', 'fast', 'smart',
  'quick', 'sharp', 'wise', 'brave', 'strong', 'gentle', 'kind', 'pure'
];

const nouns = [
  'eagle', 'tiger', 'wolf', 'bear', 'lion', 'fox', 'hawk', 'shark',
  'dragon', 'phoenix', 'falcon', 'panther', 'jaguar', 'leopard', 'lynx', 'raven'
];

const services = [
  'web', 'api', 'db', 'cache', 'proxy', 'auth', 'gateway', 'worker',
  'scheduler', 'monitor', 'logger', 'queue', 'storage', 'search', 'analytics'
];

export const generateContainerName = (): string => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const service = services[Math.floor(Math.random() * services.length)];
  const number = Math.floor(Math.random() * 999) + 1;

  return `${service}-${adjective}-${noun}-${number}`;
};

// Имитация API
export const ContainerApi = {
  // Получить все контейнеры
  getContainers: async (): Promise<Container[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const containers = containerData.map(container => ({
          ...container,
          createdAt: new Date(container.createdAt),
          startedAt: container.startedAt ? new Date(container.startedAt) : undefined,
        }));
        resolve(containers);
      }, 500);
    });
  },

  // Выполнить действие с контейнером
  executeAction: async (action: ContainerAction): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Executing action: ${action.type} on container ${action.containerId}`);
        resolve(true);
      }, 300);
    });
  },

  // Создать новый контейнер
  createContainer: async (image: string): Promise<Container> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newContainer: Container = {
          id: Date.now().toString(),
          name: generateContainerName(),
          image,
          status: 'stopped',
          ports: [],
          createdAt: new Date(),
        };
        resolve(newContainer);
      }, 800);
    });
  },

  // Удалить контейнер
  removeContainer: async (containerId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Removing container: ${containerId}`);
        resolve(true);
      }, 400);
    });
  },
};
