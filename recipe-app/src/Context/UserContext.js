import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/users/profile`,
        { withCredentials: true }
      );
      setUser(res.data);
      localStorage.setItem("userId", res.data.id);
    } catch (err) {
      setUser(null);
      localStorage.removeItem("userId");
    } finally {
      setUserLoaded(true);
    }
  };

  const logout = async () => {
    console.log("Logging out user");
    setUser(null);
    setUserLoaded(false);
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("userId");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, userId: user?.id, userLoaded, fetchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
