import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Profile from "../pages/logged/Profile";

const LoggedRoutes = () => {
  return (
    <Routes>
      <Route exact path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate replace to="/profile" />}></Route>
    </Routes>
  );
};

export default LoggedRoutes;
