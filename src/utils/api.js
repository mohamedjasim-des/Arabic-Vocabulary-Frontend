import API from "./authHeader";
import { removeToken } from "../utils/cookie";


export const createWord = (payload) =>
  API.post("/words", payload);


export const getWords = () =>
  API.get("/words");


export const updateWord = (id, payload) =>
  API.put(`/words/${id}`, payload);


export const deleteWord = (id) =>
  API.delete(`/words/${id}`);


export const changePassword = (data) =>
  API.post("/auth/change-password", data);


export const logout = () => {
  removeToken();
  window.location.href = "/login";
};

export const getUserProfile = () =>
  API.get("/user/profile");