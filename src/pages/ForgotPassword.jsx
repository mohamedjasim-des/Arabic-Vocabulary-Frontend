// pages/ForgotPassword.jsx
import { useState } from "react";
import API from "../utils/api";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthLayout from "../components/AuthLayout";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    setLoading(true);
    await API.post("/auth/forgot-password", { email });
    alert("OTP sent");
    setLoading(false);
    navigate("/reset-password", { state: { email } });
  };

  return (
    <AuthLayout title="Forgot Password">
      <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <Button onClick={sendOtp} disabled={loading}>{loading? "Sending...":"Send OTP"}</Button>
    </AuthLayout>
  );
}
