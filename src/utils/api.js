import API from "./authHeader";
import { removeToken, getToken } from "../utils/cookie";


export const createWord = (payload) =>
  API.post("/words", payload);


export const getWords = () =>
  API.get("/words");


export const updateWord = (id, payload) =>
  API.put(`/words/${id}`, payload);


export const deleteWord = (id) =>
  API.delete(`/words/${id}`);


export const login = (data) => API.post("/auth/login", data);

export const register = (data) => API.post("/auth/register", data);

export const forgotPassword = (data) => API.post("/auth/forgot-password", data);

export const resetPassword = (data) => API.post("/auth/reset-password", data);

export const changePassword = (data) => API.post("/auth/change-password", data);

export const logout = () => { removeToken(); window.location.href = "/login"; };

export const getUserProfile = () => API.get("/user/profile");


export const downloadWordsPDF = async () => {
  const res = await API.post("/pdf/generate", null, {
    responseType: "blob",
  });

  return res.data;
};

export const getPDFDownloadLink = async () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  return `${API_URL}/pdf/generate?token=${getToken()}`;
};