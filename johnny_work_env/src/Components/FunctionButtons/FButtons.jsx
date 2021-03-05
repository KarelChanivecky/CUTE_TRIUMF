import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import React, { Component } from "react";

const useStyles = makeStyles((theme) => ({
  button: { width: "100%" },
}));

export default function FButton(props) {
  const classes = useStyles();
  return (
    <Button
      className={classes.button}
      variant="contained"
      color="primary"
      disableElevation
      onClick={function (e) {
        props.onclick(props.command);
      }}
    >
      {props.name}
    </Button>
  );
}
