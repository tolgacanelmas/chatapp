import { useState } from "react";
import { useUserLoggedIn } from "../context/UserContext";

export default function Login() {
  const [registerText, setRegisterText] = useState(
    "Click here for registration"
  );
  const [loginBtn, setLoginBtn] = useState("Login");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleSubmitLogin }: any = useUserLoggedIn();

  const handleLoginOption = () => {
    setIsLoginForm(!isLoginForm);
    if (isLoginForm) {
      setLoginBtn("Register");
      setRegisterText("Click here for login");
    } else {
      setLoginBtn("Login");
      setRegisterText("Click here for registration");
    }
  };

  return (
    <div className="login-screen h-full flex justify-center items-center flex-col">
      <h1 className="text-white text-3xl mb-8">Chat app</h1>
      <div className="w-80 border border-gray-500 rounded-md px-10 py-8 shadow-lg">
        <form>
          {!isLoginForm && (
            <div className="form-control">
              <label>Username</label>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div className="form-control">
            <label>Email</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-2"
            onClick={(e) =>
              handleSubmitLogin(e, username, password, email, isLoginForm)
            }
          >
            {loginBtn}
          </button>
        </form>
        <p
          className="text-gray-100 cursor-pointer underline text-center mt-4"
          onClick={handleLoginOption}
        >
          {registerText}
        </p>
      </div>
    </div>
  );
}
