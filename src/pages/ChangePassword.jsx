// pages/ChangePassword.jsx
import { useState } from "react";
import API from "../utils/api";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import AuthLayout from "../components/auth/AuthLayout";

export default function ChangePassword() {
  const [data, setData] = useState({ oldPassword: "", newPassword: "" });

  const change = async () => {
    await API.post("/auth/change-password", data);
    alert("Password changed");
  };

  return (
    <AuthLayout title="Change Password">
      <Input label="Old Password" type="password" onChange={e => setData({ ...data, oldPassword: e.target.value })} />
      <Input label="New Password" type="password" onChange={e => setData({ ...data, newPassword: e.target.value })} />
      <Button onClick={change}>Change</Button>
    </AuthLayout>
  );
}
