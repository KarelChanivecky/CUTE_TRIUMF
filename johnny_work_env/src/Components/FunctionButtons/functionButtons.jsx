import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import FButton from "./FButtons";

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
    <Grid container spacing={2}>
      {props.commands.map((c) => (
        <Grid item xs={6}>
          <FButton command={c.command} name={c.name} />
        </Grid>
      ))}
    </Grid>
  );
}
