import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setLoading(true);

    try {
      // 🔐 Call backend API
      const data = await loginUser(email, password);

      // Save user in context
      login(data.email, data.role);

      // Save JWT token
      localStorage.setItem("cloudvote_token", data.token);

      // Redirect based on role
      if (data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      setErrorMessage("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "100px", textAlign: "center" }}>
      <h1>CloudVote Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {errorMessage && (
          <p style={{ color: "red", marginTop: "15px" }}>
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
