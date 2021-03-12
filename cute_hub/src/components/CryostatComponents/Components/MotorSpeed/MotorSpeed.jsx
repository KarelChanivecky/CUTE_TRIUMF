import React, { Component } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
  paperroot: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    "& div": {
      marginLeft: 10}
  },
}));


export default function MotorSpeed(props) {
  const classes = useStyles();

  const [speeds, setSpeeds] = React.useState(props.speeds)

  return (
    <div className={classes.paperroot}>
    <Grid container direction="row" alignContent="center">
      <Grid item xs={3}>
        {speeds[0]}
      </Grid>
      <Grid item  xs={3}>
        {speeds[1]}
      </Grid>
      <Grid item xs={3}>
        {speeds[2]}
      </Grid>
    </Grid>
  </div>
  );
}
