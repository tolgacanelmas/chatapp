import React, { useContext, useState } from "react";

const UserContext = React.createContext();

export function useUserLoggedIn() {
  return useContext(UserContext);
}

export function UserProvider({ children }: any) {
  const [isLogged, setIsLogged] = useState<Boolean>(false);

  const successLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{ isLogged, setIsLogged, handleLogout, successLogin }}
    >
      {children}
    </UserContext.Provider>
  );
}
