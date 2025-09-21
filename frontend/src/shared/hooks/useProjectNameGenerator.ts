import { useState, useCallback } from 'react';

interface ProjectNameGeneratorOptions {
  techStack?: string[];
  projectTypes?: string[];
  adjectives?: string[];
}

const DEFAULT_TECH_STACK = [
  'react', 'vue', 'angular', 'nextjs', 'nuxt', 'svelte',
  'node', 'express', 'fastify', 'nest', 'django', 'flask',
  'spring', 'laravel', 'rails', 'aspnet', 'php', 'python',
  'typescript', 'javascript', 'java', 'csharp', 'go', 'rust'
];

const DEFAULT_PROJECT_TYPES = [
  'app', 'website', 'api', 'service', 'dashboard', 'portal',
  'platform', 'tool', 'library', 'cli', 'bot', 'game',
  'mobile', 'desktop', 'extension', 'plugin', 'widget'
];

const DEFAULT_ADJECTIVES = [
  'awesome', 'cool', 'modern', 'fast', 'smart', 'clean',
  'simple', 'elegant', 'powerful', 'flexible', 'robust',
  'secure', 'scalable', 'efficient', 'innovative', 'creative'
];

export const useProjectNameGenerator = (options: ProjectNameGeneratorOptions = {}) => {
  const {
    techStack = DEFAULT_TECH_STACK,
    projectTypes = DEFAULT_PROJECT_TYPES,
    adjectives = DEFAULT_ADJECTIVES
  } = options;

  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRandomName = useCallback(() => {
    const tech = techStack[Math.floor(Math.random() * techStack.length)];
    const type = projectTypes[Math.floor(Math.random() * projectTypes.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    
    // Различные паттерны генерации
    const patterns = [
      `${tech}-${type}`,
      `${adjective}-${tech}`,
      `${tech}-${adjective}-${type}`,
      `${type}-${tech}`,
      `${adjective}-${type}`,
      `${tech}${type}`,
      `${adjective}${tech}`,
    ];
    
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    return pattern.toLowerCase().replace(/[^a-z0-9-]/g, '');
  }, [techStack, projectTypes, adjectives]);

  const generateNames = useCallback((count: number = 5) => {
    setIsGenerating(true);
    
    // Небольшая задержка для имитации асинхронной генерации
    setTimeout(() => {
      const names = Array.from({ length: count }, () => generateRandomName());
      setGeneratedNames(names);
      setIsGenerating(false);
    }, 300);
  }, [generateRandomName]);

  const generateSingleName = useCallback(() => {
    return generateRandomName();
  }, [generateRandomName]);

  const clearGeneratedNames = useCallback(() => {
    setGeneratedNames([]);
  }, []);

  return {
    generatedNames,
    isGenerating,
    generateNames,
    generateSingleName,
    clearGeneratedNames,
  };
};
