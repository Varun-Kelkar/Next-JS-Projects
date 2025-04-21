// context/UserContext.tsx
"use client";
import { User } from "lucia";
import { createContext, useContext } from "react";

export const UserContext = createContext<User>({
  id: "",
});

export const useUser = () => {
  return useContext(UserContext);
};

interface UserProviderProps {
  children: React.ReactNode;
  value: User;
}

export default function UserProvider({ children, value }: UserProviderProps) {
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
