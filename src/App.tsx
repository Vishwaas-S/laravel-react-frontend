import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./Pages/User/User";
import "./app.css";
import AddUser from "./Pages/User/AddUser";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/user/add" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
