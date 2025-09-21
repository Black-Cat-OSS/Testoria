import { useState, useEffect, useMemo } from 'react';
import { Box, useBreakpointValue, Spinner, Text, VStack } from '@chakra-ui/react';
import { ProjectCard } from '@widgets';
import { ProjectInfo } from '@entities';
import { projectAPI } from '@api';

/**
 * Компонент для отображения проектов в Pinterest-подобной сетке
 */
export const ProjectCards = () => {
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Определение количества колонок в зависимости от размера экрана
  const columnsCount = useBreakpointValue({
    base: 1,    // мобильные устройства
    sm: 2,      // маленькие планшеты
    md: 3,      // средние планшеты
    lg: 4,      // десктопы
    xl: 5       // большие экраны
  }) || 4;

  // Загрузка проектов
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await projectAPI.getAll();
        setProjects(data);
      } catch (err) {
        setError('Ошибка загрузки проектов');
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Распределение проектов по колонкам
  const columnsData = useMemo(() => {
    if (!projects.length) return [];

    const columns: ProjectInfo[][] = Array.from({ length: columnsCount }, () => []);
    
    // Распределяем проекты по колонкам поочередно
    projects.forEach((project, index) => {
      const columnIndex = index % columnsCount;
      columns[columnIndex].push(project);
    });

    return columns;
  }, [projects, columnsCount]);

  // Определение максимального количества рядов
  const maxRows = useMemo(() => {
    return Math.max(...columnsData.map(column => column.length));
  }, [columnsData]);

  if (loading) {
    return (
      <VStack gap={4} py={8}>
        <Spinner size="xl" color="blue.500" />
        <Text color="gray.600">Загрузка проектов...</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack gap={4} py={8}>
        <Text color="red.500" fontSize="lg">
          {error}
        </Text>
      </VStack>
    );
  }

  if (!projects.length) {
    return (
      <VStack gap={4} py={8}>
        <Text color="gray.600" fontSize="lg">
          Проекты не найдены
        </Text>
      </VStack>
    );
  }

  return (
    <Box
      w="full"
      px={{ base: 4, md: 6, lg: 8 }}
      py={6}
    >
      {/* Заголовок */}
      <Text
        fontSize="2xl"
        fontWeight="bold"
        mb={6}
        textAlign="center"
        color="gray.800"
      >
        Проекты ({projects.length})
      </Text>

      {/* Masonry Layout */}
      <Box
        display="grid"
        gridTemplateColumns={`repeat(${columnsCount}, 1fr)`}
        gap={6}
        alignItems="start"
      >
        {columnsData.map((column, columnIndex) => (
          <Box
            key={columnIndex}
            display="flex"
            flexDirection="column"
            gap={6}
          >
            {column.map((project, rowIndex) => (
              <Box
                key={project.id}
                w="full"
                minH={`${200 + (rowIndex * 20)}px`}
              >
                <ProjectCard project={project} />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
