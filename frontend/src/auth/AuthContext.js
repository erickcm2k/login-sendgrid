import React, { createContext, useCallback, useState } from "react";
import Swal from "sweetalert2";
import { tokenFetch, noTokenFetch } from "../helpers/fetch";

export const AuthContext = createContext();

const initialState = {
  username: null,
  checking: true,
  logged: false,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const signIn = async (email, password) => {
    const resp = await noTokenFetch(
      "api/users/signin",
      { email, password },
      "POST"
    );

    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { user } = resp;
      localStorage.setItem("email", user.email);
      setAuth({
        username: user.username,
        checking: false,
        logged: true,
        email: user.email,
      });
    }

    return { ok: resp.ok, msg: resp.msg };
  };

  const register = async (username, email, password) => {
    const resp = await noTokenFetch(
      "api/users/signup",
      { username, email, password },
      "POST"
    );

    if (resp.ok) {
      localStorage.setItem("token", resp.token);

      const { user } = resp;
      localStorage.setItem("email", user.email);

      setAuth({
        username: user.username,
        checking: false,
        logged: true,
        email: user.email,
      });

      return true;
    }

    return resp.msg;
  };

  const checkLoginToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    // Si token no existe
    if (!token) {
      setAuth({
        username: null,
        checking: false,
        logged: false,
        email: null,
      });

      return false;
    }

    const resp = await tokenFetch("api/verify", { email }, "POST");

    if (!resp) {
      Swal.fire({ icon: "error", title: "No se ha podido iniciar sesión" });
    }

    if (resp.ok) {
      const { username, email } = resp;
      setAuth({
        username,
        checking: false,
        logged: true,
        email,
      });

      return true;
    } else {
      setAuth({
        username: null,
        checking: false,
        logged: false,
        email: null,
      });

      return false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      checking: false,
      logged: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        signIn,
        register,
        checkLoginToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
