import Users from "./Users";
import Chat from "./Chat";
import socketClient from "socket.io-client";
import { useState } from "react";
import { useUserLoggedIn } from "../../context/UserContext";

export default function Dashboard() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { user }: any = useUserLoggedIn();
  const [activeIndex, setActiveIndex] = useState(null);

  const handleSelectUser = (user: any, i) => {
    setSelectedUser(user);
    setActiveIndex(i);
  };

  return (
    <div className="flex p-8 bg-gray-700 h-full rounded-3xl overflow-hidden">
      <Users
        handleSelectUser={handleSelectUser}
        selectedUser={selectedUser}
        activeIndex={activeIndex}
      />
      <Chat selectedUser={selectedUser} user={user} />
    </div>
  );
}
