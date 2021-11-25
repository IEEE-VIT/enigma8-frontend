import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

const { Provider, Consumer } = createContext();

const JoyrideContext = (props) => {
  const { children } = props;
  const [run, setRun] = useState(true);
  // const [stepIndex, setStepIndex] = useState(0);
  const switchJoyride = (action) => {
    setRun(action);
    // setStepIndex(skip);
    console.log("run switched offf:", run);
  };
  return <Provider value={{ run, switchJoyride }}>{children}</Provider>;
};
JoyrideContext.propTypes = {
  children: PropTypes.element.isRequired,
};
export { JoyrideContext };
export default Consumer;
