import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "./App.css";

import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

import ProtectedRoute from "./components/ProtectedRoute.component";
import TokenProtectedRoute from "./components/TokenProtectedRoute.component";

import Container from "./components/Container/Container.component";
import PreloginNavbar from "./components/PreloginNavbar/PreloginNavbar.component";
// import GameRoute from "./components/GameRoute/GameRoute.component";
import PreEnigmaNavbar from "./components/PreEnigmaNavbar/PreEnigmaNavbar.component";
import PostloginNavbar from "./components/PostloginNavbar/PostloginNavbar.component";
import DownloadApps from "./pages/DownloadApps/DownloadApps.pages";
import Home from "./pages/Home/Home.page";
import FAQ from "./pages/FAQ/faq.page";
import Sponsors from "./pages/Sponsors/Sponsors.page";
import Story from "./pages/Story/Story.page";
import Welcome from "./pages/Welcome/Welcome.component";

import Countdown from "./pages/Countdown/Countdown.page";
import DemoQuestion from "./pages/DemoQuestion/DemoQuestion.page";

import Rooms from "./pages/Rooms/Rooms.page";
import Leaderboard from "./pages/Leaderboard/Leaderboard.page";
import Profile from "./pages/Profile/Profile.pages";
import Question from "./pages/Question/Question.page";

import PushNotifs from "./pages/PushNotifs/PushNotifs.page";

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
  const history = useHistory();
  const [showMobile, setShowMobile] = useState(false);
  const [, setWindowWidth] = useState(0);
  console.log(showMobile);
  const isMobile = (width) => {
    if (width < 700) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    setShowMobile(isMobile(window.innerWidth));
    window.addEventListener("resize", (x) => {
      if (x.currentTarget.innerWidth < 500) {
        history.push("/download");
      } else {
        history.push("/countdown");
      }
      setWindowWidth(x.currentTarget.innerWidth);
      setShowMobile(isMobile(x.currentTarget.innerWidth));
    });
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/download" component={DownloadApps} />
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
            // redirect="/"
            exact
            path="/welcome"
            component={Welcome}
          />
          <ProtectedRoute
            // redirect="/"
            exact
            path="/countdown"
            component={() => (
              <Container navbar={PreEnigmaNavbar} page={Countdown} />
            )}
          />
          <ProtectedRoute
            // redirect="/"
            exact
            path="/demoquestion"
            component={() => (
              <Container navbar={PreEnigmaNavbar} page={DemoQuestion} />
            )}
          />
          <ProtectedRoute
            redirect="/"
            exact
            path="/rooms"
            component={() => (
              <Container navbar={PostloginNavbar} page={Rooms} />
            )}
          />
          <ProtectedRoute
            // redirect="/"
            exact
            path="/leaderboard"
            component={() => (
              <Container navbar={PostloginNavbar} page={Leaderboard} />
            )}
          />
          <ProtectedRoute
            // redirect="/"
            exact
            path="/profile"
            component={() => (
              <Container navbar={PostloginNavbar} page={Profile} />
            )}
          />
          <ProtectedRoute
            // redirect="/"
            exact
            path="/story"
            component={() => (
              <Container navbar={PostloginNavbar} page={Story} />
            )}
          />
          <ProtectedRoute
            // redirect="/"
            exact
            path="/question"
            component={() => (
              <Container navbar={PostloginNavbar} page={Question} />
            )}
          />
          <Route
            exact
            path="/googlesuccessfulAuth"
            component={SuccessfulAuth}
          />
          {/* <ProtectedRoute
            // redirect="/"
            component={() => (
              <Container navbar={PreEnigmaNavbar} page={Countdown} />
            )}
          /> */}
        </Switch>
        <PushNotifs />
      </ThemeProvider>
    </div>
  );
}

export default App;
