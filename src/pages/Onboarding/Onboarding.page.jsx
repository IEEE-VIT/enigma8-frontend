import React, { useState } from "react";
import Joyride from "react-joyride";
import Rooms from "../Rooms/Rooms.page";

const Onboarding = () => {
  const [steps, setSteps] = useState([
    {
      target: ".onboarding-pointer-leaderboard",
      content: "Click leaderboard to check your position in the game ",
    },
    {
      target: ".onboarding-pointer-profile",
      content: "Click on profile to check your progress",
    },
    {
      target: ".onboarding-pointer-notif",
      content: "Keep checking the notifications to get the lastest updates",
    },
    {
      target: ".onboarding-pointer-stars",
      content:
        "Keep checking here to know how many stars you need to go to the next room.",
    },
    {
      target: ".onboarding-pointer-rooms",
      content: "Now the fun part, to enter a room click here",
    },
    // {
    //   target: ".onboarding-pointer-powerup",
    //   content:
    //     "Woohoo, Power Ups. Here you can check out the various kinds of Power Ups avaliable. But beware, you only get one power up for each room and it can be used only once!",
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

  console.log(setSteps);
  return (
    <div>
      <h3>Onboarding</h3>
      <Rooms />
      <Joyride
        steps={steps}
        continuous // next instead of close
        // run={run}
        // scrollToFirstStep
        // showProgress
        // showSkipButton
      />
    </div>
  );
};

export default Onboarding;
