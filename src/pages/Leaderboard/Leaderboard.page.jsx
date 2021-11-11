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
  TextField,
  Button,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { getLeaderboard, searchLeaderboard } from "../../api/leaderboards";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "720px",
  },
  container: {
    width: "720px",
  },
  paper: {
    border: "none",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Leaderboard = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const perPage = 10;
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
  const [search, setSearch] = useState("");
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
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addSearch = async (e) => {
    setSearch(search);
    const { value } = e.target;
    await setSearch(value.trim());
  };

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
  return (
    <div>
      Leaderboard
      <br />
      <TextField
        id="search"
        label="Enter Username"
        name="search"
        variant="outlined"
        required
        // error={validateData.username}
        // helperText={validateData.usernameHelper}
        onChange={addSearch}
        style={{
          marginTop: "25px",
          width: "50%",
        }}
      />
      <Grid container style={{ marginTop: "18px" }} justifyContent="center">
        <Button variant="contained" onClick={searchUser}>
          Search
        </Button>
      </Grid>
      <Grid container style={{ marginTop: "64px" }} justifyContent="center">
        <Grid item style={{ width: "180px" }}>
          <Paper className={classes.paper}>{rank}</Paper>
        </Grid>
        <Grid item style={{ width: "180px" }}>
          <Paper className={classes.paper}>{username}</Paper>
        </Grid>
        <Grid item style={{ width: "180px" }}>
          <Paper className={classes.paper}>{score}</Paper>
        </Grid>
        <Grid item style={{ width: "180px" }}>
          <Paper className={classes.paper}>{questionsSolved}</Paper>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item style={{ width: "180px" }}>
          <Paper className={classes.paper}>Rank</Paper>
        </Grid>
        <Grid item style={{ width: "180px" }}>
          <Paper className={classes.paper}>Username</Paper>
        </Grid>
        <Grid item style={{ width: "180px" }}>
          <Paper className={classes.paper}>Score</Paper>
        </Grid>
        <Grid item style={{ width: "180px" }}>
          <Paper className={classes.paper}>Stars</Paper>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <TableContainer
          style={{ margin: "64px", width: "720px" }}
          component={Paper}
        >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "180px" }} align="center">
                  Rank
                </TableCell>
                <TableCell style={{ width: "180px" }} align="center">
                  Username
                </TableCell>
                <TableCell style={{ width: "180px" }} align="center">
                  Scores
                </TableCell>
                <TableCell style={{ width: "180px" }} align="center">
                  Stars
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard.map((leaderboards, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{leaderboards.rank}</TableCell>
                  <TableCell align="center">{leaderboards.username}</TableCell>
                  <TableCell align="center">{leaderboards.score}</TableCell>
                  <TableCell align="center">
                    {leaderboards.questionsSolved}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid container justifyContent="center">
        <Pagination
          count={count}
          color="primary"
          page={page}
          onChange={changePage}
        />
      </Grid>
    </div>
  );
};

export default Leaderboard;
