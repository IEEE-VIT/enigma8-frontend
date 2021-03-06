import * as React from "react";
import { useHistory } from "react-router-dom";
import "./ProfileMenu.styles.css";
import { Cookies } from "react-cookie";
import { Button, Menu, MenuItem, makeStyles } from "@material-ui/core";
import ProfileLogo from "../../../assets/navbar/profile.svg";
import viewProfile from "../../../assets/navbar/view-profile.svg";
import logoutIcon from "../../../assets/navbar/logout.svg";

const useStyles = makeStyles((theme) => ({
  button: {
    // border: `2px solid ${theme.palette.primary.dark}`,
  },
  svg: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
  },
  menuoptions: {
    color: theme.palette.primary.main,
    fontFamily: "Mulish",
    fontSize: "1.2rem",
  },
}));

const ProfileMenu = () => {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const cookies = new Cookies();
  const logout = () => {
    cookies.remove("token");
    cookies.remove("newUser");
    window.location.reload();
  };
  const handleClose = (id) => {
    setAnchorEl(null);
    if (id === 1) {
      history.push("/profile");
    } else if (id === 2) {
      logout();
    }
  };
  return (
    <div className="profile-menu">
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={classes.button}
      >
        <img
          src={ProfileLogo}
          alt=""
          className="prelogin-nav-item prelogin-nav-item-profile cursor-pointer"
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          style: {
            transform: "translateX(-0%) translateY(45%)",
            backgroundColor: "#000000",
          },
        }}
      >
        <MenuItem
          className={classes.menuoptions}
          onClick={() => handleClose(1)}
        >
          <img className="navbar-profile-menu" src={viewProfile} alt="" />
        </MenuItem>
        <MenuItem
          className={classes.menuoptions}
          onClick={() => handleClose(2)}
        >
          <img className="navbar-profile-menu" src={logoutIcon} alt="" />
        </MenuItem>
      </Menu>
    </div>
  );
};
export default ProfileMenu;
