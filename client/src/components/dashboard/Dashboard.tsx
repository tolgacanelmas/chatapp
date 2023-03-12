import Users from "./Users";
import Chat from "./Chat";
import socketClient from "socket.io-client";
import { useState } from "react";
import { useUserLoggedIn } from "../../context/UserContext";

export default function Dashboard() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { user }: any = useUserLoggedIn();

  const handleSelectUser = (user: any) => {
    setSelectedUser(user);

    const socket = socketClient("http://localhost:3000");
    socket.on("connection", (x) => {
      console.log(x);
      console.log(`I'm connected with the back-end`);
    });
  };

  return (
    <div className="flex p-8 bg-gray-700 h-full rounded-3xl overflow-hidden">
      <Users handleSelectUser={handleSelectUser} />
      <Chat selectedUser={selectedUser} user={user} />
    </div>
  );
}
