import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import FButton from "./FButtons";



// The component which the function buttons are put together 
export default function FunctionButtons(props) {
  
  return (
    <Grid container spacing={2} justify="center" alignContent="center">
      {props.commands.map((c) => (
        <Grid key={c.name} item xs={5}>
          <FButton command={c.command} name={c.name} onclick={props.onclick}/>
        </Grid>
    ))}
    </Grid>
  );
}
