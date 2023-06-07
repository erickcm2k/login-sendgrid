import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";
import UnloggedRoutes from "./routes/UnloggedRoutes";
import LoggedRoutes from "./routes/LoggedRoutes";
import MainNavigation from "./shared/components/MainNavigation";

const App = () => {
  const { auth, checkLoginToken } = useContext(AuthContext);

  useEffect(() => {
    checkLoginToken();
  }, [checkLoginToken]);

  let routes;

  if (!auth.logged) {
    routes = <UnloggedRoutes />;
  } else {
    routes = <LoggedRoutes />;
  }

  return (
    <Router>
      <MainNavigation />
      <main>{routes}</main>
    </Router>
  );
};

export default App;
