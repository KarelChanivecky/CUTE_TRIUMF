import React, { Component } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";

export default function ActiveControl(props) {

  const [activeState, setActiveState] = React.useState(false);

  //function used to relay message when recieved from dummy websocket
  const relay = (event) => {
    //TODO add code to parse incoming messages that are supposed to be displayed in the console
    //TODO uncomment the bit of code below this when your ready to log messages
    //LogMsg(event.data);
    //console.log("cryostatComp", event.data);
    var message = event.data;
      ////break the message up into a switch (c) and a msg 
      var c = message.substr(0,1);
      var msg = message.substr(2);
      ////get the position of the source
      switch (c) {
         case 'D': 
            console.log("case D message:", msg); //also useful for debugging
            if(msg.trim()=="1"){
                //console.log("active control is on");
                setActiveState(true);
            }
            else {
                //console.log("active control is off");
                setActiveState(false);
            }
         break;
      }
  }

  //adds an event listener to the websocket and acts when it recieves a response.
  React.useEffect(() => {
    props.cryostatWS.addEventListener('message', relay, true  )
    return () => props.cryostatWS.removeEventListener('message', relay, true);
  }) 
  return (
    <Grid container direction="row" spacing={2} justify="space-around">
      <Grid item xs={7}>
        <Typography style={{marginTop: 7, fontSize : 20}}>Active Control:</Typography>
      </Grid>
      <Grid item xs={3}>
        <Switch color='primary' checked={activeState} onClick={function (e) {
          //if(!e.target.checked){
          if(activeState){ //if the active control is on, we want to turn it off
            props.onActive("/active:0"); //Sends this to the server through CryostatComp
            setActiveState(false);
          } else{
            props.onActive("/active:1");
            setActiveState(true);
              //if the active control is on, turn it off
          }}}/>
      </Grid>
    </Grid>
  );
}
