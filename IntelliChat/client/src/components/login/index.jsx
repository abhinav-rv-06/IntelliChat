import { useState, useEffect } from "react";
import { usePostLoginMutation, usePostSignUpMutation } from "@/state/api";

// Define a React component called 'Login' which takes 'setUser' and 'setSecret' as props.
const Login = ({ setUser, setSecret }) => {
  // Initialize state variables for registration/login status, username, and password.
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Initialize mutations for login and signup.
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp] = usePostSignUpMutation();

  // Event handler for handling login.
  const handleLogin = () => {
    triggerLogin({ username, password });
  };

  // Event handler for handling registration.
  const handleRegister = () => {
    triggerSignUp({ username, password });
  };

  // Effect to set user and secret when login is successful.
  useEffect(() => {
    if (resultLogin.data?.response) {
      setUser(username);
      setSecret(password);
    }
  }, [resultLogin.data]);

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Display the title */}
        <h2 id="ttle" className="title">IntelliChat</h2>
        {/* Toggle between registration and login */}
        <p
          className="register-change"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already a user?" : "Are you a new user?"}
        </p>

        <div>
          {/* Input fields for username and password */}
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="login-actions">
          {/* Conditionally render a Register or Login button */}
          {isRegister ? (
            <button class="bb" type="button" onClick={handleRegister}>
              Register
            </button>
          ) : (
            <button class="bb" type="button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Export the 'Login' component as the default export.
export default Login;
