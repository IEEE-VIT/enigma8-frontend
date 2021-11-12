import React, { useState } from "react";
import Joyride from "react-joyride";
// , { ACTIONS, EVENTS, STATUS }
import Rooms from "../Rooms/Rooms.page";
// import { JoyrideContext } from "../../contexts/Joyride.context";
import Consumer from "../../contexts/Joyride.context";

const Onboarding = () => {
  // const [data, setData] = useState({ run: true, isRoom: false, stepIndex: 0 });
  const [run, setRun] = useState(true);
  // const [stepIndex, setStepIndex] = useState(0);
  const [steps, setSteps] = useState([
    {
      target: ".onboarding-pointer-leaderboard",
      content: "Click leaderboard to check your position in the game ",
      disableOverlayClose: true,
      disableBeacon: true,
      hideCloseButton: true, // X button
    },
    {
      target: ".onboarding-pointer-profile",
      content: "Click on profile to check your progress",
      disableOverlayClose: true,
      hideCloseButton: true,
    },
    {
      target: ".onboarding-pointer-notif",
      content: "Keep checking the notifications to get the lastest updates",
      disableOverlayClose: true,
      hideCloseButton: true,
    },
    {
      target: ".onboarding-pointer-stars",
      content:
        "Keep checking here to know how many stars you need to go to the next room.",
      disableOverlayClose: true,
      hideCloseButton: true,
    },
    {
      target: ".roomno-1",
      content: "Now the fun part, to enter a room click here",
      spotlightClicks: true,
      disableBeacon: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: true,
    },
    // {
    //   target: ".powerup-0",
    //   content:
    //     "Woohoo, Power Ups. Here you can check out the various kinds of Power Ups avaliable. But beware, you only get one power up for each room and it can be used only once!",
    //   spotlightClicks: true,
    //   disableBeacon: true,
    //   disableOverlayClose: true,
    //   hideCloseButton: true,
    // },
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

  // const handleJoyrideCallback = (data, context) => {
  //   const { switchJoyride } = context;

  //   const { action, index, status, type } = data;
  //   if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
  //     // Update state to advance the tour
  //     setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
  //     console.log("tour advanced", index);
  //   } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
  //     // Need to set our running state to false, so we can restart if we click start again.
  //     setRun(false);
  //     switchJoyride(true, 0);
  //   }
  //   console.groupCollapsed(type);
  //   console.log(data);
  //   console.groupEnd();
  // };
  // const here = (context, value) => {
  //   const { switchJoyride } = context;
  //   // console.log(switchJoyride());
  //   switchJoyride(value);
  // };
  console.log(setSteps, setRun);
  console.log("from onboarding run:", run);
  return (
    <Consumer>
      {(context) => {
        return (
          <div>
            {setRun(context.run)}
            <h3>Onboarding</h3>
            <Rooms />
            <Joyride
              run={context.run}
              steps={steps}
              // stepIndex={stepIndex}
              continuous // next instead of close
              // callback={handleJoyrideCallback(context)}
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
