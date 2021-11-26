import * as React from "react";
import PropTypes from "prop-types";
import "./StoryMenu.styles.css";
import { Button, Menu, MenuItem, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dropdownBtn: {
    border: `2px solid ${theme.palette.primary.dark}`,
    color: theme.palette.contrast.main,
    backgroundColor: "#0B0B0B",
    borderRadius: "11px 11px 0px 0px",
    padding: "1% 3%",
  },
  svg: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
  },
  menuoptions: {
    color: theme.palette.primary.main,
    fontFamily: "Mulish",
    fontSize: "1.2rem",
    backgroundColor: "#0B0B0B",
  },
}));

const StoryMenu = ({ count, unlocked, triggerFunction, showRoom }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (id) => {
    setAnchorEl(null);
    if (typeof id === "number") triggerFunction(id);
  };
  const menuList = [...Array(count)].map((e, i) => {
    return (
      <MenuItem
        key={i}
        className={classes.menuoptions}
        onClick={() => handleClose(i + 1)}
        disabled={i + 1 > unlocked}
      >
        {`Room ${i + 1}`}
      </MenuItem>
    );
  });
  return (
    <div className="story-menu">
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={classes.dropdownBtn}
      >
        {`Room ${showRoom}`}
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
            transform: "translateX(-0%) translateY(16%)",
          },
        }}
      >
        {menuList}
      </Menu>
    </div>
  );
};

StoryMenu.propTypes = {
  count: PropTypes.number.isRequired,
  unlocked: PropTypes.number.isRequired,
  triggerFunction: PropTypes.func.isRequired,
  showRoom: PropTypes.number.isRequired,
};

export default StoryMenu;
