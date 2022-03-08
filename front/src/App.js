import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./containers/header";
import HomePage from "./containers/homePage";
import Register from "./containers/users/register";
import Login from "./containers/users/login";
import AddSpot from "./containers/spot/addSpot";
import { useDispatch } from "react-redux";
import iaxios from "./utils/iaxios";
import UserProvider from "./contexts/user";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem("user_token");

    if (token) {
      const getMe = async () => {
        let data;
        try {
          const res = await iaxios.get("/auth/user/me", {
            headers: {
              "x-access-token": token,
            },
          });
          data = res.data;
        } catch (err) {
          window.location.href = "/login";
        }

        dispatch({
          type: "LOGGED_IN_USER",
          payload: data,
        });
      };

      getMe();
    }
  }, []);

  return (
    <div className="App">
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addSpot" element={<AddSpot />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
