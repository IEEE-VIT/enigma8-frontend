import React, { useState, useEffect } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  InputBase,
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import Pagination from "@material-ui/lab/Pagination";
import TimerComponent from "../../components/TimerCard/TimerCard.component";
import { getLeaderboard, searchLeaderboard } from "../../api/leaderboards";
import { timer } from "../../api/timer";
import "./Leaderboard.styles.css";
import Loader from "../../components/Loader/Loader.component";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "1000px",
    backgroundColor: "black",
    "& .MuiTableCell-root": {
      border: "1px solid #363636",
      borderLeftColor: "#0FA3B1",
      borderRightColor: "#0FA3B1",
    },
    "& .MuiTable-root": {
      border: "1px solid #0FA3B1",
    },
    "& .MuiTableCell-head": {
      border: "1px solid #0FA3B1",
    },
  },
  tableCell: {
    color: "#d08123",
  },
  tableCellUser: {
    backgroundColor: "#D08123",
    color: "#000000",
    fontWeight: "500",
  },
  container: {
    width: "1000px",
  },
  paper: {
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "middle",
    padding: "1% 98px 0 98px",
    backgroundColor: "black",
    fontFamily: "Mulish",
    color: theme.palette.primary.main,
    "& .MuiFormLabel-root": {
      color: "#d08123",
    },
    "& .MuiPaper-root": {
      backgroundColor: "black",
    },
    "& .MuiInputLabel-root": {
      // color: "white",
    },
    "& .MuiInputBase-input": {
      color: "#d08123",
    },
    "& .MuiFormHelperText-root": {
      // background: "red",
      // WebkitBackgroundClip: "text",
      // WebkitTextFillColor: "transparent",
      color: "red",
    },
    "& label.Mui-focused": {
      // color: "white",
    },
    "& .PrivateSwitchBase-input": {
      // color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#D08123",
      },
      "&:hover fieldset": {
        borderColor: "#FFD37C",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#D08123",
      },
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.main,
    },
    "& .MuiSelect-select:not([multiple]) option": {
      backgroundColor: "black",
    },
  },
  leaderboard: {
    color: "#D08123",
    fontFamily: "Cinzel",
    fontSize: "36px",
    fontWeight: "bold",
  },
  countdownTime: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  countdownTimeText: {
    fontSize: "14px",
    fontWeight: "400",
    margin: "4.97px auto",
    textAlign: "center",
    fontFamily: "Mulish",
    // background: "-webkit-linear-gradient(#FFD37C, #D08123)",
    // WebkitBackgroundClip: "text",
    // WebkitTextFillColor: "transparent",
    color: "#d08123",
  },
  countdownTimeHeader: {
    fontSize: "32px",
    fontWeight: "700",
    margin: "60px 18px",
    textAlign: "center",
    fontFamily: "Cinzel Decorative",
    // background: "-webkit-linear-gradient(#FFD37C, #D08123)",
    // WebkitBackgroundClip: "text",
    // WebkitTextFillColor: "transparent",
    color: "#d08123",
    [theme.breakpoints.down("sm")]: {
      fontSize: "24px",
    },
  },
  search: {
    position: "relative",
    // borderRadius: theme.shape.borderRadius,
    border: "2px solid #D08123",
    borderRadius: "15px",
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    // "&:hover": {
    //   backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "322px",
    height: "38px",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  pagination: {
    "& .MuiPaginationItem-page": {
      color: "#D08123",
    },
    "& .MuiPaginationItem-outlinedPrimary .Mui-selected": {
      border: "#D08123",
      backgroundColor: "none",
    },
  },
}));

