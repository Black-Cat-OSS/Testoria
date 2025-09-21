export const GitApi = {
  cloneRepository: async (repositoryUrl: string): Promise<number> => {
    return new Promise((resolve) => {
      if (!repositoryUrl) {
        console.error("Repository URL is required");
        resolve(400);
        return;
      }

      console.log("Cloning repository:", repositoryUrl);

      // Имитируем процесс клонирования репозитория
      setTimeout(() => {
        console.log("Repository cloned successfully:", repositoryUrl);
        resolve(200);
      }, 15000);
    });
  },
};
