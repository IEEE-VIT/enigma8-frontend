import React from "react";
import "./Onboarding.styles.css";
import Avatar from "../../assets/onboarding/character.svg";

const onboardingSteps = [
  {
    target: ".onboarding-pointer-navbar",
    title: "navbar",
    content: (
      <div className="onboarding-container">
        <div className="onboarding-content">
          Click on Story to read about the Adventures of Jones and Ali. Check
          Instructions whenever you feel lost. To check your position, click on
          the Leaderboard and check your progress on the Profile tab
        </div>
        <img src={Avatar} alt="" className="onboarding-avatar" />
      </div>
    ),
    disableOverlayClose: true,
    disableBeacon: true,
    hideCloseButton: true, // X button
  },
];

export default onboardingSteps;
