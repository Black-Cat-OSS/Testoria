import { useState, ReactNode } from "react";
import { User } from "../../entities";
import { UserContext } from "./user-context-definition";

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const value = {
    user,
    setUser,
    isAuthenticated: user !== null,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