const Leaderboard = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const perPage = 9;
  const [leaderboard, setLeaderboard] = useState([
    {
      rank: 1,
      username: "",
      score: 0,
      questionsSolved: 0,
    },
  ]);
  const [rank, setRank] = useState(1);
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const [questionsSolved, setQuestionsSolved] = useState(0);
  const [remTime, setRemTime] = useState(0);
  const [hoursRight, setHoursRight] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesRight, setMinutesRight] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsRight, setSecondsRight] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const getRemTime = () => {
    timer()
      .then(async (res) => {
        setRemTime(res.data.data.date);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const renderTime = () => {
    let tempMinutes = Math.floor(remTime / 60);
    const tempSeconds = remTime % 60;
    const tempHours = Math.floor(tempMinutes / 60);
    tempMinutes %= 60;
    setHoursRight(tempHours % 10);
    setHoursLeft(Math.floor(tempHours / 10) % 10);
    setMinutesRight(tempMinutes % 10);
    setMinutesLeft(Math.floor(tempMinutes / 10) % 10);
    setSecondsRight(tempSeconds % 10);
    setSecondsLeft(Math.floor(tempSeconds / 10) % 10);
  };

  const decrementTime = () => {
    setRemTime(remTime - 1);
  };

  const updateRemTime = () => {
    renderTime();
    if (remTime !== 0) {
      setTimeout(decrementTime, 1000);
    } else if (remTime === 0) {
      getRemTime();
    }
  };
  useEffect(getRemTime, []);
  useEffect(() => {
    getLeaderboard(page, perPage)
      .then((res) => {
        setLeaderboard(res.data.data.leaderboard);
        setCount(res.data.data.totalPage);
        setRank(res.data.data.userRank.rank);
        setUsername(res.data.data.userRank.username);
        setScore(res.data.data.userRank.score);
        setQuestionsSolved(res.data.data.userRank.questionsSolved);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  useEffect(updateRemTime, [remTime]);
  const searchUser = async () => {
    if (search !== "") {
      await searchLeaderboard(page, search, perPage)
        .then((res) => {
          setLeaderboard(res.data.data.leaderboard);
          setCount(res.data.data.totalPage);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getLeaderboard(page, perPage)
        .then((res) => {
          setLeaderboard(res.data.data.leaderboard);
          setCount(res.data.data.totalPage);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addSearch = async (e) => {
    const { value } = e.target;
    await setSearch(value.trim());
    if (value.trim() === "") {
      searchUser();
    }
  };
  const onEnter = (e) => {
    if (e.key === "Enter") {
      searchUser();
    }
  };

  const changePage = async (event, val) => {
    setPage(val);
    if (search === "") {
      getLeaderboard(val, perPage)
        .then((res) => {
          setLeaderboard(res.data.data.leaderboard);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      searchLeaderboard(val, search, perPage)
        .then((res) => {
          setLeaderboard(res.data.data.leaderboard);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="leaderboard-container">
      <Grid container className={classes.leaderboard} justifyContent="center">
        <div style={{ marginTop: "48px" }}>Leaderboard</div>
      </Grid>
      <br />
      <Grid
        container
        className={`${classes.paper}`}
        style={{ justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Username"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={addSearch}
              onKeyDown={onEnter}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div
            className={`countdown-page-days-text ${classes.countdownTimeText}`}
          >
            Press Enter to Search
          </div>
        </div>
        <div>
          <div className="countdown-page-container">
            <div
              className={`${classes.countdownPageHours} countdown-time-container`}
            >
              <div className={`${classes.countdownTime}`}>
                <TimerComponent size="small" number={hoursLeft} />
                <TimerComponent size="small" number={hoursRight} />
              </div>
              <div
                className={`countdown-page-days-text ${classes.countdownTimeText}`}
              >
                Hours
              </div>
            </div>
            <div
              className={`${classes.countdownPageMinutes} countdown-time-container`}
            >
              <div className={`${classes.countdownTime}`}>
                <TimerComponent size="small" number={minutesLeft} />
                <TimerComponent size="small" number={minutesRight} />
              </div>
              <div
                className={`countdown-page-days-text ${classes.countdownTimeText}`}
              >
                Minutes
              </div>
            </div>
            <div
              className={`${classes.countdownPageSeconds} countdown-time-container`}
            >
              <div className={`${classes.countdownTime}`}>
                <TimerComponent size="small" number={secondsLeft} />
                <TimerComponent size="small" number={secondsRight} />
              </div>
              <div
                className={`countdown-page-days-text ${classes.countdownTimeText}`}
              >
                Seconds
              </div>
            </div>
          </div>
        </div>
      </Grid>
      <Grid container style={{ marginTop: "26px" }} justifyContent="center">
        <div className="user-status-container">
          <div className="user-status-details">
            <div className="user-status-details-text-container">
              <div className="user-status-details-text-bold">{rank}</div>
              <div className="user-status-details-text">Rank</div>
            </div>
            <div className="user-status-details-text-container">
              <div className="user-status-details-text-bold">{username}</div>
              <div className="user-status-details-text">Username</div>
            </div>
            <div className="user-status-details-text-container">
              <div className="user-status-details-text-bold">{score}</div>
              <div className="user-status-details-text">Score</div>
            </div>
            <div className="user-status-details-text-container">
              <div className="user-status-details-text-bold">
                {questionsSolved}
              </div>
              <div className="user-status-details-text">Questions Solved</div>
            </div>
          </div>
        </div>
        <br />
      </Grid>
      <Grid container justifyContent="center">
        <TableContainer
          style={{
            margin: "24px",
            width: "1000px",
            borderBottom: "1px solid #0FA3B1",
          }}
          component={Paper}
        >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  className={classes.tableCell}
                  style={{ width: "200px" }}
                  align="center"
                >
                  Rank
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  style={{ width: "200px" }}
                  align="center"
                >
                  Username
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  style={{ width: "200px" }}
                  align="center"
                >
                  Scores
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  style={{ width: "200px" }}
                  align="center"
                >
                  Keys
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard.map((leaderboards, index) => (
                <TableRow key={index}>
                  <TableCell className={classes.tableCell} align="center">
                    {leaderboards.rank}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    {leaderboards.username}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    {leaderboards.score}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    {leaderboards.questionsSolved}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className={classes.tableCellUser} align="center">
                  {rank}
                </TableCell>
                <TableCell className={classes.tableCellUser} align="center">
                  {username} (You)
                </TableCell>
                <TableCell className={classes.tableCellUser} align="center">
                  {score}
                </TableCell>
                <TableCell className={classes.tableCellUser} align="center">
                  {questionsSolved}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid container justifyContent="center">
        <div className={classes.pagination} style={{ marginBottom: "32px" }}>
          <Pagination
            count={count}
            variant="outlined"
            color="primary"
            page={page}
            onChange={changePage}
          />
        </div>
      </Grid>
    </div>
  );
};

export default Leaderboard;
