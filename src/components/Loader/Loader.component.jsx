import React from "react";
import LoaderGIF from "../../assets/loader.gif";

const Loader = () => {
  return (
    <div className="loader">
      <img src={LoaderGIF} alt="" />
    </div>
  );
};

export default Loader;
