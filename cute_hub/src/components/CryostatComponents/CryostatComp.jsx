import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FunctionButtons from "./Components/FunctionButtons/functionButtons";
import CryoGauge from "./Components/Gauges/CryoGauge";
import MotorSpeed from "./Components/MotorSpeed/MotorSpeed";
import Closed from "./Components/CryostatAlts/ClosedSec";
import Expand from "./Components/CryostatAlts/ExpandSec";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 20,
    display: "inline-block",
  },
  paperbig: {
    maxWidth: 333,
    height: 475,
    backgroundColor: "white",
    border: "solid",
    borderWidth: 0.5,
    borderColor: "#009fdf",
  },
  papersliver: {
    maxWidth: 333,
    height: 75,
    backgroundColor: "white",
    border: "solid",
    borderWidth: 0.5,
    borderColor: "#009fdf",
  },
}));


// This is the complete cryostat component which puts together cryostat related components
export default function CryostatComp(props) {
  const classes = useStyles();

  // Custom function buttons 
  // add new buttons to the list in the form of
  // {command: [new command], name: [name of command]}
  // TODO: add the actual commands for halt and zero stages
  // TODO: test the halt functionality
  const buttons = (
    <FunctionButtons
      commands={[
        { command: "/halt", name: "Halt" },
        { command: "/zeroStages", name: "Zero Stages" },
      ]}
       fieldCommands={[
           { command: "/ctrlPos", fieldText: "Control position", buttonText: "Update" },
           { command: "/sendTo", fieldText: "Damper position", buttonText: "Move" },
       ]}
      onclick={sendCommand}
    />
  );

  //Retrieves the previous command line log from local storage
  let prevLog = localStorage.getItem("consoleLog")
    ? JSON.parse(localStorage.getItem("consoleLog"))
    : [];
  const [consoleLog, setConsoleLog] = useState(prevLog);

  const expanded = props.expanded;
  const colsWidth = expanded ? 5 : 10;

  // initializes the command line to the closed position
  const [consoleComponent, setConsoleComponent] = useState((<Closed
                                                                  onclick={props.onDisplayChange ?? null}
                                                                  buttons={buttons}
                                                                  commands={consoleLog}
                                                                  sendCommand={sendCommand}
                                                                  cryostatWS={props.cryostatWS}
                                                                  />))

  //This function handles the expanding and contracting of the command line
  React.useEffect(() => {
    if(!expanded){
      setConsoleComponent((<Closed
                                  onclick={props.onDisplayChange ?? null}
                                  buttons={buttons}
                                  commands={consoleLog}
                                  sendCommand={sendCommand}
                                  cryostatWS={props.cryostatWS}
        />))
    } else {
      setConsoleComponent((<Expand
                                  onclick={props.onDisplayChange ?? null}
                                  buttons={buttons}
                                  commands={consoleLog}
                                  sendCommand={sendCommand}
                                  cryostatWS={props.cryostatWS}
      />))
    }
  }, [consoleLog, expanded])


  // A function to hand to components that need to send commands to the server.
  // All components that need to communicate with the server are given this function as a prop.
  // The msg parameter is the command and the log is an optional parameter for passsing the console history
  function sendCommand(msg, log = []) {
    if (log.length > 0) {
      //this is a temporary fix to clear the consoleLog, requires a refresh
      if (msg == "cls") {
        localStorage.removeItem("consoleLog");
        setConsoleLog([]);
      } else {
        setConsoleLog(log);
        setLocalStorage(log);
      }
    } else {
      LogMsg(msg);
    }
    let cmd = msg.split(" ", 1)[0];
    //if (cmd && cmd.length > 1 && cmd.substr(0, 1) === "/") {
    if (cmd && cmd.length > 1){
      //Send(cmd.substr(1) + ":" + msg.substr(msg.indexOf(cmd) + cmd.length + 1)); //original line
      Send(msg.substr(1)); //we just want to send the exact command passed, minus the / at the start
    } else {
      //Send('log:"' + msg + '"');
      console.log(msg);
    }
    return consoleLog
  }



  // A function which logs the message given to it into the command prompt
  // Use this to log responses or anything else you need into the commmand line
  // Command display does not actively render, must be closed then opened to show responses from the LogMsg function
  function LogMsg(msg) {
    const temp = [...consoleLog, msg];
    setConsoleLog(temp);
    setLocalStorage(temp);
  }

  //keeps local storage up to date with the current console Log history
  function setLocalStorage(log) {
    localStorage.setItem("consoleLog", JSON.stringify(log));
  }

  // A function which sends the given command to the server.
  // the parameter cmd will be the correctly formatted command to send.
  function Send(cmd) {
    try {
        if (props.cryostatWS)  props.cryostatWS.send(cmd) 
    }
    catch (err) {
        LogMsg("Error sending command to server");
    }
 
  }

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
         break;
      }
  }

  //adds an event listener to the websocket and acts when it recieves a response.
  React.useEffect(() => {
    props.cryostatWS.addEventListener('message', relay, true  )
    return () => props.cryostatWS.removeEventListener('message', relay, true);
  }) 

  return (
    <Grid item container xs={colsWidth} spacing={1} justify="center">
      <Grid item xs={8} container direction="column" spacing={3}>
        <Grid item>
          <Paper className={classes.paperbig}>
            <CryoGauge cryostatWS={props.cryostatWS}/>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.papersliver}>
            <MotorSpeed cryostatWS={props.cryostatWS} />
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        {consoleComponent}
      </Grid>
    </Grid>
  );
}
