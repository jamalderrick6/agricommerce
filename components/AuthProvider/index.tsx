import React, { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { message } from "antd";
import { useEffect } from "react";
import { API, BEARER } from "../../utils/constant";
import { getToken } from "../../utils/helpers";

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [cartItems, setCartItems] = useState();
  const [userAddresses, setUserAddresses] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const authToken = getToken();

  const fetchLoggedInUser = async (token) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/users/me`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });
      const data = await response.json();

      setUserData(data);
    } catch (error) {
      console.error(error);
      message.error("Error While Getting Logged In User Details");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserCartItems = async (token) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/carts`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });
      const data = await response.json();

      setCartItems(data.data);
    } catch (error) {
      console.error(error);
      message.error("Error While Fetching User Cart Items");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserAddresses = async (token) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/addresses`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });
      const data = await response.json();

      setUserAddresses(data.data);
    } catch (error) {
      console.error(error);
      message.error("Error While Fetching User Cart Items");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUser = (user) => {
    setUserData(user);
  };

  const handleCartItems = (items) => {
    setCartItems(items);
  };

  const handleUserAddresses = (items) => {
    setUserAddresses(items);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (authToken) {
        await fetchLoggedInUser(authToken);
        await fetchUserCartItems(authToken);
        await fetchUserAddresses(authToken);
      }
    };

    fetchData();
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        cartItems: cartItems,
        userAddresses: userAddresses,
        setUser: handleUser,
        setUserCartItems: handleCartItems,
        setUserAddresses: setUserAddresses,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
