import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

import ProtectedRoute from "./components/ProtectedRoute.component";
import TokenProtectedRoute from "./components/TokenProtectedRoute.component";

import Container from "./components/Container/Container.component";
import PreloginNavbar from "./components/PreloginNavbar/PreloginNavbar.component";
// import GameRoute from "./components/GameRoute/GameRoute.component";
import PreEnigmaNavbar from "./components/PreEnigmaNavbar/PreEnigmaNavbar.component";
// import PostloginNavbar from "./components/PostloginNavbar/PostloginNavbar.component";

import Home from "./pages/Home/Home.page";
import FAQ from "./pages/FAQ/faq.page";
import Sponsors from "./pages/Sponsors/Sponsors.page";

import Welcome from "./pages/Welcome/Welcome.component";

import Countdown from "./pages/Countdown/Countdown.page";
import MockQuestion from "./pages/MockQuestion/MockQuestion.page";

// import Rooms from "./pages/Rooms/Rooms.page";
// import Leaderboard from "./pages/Leaderboard/Leaderboard.page";
// import Profile from "./pages/Profile/Profile.component";
// import Instructions from "./components/Instructions/Instructions.page";
// import Question from "./pages/Question/Question.page";

// import PushNotifs from "./pages/PushNotifs/PushNotifs.page";

import SuccessfulAuth from "./components/SuccessfulAuth.component";

// import NotFound from "./pages/NotFound/NotFound.page";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffd37c",
      light: "#ffd37c",
      dark: "#D08123",
    },
    secondary: {
      main: "#0B0B0B ",
      dark: "#ffffff",
    },
    contrast: {
      main: "#0FA3B1",
      light: "#01C0CC",
      dark: "#037EC3",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/faq"
            component={() => <Container navbar={PreloginNavbar} page={FAQ} />}
          />
          <Route
            exact
            path="/sponsors"
            component={() => (
              <Container navbar={PreloginNavbar} page={Sponsors} />
            )}
          />
          <TokenProtectedRoute
            redirect="/"
            exact
            path="/welcome"
            component={Welcome}
          />
          <ProtectedRoute
            redirect="/"
            exact
            path="/countdown"
            component={() => (
              <Container navbar={PreEnigmaNavbar} page={Countdown} />
            )}
          />
          <ProtectedRoute
            redirect="/"
            exact
            path="/mockquestion"
            component={() => (
              <Container navbar={PreEnigmaNavbar} page={MockQuestion} />
            )}
          />
          {/* <ProtectedRoute
            redirect="/"
            exact
            path="/rooms"
            component={() => (
              <GameRoute navbar={PostloginNavbar} page={Rooms} />
            )}
          />
          <ProtectedRoute
            redirect="/"
            exact
            path="/instructions"
            component={() => (
              <Container navbar={PostloginNavbar} page={Instructions} />
            )}
          />
          <ProtectedRoute
            redirect="/"
            exact
            path="/leaderboard"
            component={() => (
              <GameRoute navbar={PostloginNavbar} page={Leaderboard} />
            )}
          />
          <ProtectedRoute
            redirect="/"
            exact
            path="/profile"
            component={() => (
              <GameRoute navbar={PostloginNavbar} page={Profile} />
            )}
          />
          <ProtectedRoute
            redirect="/"
            exact
            path="/question"
            component={() => (
              <GameRoute navbar={PostloginNavbar} page={Question} />
            )}
          /> */}
          <Route
            exact
            path="/googlesuccessfulAuth"
            component={SuccessfulAuth}
          />
          <ProtectedRoute
            redirect="/"
            component={() => (
              <Container navbar={PreEnigmaNavbar} page={Countdown} />
            )}
          />
        </Switch>
        {/* <PushNotifs /> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
