import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { timer } from "../../api/timer";

const GameRoute = ({ navbar, page }) => {
  const getRemTime = () => {
    timer()
      .then(async (res) => {
        if (await !res.data.data.enigmaStarted) {
          window.location.href = "/countdown";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(getRemTime, []);
  return (
    <>
      {navbar()} {page()}
    </>
  );
};

GameRoute.propTypes = {
  navbar: PropTypes.elementType.isRequired,
  page: PropTypes.elementType.isRequired,
};

export default GameRoute;
