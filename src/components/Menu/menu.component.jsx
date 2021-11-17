import * as React from "react";
import { useHistory } from "react-router-dom";
import "./menu.styles.css";
import { Button, Menu, MenuItem, SvgIcon, makeStyles } from "@material-ui/core";
import { MenuOpen } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  button: {
    border: `2px solid ${theme.palette.primary.dark}`,
  },
  svg: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
  },
}));

const HamMenu = () => {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (id) => {
    setAnchorEl(null);
    if (id === 1) {
      history.push("/");
    } else if (id === 2) {
      history.push("/sponsors");
    } else if (id === 3) {
      history.push("/faq");
    }
  };
  return (
    <div className="ham-menu">
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={classes.button}
      >
        <SvgIcon component={MenuOpen} className={classes.svg} />
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
            transform: "translateX(-0%) translateY(32%)",
          },
        }}
      >
        <MenuItem onClick={() => handleClose(1)}>Home</MenuItem>
        <MenuItem onClick={() => handleClose(2)}>Sponsors</MenuItem>
        <MenuItem onClick={() => handleClose(3)}>FAQ</MenuItem>
      </Menu>
    </div>
  );
};
export default HamMenu;
