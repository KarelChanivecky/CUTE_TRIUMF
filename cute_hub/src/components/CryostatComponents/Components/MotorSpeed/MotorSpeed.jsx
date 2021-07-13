import React, { Component } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
  paperroot: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    "& div": {
      marginLeft: 8}
  },
  numbers: {
    fontSize: "20px"
  },
  letters: {
    fontSize: "10px"
  },
  labels: {
    fontSize: "15px",
    marginLeft: (-30)
  }
}));

export default function MotorSpeed(props) {
  const classes = useStyles();

  // the value which dictates what is presented in the motor speed component
  const [speeds, setSpeeds] = React.useState({a: 0, b: 0, c: 0});

  const MotorMessageReceive = (message)=>{
    //TODO FILL THIS IN WITH THE PROPER SWITCH CASE IN ORDER TO RECIEVE THE MESSAGES FOR THE MOTOR SPEEDS
    //break the message up into a switch (c) and a msg 

     var c = message.data.substr(0,1);
     var msg = message.data.substr(2);
     switch (c) {
  
         case 'E': { // digital readouts (time, 3 x pos, 3 x weight, pressure, water level) //water level isn't here
             var v = msg.split(' ').map(Number);
             //console.log(v); //TODO helps with debugging
             setSpeeds({
                 a: v[0].toFixed(1),
                 b: v[1].toFixed(1),
                 c: v[2].toFixed(1),
             });
             //var airPressure = v[0];
             //var airPressure = v.shift();
             //var loads = v.splice(0,3); //starting at position 0, remove 3 elements
         }
         break;
     }
  }
  
  // Function that adds and removes a listener to the websocket
  React.useEffect(()=>{
  props.cryostatWS.addEventListener('message', MotorMessageReceive, true);
  return () => props.cryostatWS.removeEventListener('message', MotorMessageReceive, true);
  }, []); 



  return (
    <div className={classes.paperroot}>
      <Grid container direction="column">
        <Grid item><Typography className={classes.labels}>Motor Speed</Typography></Grid>
        <Grid item container direction="row" alignContent="center">
          <Grid item xs={3}>
            <Typography className={classes.letters}>A</Typography>
          </Grid>
          <Grid item  xs={3}>
            <Typography className={classes.letters}>B</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.letters}>C</Typography>
          </Grid>
        </Grid>
        <Grid item container direction="row" alignContent="center">
          <Grid item xs={3}>
            <Typography className={classes.numbers}>{speeds.a}</Typography>
          </Grid>
          <Grid item  xs={3}>
            <Typography className={classes.numbers}>{speeds.b}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.numbers}>{speeds.c}</Typography>
          </Grid>
        </Grid>
    </Grid>
  </div>
  );
}
