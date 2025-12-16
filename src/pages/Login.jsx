// pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthLayout from "../components/AuthLayout";
import { setToken } from "../utils/cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      setToken(res.data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
    }
    setLoading(false);
  };

  return (
    <AuthLayout title="Login">
      <Input
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        style={{
          background: "none",
          border: "none",
          color: "#3498db",
          cursor: "pointer",
          marginBottom: "0.5rem",
        }}
        onClick={() => navigate("/forgot-password")}
      >
        Forgot Password?
      </button>
      <Button onClick={handleLogin} disabled={loading}>{loading? "Logging In...":"Login"}</Button>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <div>
          Don't have an account?{" "}
          <button
            style={{
              background: "none",
              border: "none",
              color: "#3498db",
              cursor: "pointer",
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
