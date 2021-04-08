import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import FButton from "./FButtons";




export default function FunctionButtons(props) {
  
  function formatButtons(c, index) {
    if(index == props.commands.length - 1){
      return (<Grid container><Grid key={c.name} item xs={5}>
                <FButton command={c.command} name={c.name} onclick={props.onclick} />
              </Grid> <Grid xs={5}></Grid></Grid>)
    } else {
      return (<Grid key={c.name} item xs={5}>
      <FButton command={c.command} name={c.name} onclick={props.onclick}/>
    </Grid>)
    }
  } 
  return (
    <Grid container spacing={2} justify="center" alignContent="center">
      {props.commands.map((c, index) => (
        <Grid key={c.name} item xs={5}>
          <FButton command={c.command} name={c.name} onclick={props.onclick}/>
        </Grid>
    ))}
    </Grid>
  );
}
