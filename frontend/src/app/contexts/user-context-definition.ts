import { createContext } from "react";
import { User } from "../../entities";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
