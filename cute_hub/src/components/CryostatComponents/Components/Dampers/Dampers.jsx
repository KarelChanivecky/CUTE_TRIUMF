import React, { Component } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
  paperroot: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    "& div": {
      marginLeft: 11}
  },
  numbers: {
    fontSize: "20px"
  },
  letters: {
    fontSize: "10px"
  },
  labels: {
    fontSize: "15px",
    marginLeft: (-40)
  }
}));

export default function Dampers(props) {
  const classes = useStyles();

  // the value which dictates what is presented in the motor speed component
  const [damperValue, setDamperValue] = React.useState({a: 0, b: 0, c: 0});
  
  const DamperMessageReceive = (message)=>{
    //TODO Im not sure if the name Damper is right for this component so that may need to be change
    //TODO FILL THIS IN WITH THE PROPER SWITCH CASE IN ORDER TO RECIEVE THE MESSAGES FOR THE DAMPERS
    //break the message up into a switch (c) and a msg  
  
    // var c = message.data.substr(0,1);
    // var msg = message.data.substr(2);
    // switch (c) {
  
    //     case 'F': { // digital readouts (time, 3 x pos, 3 x weight, pressure, water level) //water level isn't here
    //         var v = msg.split(' ').map(Number);
    //         //console.log(v);
    //         var t = v.shift(); //removes first element of the array (time is not very useful)
    //         //var pos = v.splice(0,3); //starting at position 0, remove 3 elements
    //         setDamperValue({
    //             a: v[0].toFixed(2),
    //             b: v[1].toFixed(2),
    //             c: v[2].toFixed(2),
    //         });
    //         //var airPressure = v[0];
    //         //var airPressure = v.shift();
    //         //var loads = v.splice(0,3); //starting at position 0, remove 3 elements
    //     }
    //     // proves that this is successfully communicates with server when it recieves a message.
    //     break;
    // }
  }
  
  // Function that adds and removes a listener to the websocket
  React.useEffect(()=>{
  props.cryostatWS.addEventListener('message', DamperMessageReceive, true);
  return () => props.cryostatWS.removeEventListener('message', DamperMessageReceive, true);
  }, []);


  return (
    <div className={classes.paperroot}>
      <Grid container direction="column">
        <Grid item><Typography className={classes.labels}>Dampers</Typography></Grid>
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
            <Typography className={classes.numbers}>{damperValue.a}</Typography>
          </Grid>
          <Grid item  xs={3}>
            <Typography className={classes.numbers}>{damperValue.b}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.numbers}>{damperValue.c}</Typography>
          </Grid>
        </Grid>
    </Grid>
  </div>
  );
}
