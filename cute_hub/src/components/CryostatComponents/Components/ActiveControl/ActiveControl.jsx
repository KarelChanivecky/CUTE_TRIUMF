import React, { Component } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";

export default function FunctionButtons(props) {
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
