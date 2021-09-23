import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import FButton from "./FButtons";
import FButtonField from "./FButtonField";
import FButtonDropField from "./FButtonDropField";



// The component which the function buttons are put together 
// NOTE: xs=10 makes the button take up basically the entire span, xs=5 will split two buttons into columns
export default function FunctionButtons(props) {
  
  return (
    <Grid container spacing={2} justify="center" alignContent="center">
      {props.fieldCommands.map((c) => (
          <Grid item xs={10}>
            <FButtonField command={c.command} fieldText={c.fieldText} buttonText={c.buttonText} onclick={props.onclick}/>
          </Grid>
    ))}
          <Grid item xs={10}>
            <FButtonDropField onclick={props.onclick}/>
          </Grid>

      {props.commands.map((c) => (
        <Grid key={c.name} item xs={10}>
          <FButton command={c.command} name={c.name} onclick={props.onclick}/>
        </Grid>
    ))}
    </Grid>
  );
}
