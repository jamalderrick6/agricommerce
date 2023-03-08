import { createContext, useContext } from "react";
    
export const AuthContext = createContext({
  user: undefined,
  cartItems: [],
  userAddresses: [],
  isLoading: false,
  setUser: () => {},
  setUserCartItems: () => {},
  setUserAddresses: () => {},
});

export const useAuthContext = () => useContext(AuthContext);