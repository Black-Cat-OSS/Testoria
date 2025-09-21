import { createContext, useContext, ReactNode } from 'react';

interface ProjectFormContextValue {
  onNameGenerated: (name: string) => void;
}

const ProjectFormContext = createContext<ProjectFormContextValue | undefined>(undefined);

interface ProjectFormProviderProps {
  children: ReactNode;
  onNameGenerated: (name: string) => void;
}

export const ProjectFormProvider = ({ children, onNameGenerated }: ProjectFormProviderProps) => {
  return (
    <ProjectFormContext.Provider value={{ onNameGenerated }}>
      {children}
    </ProjectFormContext.Provider>
  );
};

export const useProjectFormContext = () => {
  const context = useContext(ProjectFormContext);
  if (context === undefined) {
    throw new Error('useProjectFormContext must be used within a ProjectFormProvider');
  }
  return context;
};
