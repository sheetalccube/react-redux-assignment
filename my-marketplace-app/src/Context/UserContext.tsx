import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface UserContextType {
  userType: string | null;
  setUserType: (type: string) => void;
}

export const UserContext = createContext<UserContextType>({
  userType: null,
  setUserType: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};
