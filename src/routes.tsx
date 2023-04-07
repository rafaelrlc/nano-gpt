import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"*"} element={<Navigate to={"/home"}></Navigate>}></Route>
      <Route path={"/"} element={<Navigate to={"/home"}></Navigate>}></Route>
      <Route path={"/home"} element={<Home></Home>}></Route>
      <Route
        path={"/login"}
        element={<LoginPage type={"login"}></LoginPage>}
      ></Route>
      <Route
        path={"/create"}
        element={<LoginPage type={"register"}></LoginPage>}
      ></Route>
    </Routes>
  );
};

export default AppRoutes;
