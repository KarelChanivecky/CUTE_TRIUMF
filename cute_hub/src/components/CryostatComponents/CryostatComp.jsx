import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
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
    height: 500,
    backgroundColor: "white",
    border: "solid",
    borderColor: '#009fdf',
  },
  papersliver: {
    maxWidth: 333,
    height: 50,
    backgroundColor: "white",
    border: "solid",
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
        { command: "Command10", name: "cmd10" },
      ]}
      onclick={sendCommand}
    />
  );

    const expanded = props.expanded;

    const [consoleLog, setConsoleLog] = useState([]);

    const colsWidth = expanded ? 5 : 10;
    const consoleComponent = expanded ?
        <Expand
            onclick={props.onDisplayChange ?? null}
            buttons={buttons}
            commands={consoleLog}
        />
        :
        <Closed
              onclick={props.onDisplayChange ?? null}
              buttons={buttons}
              commands={consoleLog}
          />;



    function sendCommand() {
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
                        <MotorSpeed/>
                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                {consoleComponent}
            </Grid>
        </Grid>
    );
}
