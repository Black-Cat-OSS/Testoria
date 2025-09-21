import {
  Badge,
  Box,
  Button,
  Grid,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FaPlay,
  FaStop,
  FaTerminal,
  FaFolder,
  FaTrash,
  FaPause,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Container, ContainerApi } from "@entities";

const getStatusColor = (status: Container['status']) => {
  switch (status) {
    case 'running':
      return 'green';
    case 'stopped':
      return 'red';
    case 'paused':
      return 'yellow';
    default:
      return 'gray';
  }
};

const getStatusIcon = (status: Container['status']) => {
  switch (status) {
    case 'running':
      return FaPlay;
    case 'stopped':
      return FaStop;
    case 'paused':
      return FaPause;
    default:
      return FaStop;
  }
};

const formatUptime = (startedAt?: Date) => {
  if (!startedAt) return 'N/A';

  const now = new Date();
  const diff = now.getTime() - startedAt.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  return `${minutes}m`;
};

export const ContainerTable = () => {
  const [containers, setContainers] = useState<Container[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContainers = async () => {
      try {
        const data = await ContainerApi.getContainers();
        setContainers(data);
      } catch (error) {
        console.error('Failed to load containers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContainers();
  }, []);

  const handleAction = async (action: 'start' | 'stop' | 'restart' | 'remove' | 'logs' | 'files', containerId: string) => {
    try {
      await ContainerApi.executeAction({ type: action, containerId });

      // Обновляем статус контейнера локально
      setContainers(prev => prev.map(container => {
        if (container.id === containerId) {
          switch (action) {
            case 'start':
              return { ...container, status: 'running', startedAt: new Date() };
            case 'stop':
              return { ...container, status: 'stopped', startedAt: undefined };
            case 'restart':
              return { ...container, status: 'running', startedAt: new Date() };
            default:
              return container;
          }
        }
        return container;
      }));

      // Если удаляем контейнер, убираем его из списка
      if (action === 'remove') {
        setContainers(prev => prev.filter(container => container.id !== containerId));
      }
    } catch (error) {
      console.error(`Failed to ${action} container:`, error);
    }
  };

  if (loading) {
    return (
      <Box
        width="100%"
        maxWidth="100%"
        bg="white"
        _dark={{ bg: "gray.800" }}
        borderRadius="lg"
        p={8}
        textAlign="center"
      >
        <VStack gap={4}>
          <Text
            fontSize="lg"
            color="gray.600"
            _dark={{ color: "gray.400" }}
          >
            Загрузка контейнеров...
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      width="100%"
      maxWidth="100%"
      bg="white"
      _dark={{ bg: "gray.800" }}
      borderRadius="lg"
      overflow="hidden"
      shadow="sm"
    >
      {/* Заголовки */}
      <Grid
        templateColumns="2fr 2fr 1fr 1fr 1fr 2fr"
        gap={4}
        p={4}
        bg="gray.50"
        fontWeight="bold"
        fontSize="sm"
        color="gray.700"
        _dark={{
          bg: "gray.700",
          color: "gray.200"
        }}
      >
        <Text>Название</Text>
        <Text>Образ</Text>
        <Text>Статус</Text>
        <Text>Время работы</Text>
        <Text>Порты</Text>
        <Text>Управление</Text>
      </Grid>

      {/* Строки контейнеров */}
      <VStack gap={0} align="stretch">
        {containers.map((container) => (
          <Box
            key={container.id}
            p={4}
            borderBottom="1px solid"
            borderColor="gray.200"
            bg="white"
            _hover={{
              bg: "gray.50"
            }}
            _dark={{
              borderColor: "gray.600",
              bg: "gray.800",
              _hover: { bg: "gray.700" }
            }}
            _last={{ borderBottom: "none" }}
            transition="all 0.2s"
          >
            <Grid templateColumns="2fr 2fr 1fr 1fr 1fr 2fr" gap={4} alignItems="center">
              <Text
                fontWeight="medium"
                fontFamily="mono"
                color="gray.900"
                fontSize="sm"
                _dark={{ color: "gray.100" }}
              >
                {container.name}
              </Text>

              <Text
                fontFamily="mono"
                fontSize="sm"
                color="gray.700"
                _dark={{ color: "gray.300" }}
              >
                {container.image}
              </Text>

              <HStack gap={2}>
                <Icon
                  as={getStatusIcon(container.status)}
                  boxSize={3}
                  color={getStatusColor(container.status) + ".500"}
                />
                <Badge
                  colorScheme={getStatusColor(container.status)}
                  variant="subtle"
                  textTransform="capitalize"
                >
                  {container.status}
                </Badge>
              </HStack>

              <Text
                fontSize="sm"
                color="gray.600"
                fontFamily="mono"
                _dark={{ color: "gray.400" }}
              >
                {formatUptime(container.startedAt)}
              </Text>

              <VStack align="start" gap={1}>
                {container.ports.length > 0 ? (
                  container.ports.map((port: string, index: number) => (
                    <Text
                      key={index}
                      fontSize="xs"
                      fontFamily="mono"
                      color="green.600"
                      bg="green.50"
                      px={2}
                      py={1}
                      borderRadius="sm"
                      _dark={{
                        color: "green.400",
                        bg: "green.900"
                      }}
                    >
                      {port}
                    </Text>
                  ))
                ) : (
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    _dark={{ color: "gray.500" }}
                    fontStyle="italic"
                  >
                    Нет портов
                  </Text>
                )}
              </VStack>

              <HStack gap={1} flexWrap="wrap">
                {container.status === 'running' ? (
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    onClick={() => handleAction('stop', container.id)}
                    bg="red.50"
                    _hover={{
                      bg: "red.100"
                    }}
                    borderColor="red.300"
                    _dark={{
                      bg: "red.900",
                      borderColor: "red.600",
                      _hover: { bg: "red.800" }
                    }}
                  >
                    <Icon as={FaStop} color="red.600" _dark={{ color: "red.400" }} />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    colorScheme="green"
                    variant="outline"
                    onClick={() => handleAction('start', container.id)}
                    bg="green.50"
                    _hover={{
                      bg: "green.100"
                    }}
                    borderColor="green.300"
                    _dark={{
                      bg: "green.900",
                      borderColor: "green.600",
                      _hover: { bg: "green.800" }
                    }}
                  >
                    <Icon as={FaPlay} color="green.600" _dark={{ color: "green.400" }} />
                  </Button>
                )}

                <Button
                  size="sm"
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => handleAction('logs', container.id)}
                  title="Логи"
                  bg="blue.50"
                  _hover={{
                    bg: "blue.100"
                  }}
                  borderColor="blue.300"
                  _dark={{
                    bg: "blue.900",
                    borderColor: "blue.600",
                    _hover: { bg: "blue.800" }
                  }}
                >
                  <Icon as={FaTerminal} color="blue.600" _dark={{ color: "blue.400" }} />
                </Button>

                <Button
                  size="sm"
                  colorScheme="purple"
                  variant="outline"
                  onClick={() => handleAction('files', container.id)}
                  title="Файлы"
                  bg="purple.50"
                  _hover={{
                    bg: "purple.100"
                  }}
                  borderColor="purple.300"
                  _dark={{
                    bg: "purple.900",
                    borderColor: "purple.600",
                    _hover: { bg: "purple.800" }
                  }}
                >
                  <Icon as={FaFolder} color="purple.600" _dark={{ color: "purple.400" }} />
                </Button>

                <Button
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                  onClick={() => handleAction('remove', container.id)}
                  title="Удалить"
                  bg="red.50"
                  _hover={{
                    bg: "red.100"
                  }}
                  borderColor="red.300"
                  _dark={{
                    bg: "red.900",
                    borderColor: "red.600",
                    _hover: { bg: "red.800" }
                  }}
                >
                  <Icon as={FaTrash} color="red.600" _dark={{ color: "red.400" }} />
                </Button>
              </HStack>
            </Grid>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
