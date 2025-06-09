import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Fridge from "./pages/Fridge";
import Kitchen from "./pages/Kitchen";
import History from "./pages/History";
import About from "./pages/About";
import Profile from "./pages/Profile";
import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";
import Layout from "./components/Layout/Layout";

export var userId = "";
export function setUserId(id) {
  userId = id;
}
export function getUserId() {
  return userId;
}
function App() {
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/users/profile`,
          {
            withCredentials: true,
          }
        );
        userId = res.data.id;
        console.log("User profile loaded:", res.data);
        localStorage.setItem("userId", userId);
      } catch (err) {
        console.error("User is not logged in:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          {/* Landing Page */}
          <Route path="/" element={<Dashboard />} />

          {/* SignUp & LogIn Pages */}
          <Route path="/signup" element={<SignUp />} />

          {/* Functional Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/fridge" element={<Fridge />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
