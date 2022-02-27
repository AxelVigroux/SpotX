import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./containers/header";
import HomePage from "./containers/homePage";
import Register from "./containers/users/register";
import Login from "./containers/users/login";
import AddSpot from "./containers/spot/addSpot";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addSpot" element={<AddSpot />} />
      </Routes>
    </div>
  );
}

export default App;
