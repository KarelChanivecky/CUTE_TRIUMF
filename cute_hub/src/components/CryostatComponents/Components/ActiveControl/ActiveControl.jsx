import React, { Component } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";

export default function ActiveControl(props) {
  return (
    <Grid container direction="row" spacing={2} justify="space-around">
      <Grid item xs={7}>
        <Typography style={{marginTop: 7}}>Active Control:</Typography>
      </Grid>
      <Grid item xs={3}>
        <Switch color='primary' onClick={function (e) {
          if(e.target.checked){
            props.onActive("/Active 1"); //Sends this to the server through CryostatComp
          } else{
            props.onActive("/Active 0");
          }}}/>
      </Grid>
    </Grid>
  );
}
