import { AUTH_TOKEN } from "./constant";
    
export const getToken = () => {
  return typeof window !== "undefined" ? window.localStorage.getItem(AUTH_TOKEN) : false;
};

export const setToken = (token) => {
  if (token) {
    typeof window !== "undefined" ? window.localStorage.setItem(AUTH_TOKEN, token) : false;
  }
};

export const removeToken = () => {
  window.localStorage.removeItem(AUTH_TOKEN);
};