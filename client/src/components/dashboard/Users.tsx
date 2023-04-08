import { useUserLoggedIn } from "../../context/UserContext";

export default function Users({ handleSelectUser }: any) {
  const { handleLogout, users, user }: any = useUserLoggedIn();

  console.log(user);

  return (
    <div className="flex flex-col w-1/4 mr-10">
      <div className="text-gray-100 border-b border-gray-500 pb-6 mb-6">
        <div className="flex justify-between">
          <h3 className="text-2xl">My Account</h3>
          <button
            className="bg-gray-600 px-2 rounded-md text-gray-200 text-sm hover:bg-gray-500"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <p className="text-sm mt-2">Username: {user.username}</p>
        <div className="text-xs mb-4">
          Total People : {users.length === 1 ? 0 : users.length - 1}
        </div>
        <div className="form-control mb-0">
          <label htmlFor="search">Search User</label>
          <input type="text" name="search" />
        </div>
      </div>

      <p className="text-white mb-4 text-lg">Choose user to chat</p>

      <div className="overflow-auto h-max">
        {users.map((eachUser: any, i: any) => {
          if (eachUser._id !== user.id) {
            return (
              <div
                key={i}
                className="py-2 border-b border-gray-500 mb-2 text-gray-300 mr-4 cursor-pointer hover:bg-gray-600 p-2 rounded-md"
                onClick={() => handleSelectUser(eachUser)}
              >
                {eachUser.username}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
