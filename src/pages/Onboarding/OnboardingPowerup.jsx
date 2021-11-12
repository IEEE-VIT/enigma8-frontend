import React, { useState } from "react";
import Joyride from "react-joyride";
import Rooms from "../Rooms/Rooms.page";
// import { JoyrideContext } from "../../contexts/Joyride.context";
import Consumer from "../../contexts/Joyride.context";

const OnboardingPowerUp = () => {
  // const [data, setData] = useState({ run: true, isRoom: false, stepIndex: 0 });
  const [run, setRun] = useState(true);
  // const [stepIndex, setStepIndex] = useState(0);
  const [steps, setSteps] = useState([
    {
      target: ".powerup-0",
      content:
        "Woohoo, Power Ups. Here you can check out the various kinds of Power Ups avaliable. But beware, you only get one power up for each room and it can be used only once!",
      spotlightClicks: true,
      disableBeacon: true,
      disableOverlayClose: true,
      hideCloseButton: true,
    },
    // {
    //   target: "onboarding-pointer-question",
    //   content:
    //     "Here you can see the question hehe they are fun (if you can solve them)",
    // },
    // {
    //   target: "onboarding-pointer-hint",
    //   content:
    //     "Press the hint button to get hint and submit button to, here it comes, submit the answer",
    // },
  ]);
  console.log(setSteps, setRun);
  console.log("from onboarding run:", run);
  return (
    <Consumer>
      {(context) => {
        return (
          <div>
            {context.switchJoyride(true)}
            {setRun(context.run)}
            {console.log(context.run)}
            <h3>Onboarding</h3>
            <Rooms />
            <Joyride
              run={context.run}
              steps={steps}
              // stepIndex={stepIndex}
              continuous // next instead of close
              // run={run}
              // scrollToFirstStep
              // showProgress
              // showSkipButton
            />
          </div>
        );
      }}
    </Consumer>
  );
};
export default Onboarding;
