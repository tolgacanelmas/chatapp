import "./index.css";
import Login from "./components/Login";
import Dashboard from "./components/dashboard/index";
import { useUserLoggedIn } from "./context/UserContext";

export default function App() {
  const { isLogged }: any = useUserLoggedIn();
  return (
    <div className="bg-gray-800 h-full p-8">
      {!isLogged && <Login />}
      {isLogged && <Dashboard />}
    </div>
  );
}
