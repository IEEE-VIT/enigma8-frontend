import React from "react";
import "./Login.styles.css";
import { Switch, Route } from "react-router-dom";

import LoginPortal from "../../components/LoginPortal/LoginPortal.component";
import Welcome from "../../components/Welcome/Welcome.component";

const LoginPage = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={LoginPortal} />
        {/* BUG: This route is not working as expected. Displays an empty page, even though route changes correctly in URL. Similar case: Arena.page routes */}
        <Route exact path="/welcome" component={Welcome} />
      </Switch>
    </div>
  );
};

export default LoginPage;
