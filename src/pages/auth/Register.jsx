// pages/Register.jsx
import { useState } from "react";
import API from "../../utils/api";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthLayout from "../components/AuthLayout";
import { setToken } from "../../utils/cookie";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    setLoading(true);
    if (form.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const res = await API.post("/auth/register", form);
    setToken(res.data.token);
    alert("Registered successfully");
    setLoading(false);
    navigate("/");
  };

  return (
    <AuthLayout title="Register">
      <Input label="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <Input label="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <Input label="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <Input label="Confirm Password" type="password" onChange={e => setConfirmPassword(e.target.value)} />
      <Button onClick={submit} disabled={loading}>{loading? "Registering...":"Register"}</Button>
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <div>
          Already have an account?{" "}
          <button
            style={{
              background: "none",
              border: "none",
              color: "#3498db",
              cursor: "pointer",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
