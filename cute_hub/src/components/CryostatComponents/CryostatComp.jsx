import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FunctionButtons from "./Components/FunctionButtons/functionButtons";
import CryoGauge from "./Components/Gauges/CryoGauge";
import MotorSpeed from "./Components/MotorSpeed/MotorSpeed";
import Closed from "./Components/CryostatAlts/ClosedSec";
import Expand from "./Components/CryostatAlts/ExpandSec";
import { render } from "react-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 20,
    display: "inline-block",
  },
  paperbig: {
    maxWidth: 333,
    height: 500,
    backgroundColor: "white",
    border: "solid",
    borderWidth: 0.5,
    borderColor: '#009fdf',
  },
  papersliver: {
    maxWidth: 333,
    height: 50,
    backgroundColor: "white",
    border: "solid",
    borderWidth: 0.5,
    borderColor: '#009fdf',
  },

}));

export default function CryostatComp(props) {
  const classes = useStyles();

  const buttons = (
    <FunctionButtons
      commands={[
        { command: "Command1", name: "cmd1" },
        { command: "Command2", name: "cmd2" },
        { command: "Command3", name: "cmd3" },
        { command: "Command4", name: "cmd4" },
        { command: "Command5", name: "cmd5" },
        { command: "Command6", name: "cmd6" },
        { command: "Command7", name: "cmd7" },
        { command: "Command8", name: "cmd8" },
        { command: "Command9", name: "cmd9" },
        { command: "/respond position", name: "cmd10" },
      ]}
      onclick={sendCommand}
    />
  );

    const expanded = props.expanded;

    const [consoleLog, setConsoleLog] = useState([]);

    const colsWidth = expanded ? 5 : 10;
    const consoleComponent = expanded ?
        <Expand
            onclick={props.onDisplayChange}
            buttons={buttons}
            commands={consoleLog}
            sendCommand={sendCommand}
        />
        :
        <Closed
              onclick={props.onDisplayChange}
              buttons={buttons}
              commands={consoleLog}
              sendCommand={sendCommand}
          />;


    // A function to hand to components that need to send commands to the server.
    function sendCommand(msg, log = []) {
      if(log.length > 0){
        setConsoleLog(log);
      } else {
        LogMsg(msg);
      }
      let cmd = msg.split(' ',1)[0];
      if (cmd && cmd.length>1 && cmd.substr(0,1) == '/') {
        Send(cmd.substr(1) + ':' + msg.substr(msg.indexOf(cmd)+cmd.length+1));
      } else {
        Send('log:"'+msg+'"');
      }
    }

    // A function which logs the message given to it into the command prompt
    function LogMsg(msg) {
      const temp = [...consoleLog, msg];
      setConsoleLog(temp);
    }

    // A function which sends the given command to the server.
    function Send(cmd)  {
    console.log(cmd);
      // try {
      //     if (cuteServer) cuteServer.send(cmd);
      // }
      // catch (err) {
      //     // (string was split to avoid messing up BBEdit colour syntax highlighting)
      //     LogMsg('<span class=res>Error sending command to server<'+'/span><br/>');
      // }
    }

    //Get references of all the buttons
    return (
        <Grid item container xs={colsWidth} spacing={2} justify="center">
            <Grid item xs={7} container direction="column" spacing={3}>
                <Grid item>
                    <Paper className={classes.paperbig}>
                        <CryoGauge/>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.papersliver}>
                        <MotorSpeed speeds={[0,0,0]}/>
                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                {consoleComponent}
            </Grid>
        </Grid>
    );
}
