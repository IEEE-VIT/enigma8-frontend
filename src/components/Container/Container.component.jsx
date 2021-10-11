import React from "react";
import PropTypes from "prop-types";

const Container = ({ navbar, page }) => {
  console.log("container exe");
  return (
    <>
      {navbar()}
      {page()}
    </>
  );
};

Container.propTypes = {
  navbar: PropTypes.elementType.isRequired,
  page: PropTypes.elementType.isRequired,
};

export default Container;
