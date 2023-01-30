import Users from "./Users";
import Chat from "./Chat";

export default function Dashboard({ user, users, isLogged }: any) {
  return (
    <div className="flex p-8 bg-gray-700 h-full rounded-3xl">
      <Users users={users} user={user} isLogged={isLogged} />
      <Chat />
    </div>
  );
}
