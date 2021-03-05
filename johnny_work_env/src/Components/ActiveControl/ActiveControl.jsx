import React, { Component } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
const useStyles = makeStyles((theme) => ({
  rootGrid: {},
  papersliver: {
    maxWidth: 333,
    height: 50,
    backgroundColor: "grey",
  },
  paperroot: {
    padding: theme.spacing(2),
    height: 300,
    width: 200,
    backgroundColor: "darkgrey",
  },
  paperdiagram: {
    overflow: "auto",
    minWidth: 100,
    maxWidth: 200,
    maxHeight: 530,
    backgroundColor: "darkgrey",
  },
  paperitem: {
    marginBottom: 10,
    height: 50,
    backgroundColor: "grey",
  },
}));

export default function FunctionButtons(props) {
  const classes = useStyles();
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={9}>
        <Typography>Active Control:</Typography>
      </Grid>
      <Grid item xs={3}>
        <Switch />
      </Grid>
    </Grid>
  );
}
