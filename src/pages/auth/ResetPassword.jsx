// pages/ResetPassword.jsx
import { useState } from "react";
import API from "../../utils/api";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthLayout from "../components/AuthLayout";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const location = useLocation();
  const { email } = location.state || "";

  const navigate = useNavigate();

  const [data, setData] = useState({
    otp: "",
    newPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const reset = async () => {
    setLoading(true);
    await API.post("/auth/reset-password", { email, ...data });
    alert("Password reset successful");
    setLoading(false);
    navigate("/login");
  };

  return (
    <AuthLayout title="Reset Password">
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ fontWeight: "bold" }}>Email</label>
        <div>{email}</div>
      </div>

      <Input
        label="OTP"
        value={data.otp}
        onChange={e => setData({ ...data, otp: e.target.value })}
      />
      <Input
        label="New Password"
        type="password"
        value={data.newPassword}
        onChange={e => setData({ ...data, newPassword: e.target.value })}
      />
      <Button onClick={reset} disabled={loading}>{loading? "Resetting...":"Reset"}</Button>
    </AuthLayout>
  );
}
