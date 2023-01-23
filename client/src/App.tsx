import Login from './components/Login';
import './index.css';
import { useEffect, useState } from 'react';
import Dashboard from './components/dashboard/Dashboard';

export default function App() {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])

  const handleSubmit = async (e:React.MouseEvent<HTMLElement>, username:String, password:String, email:String) => {
    e.preventDefault()
    const data:any = { email, username, password }
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    const response = await fetch('http://localhost:3000/register', requestOptions);
    const user = await response.json();
    if(response.status === 200) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user.user)
        setIsLogged(true)
    }
  }

  const getUsers = async () => {
    const users = await fetch('http://localhost:3000/users')
    const data = await users.json();
    setUsers(data)
  }

  useEffect(() => {
    if(isLogged) {
      getUsers()
    }
  }, [isLogged]);

  useEffect(() => {
    const user:any = localStorage.getItem("user")
    const getUser = JSON.parse(user)

    if(getUser) {
      setUser(getUser.user)
      setIsLogged(true)
    }
  }, [])


  return (
    <div className="bg-gray-800 h-full p-8">
        {isLogged && <Dashboard user={user} users={users}/>}
        {!isLogged && <Login handleSubmit={handleSubmit}/>}
    </div>
  )
}
