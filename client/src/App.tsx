import Login from "./components/Login";
import "./index.css";
import { useEffect, useState } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import { useUserLoggedIn } from "./context/UserContext";

interface UserInfo {
  username: String;
  email: String;
  password: String;
  __v: Number;
  _id: String;
}

interface UserSendData {
  username: String;
  email: String;
  password: String;
}

export default function App() {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  const loginContext: any = useUserLoggedIn();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLElement>,
    username: String,
    password: String,
    email: String
  ) => {
    e.preventDefault();
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
      loginContext.setIsLogged(true);
    }
  };

  const getUsers = async () => {
    const users = await fetch("http://localhost:3000/users");
    const data = await users.json();
    setUsers(data);
  };

  useEffect(() => {
    const getUser: UserInfo = JSON.parse(localStorage.getItem("user") || "{}");

    if (getUser) {
      getUsers();
      setUser(getUser);
      loginContext.setIsLogged(true);
    }
  }, []);

  return (
    <div className="bg-gray-800 h-full p-8">
      {!loginContext.isLogged && <Login handleSubmit={handleSubmit} />}
      {loginContext.isLogged && <Dashboard user={user} users={users} />}
    </div>
  );
}
