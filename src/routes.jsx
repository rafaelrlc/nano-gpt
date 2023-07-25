import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import DatasetPage from "./pages/DatasetPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={"*"}
        element={<Navigate to={"/chat/new"}></Navigate>}
      ></Route>
      <Route
        path={"/"}
        element={<Navigate to={"/chat/new"}></Navigate>}
      ></Route>
      <Route path={"/chat/new"} element={<Home newPage={true}></Home>}></Route>
      <Route path={"/chat/:id"} element={<Home></Home>}></Route>

      <Route path={"/dataset"} element={<DatasetPage></DatasetPage>}></Route>

      {/* <Route
        path={"/login"}
        element={<LoginPage type={"login"}></LoginPage>}
      ></Route>
      <Route
        path={"/create"}
        element={<LoginPage type={"register"}></LoginPage>}
      ></Route> */}
    </Routes>
  );
};

export default AppRoutes;
