import { useState } from "react";

export default function Login({ handleSubmit }:any) {
    const [registerText, setRegisterText] = useState("Click here for registration")
    const [loginBtn, setLoginBtn] = useState("Login")
    const [isLoginForm, setIsLoginForm] = useState(true)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLoginOption = () => {
        setIsLoginForm(!isLoginForm)
        if(isLoginForm) {
            setLoginBtn("Register")
            setRegisterText('Click here for login')
        } else {
            setLoginBtn("Login")
            setRegisterText('Click here for registration')
        }
    }

    return (
        <div className='login-screen h-full flex justify-center items-center flex-col'>
            <h1 className="text-white text-3xl mb-8">Login to chat app</h1>
            <div className="max-w-sm border border-gray-500 rounded-md px-10 py-8 shadow-lg">
                <form>
                    <div className="form-control">
                        <label>
                            Username
                        </label>
                        <input type="text" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    {
                        !isLoginForm &&
                        <div className="form-control">
                            <label>
                                Email
                            </label>
                            <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    }
                    <div className="form-control">
                        <label>
                            Password
                        </label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="mt-2" onClick={(e) => handleSubmit(e, username, password, email)}>
                        {loginBtn}
                    </button>
                </form>
                <p className="text-gray-100 cursor-pointer underline text-center mt-4" onClick={handleLoginOption}>{registerText}</p>
            </div>
        </div>
    )
}