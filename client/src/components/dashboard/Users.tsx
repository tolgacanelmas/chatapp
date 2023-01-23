export default function Users({ users, user }:any) {
    console.log(user)
    return (
        <div className="flex flex-col w-1/4">
            <div className="text-gray-100 border-b border-gray-500 pb-6 mb-6">
                <p className="text-2xl">My Account</p>
                <p className="text-sm mt-2">
                    Username: {user.username}
                </p>
                <div className="text-xs mb-4">
                    Total People : {users.length}
                </div>
                <div className="form-control mb-0">
                    <label htmlFor="search">Search User</label>
                    <input type="text" name="search"/>
                </div>
            </div>

            <p className="text-white mb-4 text-lg">Choose user to chat</p>

            <div className="overflow-auto h-max">
                {
                    users.map((user:any, i:any) =>
                    (
                        <div key={i} className="py-2 border-b border-gray-500 mb-2 text-gray-300 mr-4 cursor-pointer hover:bg-gray-600 p-2 rounded-md">
                            {user.username}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}