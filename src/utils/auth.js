import { removeToken } from "../utils/cookie";

export const logout = () => {
  removeToken();
  window.location.href = "/login";
};
