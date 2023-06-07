import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

const UnloggedRoutes = () => {
  return (
    <Routes>
      <Route exact path="auth/signin" element={<SignIn />}></Route>
      <Route exact path="auth/signup" element={<SignUp />}></Route>
      <Route exact path="auth/forgot" element={<ForgotPassword />}></Route>
      <Route
        exact
        path="auth/resetpassword"
        element={<ResetPassword />}
      ></Route>
      <Route path="*" element={<Navigate replace to="auth/signin" />}></Route>
    </Routes>
  );
};

export default UnloggedRoutes;
