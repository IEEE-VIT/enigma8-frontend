import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";
import PreloginNavbar from "../../components/PreloginNavbar/PreloginNavbar.component";

const Countdown = () => {
  const history = useHistory();
  const [is420, setIs420] = useState(true);
  const handleonClick = () => {
    history.push("/arena");
    setIs420(false);
  };
  const ContinueBtn = (
    <button type="button" onClick={handleonClick}>
      CONTINUE
    </button>
  );

  const Timer = () => {
    return (
      <div>
        <PreloginNavbar />
        {/* Add <Timer-dial/> here */}
        Add Timer-dial here
        <div> {is420 ? ContinueBtn : ""} </div>
      </div>
    );
  };
  return (
    <div>
      <Route exact path="/countdown" component={Timer} />
    </div>
  );
};

export default Countdown;
