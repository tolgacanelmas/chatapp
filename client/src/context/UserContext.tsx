import React, { useContext, useEffect, useState } from "react";
interface UserSendData {
  username: String;
  email: String;
  password: String;
}

interface UserInfo {
  username: String;
  email: String;
  password: String;
  __v: Number;
  _id: String;
}

const UserContext = React.createContext(null);

export function useUserLoggedIn() {
  return useContext(UserContext);
}

export function UserProvider({ children }: any) {
  const [isLogged, setIsLogged] = useState<Boolean>(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  const handleSubmitLogin = async (
    e: React.MouseEvent<HTMLElement>,
    username: String,
    password: String,
    email: String,
    isLoginForm: boolean
  ) => {
    e.preventDefault();
    if (isLoginForm) {
      const loginData = { email, password };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      };
      const response = await fetch(
        "http://localhost:3000/login",
        requestOptions
      );
      const user = await response.json();

      if (response.status === 200) {
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsLogged(true);
      }
    } else {
      const data: UserSendData = { email, username, password };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      const response = await fetch(
        "http://localhost:3000/register",
        requestOptions
      );

      const user = await response.json();

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(user.user));
        setUser(user.user);
        setIsLogged(true);
      }
    }
  };

  const getUsers = async () => {
    const users = await fetch("http://localhost:3000/users");
    const data = await users.json();
    setUsers(data);
  };

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const getUser: UserInfo = JSON.parse(localStorage.getItem("user") || "{}");

    if (Object.keys(getUser).length > 0) {
      setIsLogged(true);
      getUsers();
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        isLogged,
        setIsLogged,
        handleLogout,
        handleSubmitLogin,
        setUser,
        user,
        users,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
