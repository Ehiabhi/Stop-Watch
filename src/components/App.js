import React from "react";
import Stopwatch from "./Stopwatch";
import Clock from "./Clock";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Clock />
      <Stopwatch />
    </div>
  );
}
