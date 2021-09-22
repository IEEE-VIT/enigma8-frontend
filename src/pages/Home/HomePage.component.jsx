import React, { useEffect } from "react";
import { testRoute } from "../../api/auth";

const HomePage = () => {
  useEffect(() => {
    testRoute();
  }, []);
  return <div>Home</div>;
};

export default HomePage;
