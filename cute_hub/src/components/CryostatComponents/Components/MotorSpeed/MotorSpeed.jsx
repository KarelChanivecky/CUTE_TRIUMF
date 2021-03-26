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
      marginLeft: 10}
  },
  numbers: {
    fontSize: "30px"
  }
}));

export default function MotorSpeed(props) {
  const classes = useStyles();

  const [speeds, setSpeeds] = React.useState(props.speeds)
  const MotorMessageReceive = (message)=>{
    setSpeeds([5, 5, 5]);
    //break the message up into a switch (c) and a msg 
  
  
    // var c = message.data.substr(0,1);
    // var msg = message.data.substr(2);
    // switch (c) {
  
    //     case 'F': { // digital readouts (time, 3 x pos, 3 x weight, pressure, water level) //water level isn't here
    //         var v = msg.split(' ').map(Number);
    //         //console.log(v);
    //         var t = v.shift(); //removes first element of the array (time is not very useful)
    //         //var pos = v.splice(0,3); //starting at position 0, remove 3 elements
    //         setDamperPositions({
    //             a: v[0].toFixed(2),
    //             b: v[1].toFixed(2),
    //             c: v[2].toFixed(2),
    //         });
    //         //var airPressure = v[0];
    //         //var airPressure = v.shift();
    //         //var loads = v.splice(0,3); //starting at position 0, remove 3 elements
    //     }
    //     // proves that this is successfully communicates with server when it recieves a message.
    //     // default : {
    //     //   setDamperPositions({
    //     //     a: 1,
    //     //     b: 1,
    //     //     c: 1
    //     // });
    //     // } 
    //     break;
    // }
  }
  
  // Reset the values every second to display the current value.
  //TODO I'm going to change this function, but I'll just comment it out for now
  React.useEffect(()=>{
  props.cryostatWS.addEventListener('message', MotorMessageReceive, true);
  return () => props.cryostatWS.removeEventListener('message', MotorMessageReceive, true);
  }, []); //TODO put an empty brack there



  return (
    <div className={classes.paperroot}>
    <Grid container direction="row" alignContent="center">
      <Grid item xs={3}>
      <Typography className={classes.numbers}>{speeds[0]}</Typography>
      </Grid>
      <Grid item  xs={3}>
      <Typography className={classes.numbers}>{speeds[1]}</Typography>
      </Grid>
      <Grid item xs={3}>
      <Typography className={classes.numbers}>{speeds[2]}</Typography>
      </Grid>
    </Grid>
  </div>
  );
}
