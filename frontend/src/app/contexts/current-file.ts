import { createContext } from "react";

export type File = {
  name: string;
  content: string;
  type: string;
  path: string;
};

export type CurrentFile = {
  file: File;
  setFile: (value: File) => void;
};

export const CurrentFileContext = createContext<
  Partial<CurrentFile>
>({});
