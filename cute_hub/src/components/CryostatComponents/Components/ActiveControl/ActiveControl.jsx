import React, { Component } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";

export default function FunctionButtons(props) {
  return (
    <Grid container direction="row" spacing={2} justify="space-around">
      <Grid item xs={7}>
        <Typography style={{marginTop: 7}}>Active Control:</Typography>
      </Grid>
      <Grid item xs={3}>
        <Switch />
      </Grid>
    </Grid>
  );
}
