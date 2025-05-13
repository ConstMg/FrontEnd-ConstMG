import { apiClient } from "./ApiClient";

export const loginUser = async (email, password) => {
  return apiClient("login", "POST", { email, password });
};

export const logoutUser = async (email) => {
  return apiClient("logout", "POST", { email });
};


