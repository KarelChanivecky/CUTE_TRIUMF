import React, { Component } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Slider from "@material-ui/core/Slider";
const useStyles = makeStyles((theme) => ({
  paperroot: {
    height: "75%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    "& span": {
      marginTop: 30,
    },
  },
}));

export default function MotorSpeed(props) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={4}>
        Motor Speed:
      </Grid>
      <Grid item xs={3}>
        X
      </Grid>
      <Grid item xs={3}>
        X
      </Grid>
      <Grid item xs={2}>
        X
      </Grid>
    </Grid>
  );
}
