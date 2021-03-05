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

function valuetext(value) {
  return `${value}°C`;
}

export default function CryoGauge(props) {
  const classes = useStyles();
  return (
    <div className={classes.paperroot}>
      <span>
        <Slider
          defaultValue={1}
          orientation="vertical"
          step={0.1}
          marks
          min={0}
          max={2}
        />
      </span>
      <span>
        <Slider
          defaultValue={1}
          orientation="vertical"
          step={0.1}
          marks
          min={0}
          max={2}
        />
      </span>
      <span>
        <Slider
          defaultValue={1}
          orientation="vertical"
          step={0.1}
          marks
          min={0}
          max={2}
        />
      </span>
    </div>
  );
}
