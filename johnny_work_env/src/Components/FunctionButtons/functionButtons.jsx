import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import FButton from "./FButtons";

export default function FunctionButtons(props) {
  return (
    <Grid container spacing={2}>
      {props.commands.map((c) => (
        <Grid item xs={6}>
          <FButton command={c.command} name={c.name} onclick={props.send} />
        </Grid>
      ))}
    </Grid>
  );
}
