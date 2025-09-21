import { Box, Text, VStack, HStack, Badge } from '@chakra-ui/react';
import { ProjectInfo } from '@entities';
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaPauseCircle, 
  FaPlayCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

interface ProjectCardProps {
  project: ProjectInfo;
}

/**
 * Карточка проекта с информацией о тестах
 */
export const ProjectCard = ({ project }: ProjectCardProps) => {
  const successRate = project.totalTests > 0 
    ? Math.round((project.passedTests / project.totalTests) * 100) 
    : 0;

  const isRunning = project.runningTests > 0;
  const hasTests = project.totalTests > 0;

  // Определение градиента на основе статуса тестов
  const getGradient = () => {
    if (!hasTests) {
      return 'linear(to-br, gray.100, gray.200)';
    }

    if (isRunning) {
      return 'linear(to-br, orange.200, orange.300)';
    }

    if (successRate >= 90) {
      return 'linear(to-br, green.200, green.300)';
    }

    if (successRate >= 70) {
      return 'linear(to-br, yellow.200, yellow.300)';
    }

    if (successRate >= 50) {
      return 'linear(to-br, red.200, red.300)';
    }

    return 'linear(to-br, red.300, red.400)';
  };

  const getStatusColor = () => {
    if (!hasTests) return 'gray';
    if (isRunning) return 'orange';
    if (successRate >= 90) return 'green';
    if (successRate >= 70) return 'yellow';
    return 'red';
  };

  const getStatusText = () => {
    if (!hasTests) return 'Нет тестов';
    if (isRunning) return 'Выполняется';
    if (successRate >= 90) return 'Отлично';
    if (successRate >= 70) return 'Хорошо';
    return 'Требует внимания';
  };

  const getStatusIcon = () => {
    if (!hasTests) return FaExclamationTriangle;
    if (isRunning) return FaPlayCircle;
    if (successRate >= 70) return FaCheckCircle;
    return FaTimesCircle;
  };

  const StatusIcon = getStatusIcon();

  return (
    <Box
      bgGradient={getGradient()}
      borderRadius="xl"
      p={6}
      shadow="lg"
      transition="all 0.2s"
      _hover={{
        shadow: 'xl',
        transform: 'translateY(-2px)'
      }}
      minH="200px"
      position="relative"
      overflow="hidden"
    >
      {/* Заголовок */}
      <Text
        fontSize="xl"
        fontWeight="bold"
        color="gray.800"
        mb={4}
        lineHeight="1.2"
        textShadow="0 1px 2px rgba(0,0,0,0.1)"
      >
        {project.name}
      </Text>

      {/* Статус */}
      <HStack mb={4} gap={2}>
        <StatusIcon 
          color="gray.600" 
          size="16px" 
        />
        <Badge
          colorScheme={getStatusColor()}
          variant="subtle"
          fontSize="sm"
          px={2}
          py={1}
        >
          {getStatusText()}
        </Badge>
      </HStack>

      {/* Статистика тестов */}
      <VStack gap={3} align="stretch">
        {/* Общее количество */}
        <HStack justify="space-between">
          <Text
            fontSize="sm"
            color="gray.600"
            fontWeight="medium"
          >
            Всего тестов:
          </Text>
          <Text
            fontSize="sm"
            fontWeight="bold"
            color="gray.800"
          >
            {project.totalTests}
          </Text>
        </HStack>

        {/* Пройденные тесты */}
        <HStack justify="space-between">
          <HStack gap={2}>
            <FaCheckCircle color="#38A169" size="14px" />
            <Text
              fontSize="sm"
              color="gray.600"
            >
              Пройдено:
            </Text>
          </HStack>
          <Text
            fontSize="sm"
            fontWeight="bold"
            color="green.600"
          >
            {project.passedTests}
          </Text>
        </HStack>

        {/* Проваленные тесты */}
        {project.failedTests > 0 && (
          <HStack justify="space-between">
            <HStack gap={2}>
            <FaTimesCircle color="#E53E3E" size="14px" />
            <Text
              fontSize="sm"
              color="gray.600"
            >
              Провалено:
            </Text>
          </HStack>
          <Text
            fontSize="sm"
            fontWeight="bold"
            color="red.600"
          >
            {project.failedTests}
          </Text>
          </HStack>
        )}

        {/* Пропущенные тесты */}
        {project.skippedTests > 0 && (
          <HStack justify="space-between">
            <HStack gap={2}>
            <FaPauseCircle color="#D69E2E" size="14px" />
            <Text
              fontSize="sm"
              color="gray.600"
            >
              Пропущено:
            </Text>
          </HStack>
          <Text
            fontSize="sm"
            fontWeight="bold"
            color="yellow.600"
          >
            {project.skippedTests}
          </Text>
          </HStack>
        )}

        {/* Тесты в процессе */}
        {project.runningTests > 0 && (
          <HStack justify="space-between">
            <HStack gap={2}>
            <FaPlayCircle color="#DD6B20" size="14px" />
            <Text
              fontSize="sm"
              color="gray.600"
            >
              В процессе:
            </Text>
          </HStack>
          <Text
            fontSize="sm"
            fontWeight="bold"
            color="orange.600"
          >
            {project.runningTests}
          </Text>
          </HStack>
        )}

        {/* Процент успешности */}
        {hasTests && (
          <Box
            mt={2}
            p={2}
            bg="rgba(255,255,255,0.3)"
            borderRadius="md"
          >
            <Text
              fontSize="sm"
              textAlign="center"
              fontWeight="bold"
              color="gray.800"
            >
              Успешность: {successRate}%
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};
