import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = ({ title, body }) => {
  const hideNotif = title === "";
  useEffect(() => {
    if (!hideNotif) {
      toast.info(<Display />);
    }
    function Display() {
      return (
        <div>
          <h4>{title}</h4>
          <p>{body}</p>
        </div>
      );
    }
  }, [hideNotif, title, body]);

  return (
    <div>
      <ToastContainer
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
};

Toast.defaultProps = {
  title: "This is title",
  body: "Some body",
};

Toast.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

export default Toast;
