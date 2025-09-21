export interface Container {
  id: string;
  name: string;
  image: string;
  status: 'running' | 'stopped' | 'paused';
  ports: string[];
  createdAt: Date;
  startedAt?: Date;
}

export interface ContainerPort {
  host: string;
  container: string;
  protocol: 'tcp' | 'udp';
}

export interface ContainerAction {
  type: 'start' | 'stop' | 'restart' | 'remove' | 'logs' | 'files';
  containerId: string;
}
