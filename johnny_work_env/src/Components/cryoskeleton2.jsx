import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import FunctionButtons from "./FunctionButtons/functionButtons";
import ActiveControl from "./ActiveControl/ActiveControl";
import CryoGauge from "./Gauges/CryoGauge";
import App from "../App";
import MotorSpeed from "./MotorSpeed/MotorSpeed";
import Closed from "./CryostatAlts/ClosedSec";
import Expand from "./CryostatAlts/ExpandSec";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 20,
    display: "inline-block",
  },
  paperbig: {
    maxWidth: 333,
    height: 400,
    backgroundColor: "grey",
  },
  papersliver: {
    maxWidth: 333,
    height: 50,
    backgroundColor: "grey",
  },
  paperroot: {
    padding: theme.spacing(2),
    height: 500,
    display: "inline-block",
    paddingRight: 100,
    backgroundColor: "darkgrey",
  },
  paperdiagram: {
    overflow: "auto",
    minWidth: 100,
    maxWidth: 200,
    maxHeight: 530,
    backgroundColor: "darkgrey",
  },
  paperitem: {
    marginBottom: 10,
    height: 50,
    backgroundColor: "grey",
  },
}));

export default function CryostatComp(props) {
  const classes = useStyles();
  const buttons = (
    <FunctionButtons
      commands={[
        { command: "Command", name: "cmd1" },
        { command: "Command", name: "cmd2" },
        { command: "Command", name: "cmd3" },
        { command: "Command", name: "cmd4" },
        { command: "Command", name: "cmd5" },
        { command: "Command", name: "cmd6" },
        { command: "Commandnew", name: "cmd7" },
        { command: "Command", name: "cmd6" },
        { command: "Commandnew", name: "cmd7" },
      ]}
    />
  );

  //Cryostat comp state
  const [params, setParams] = React.useState({
    xs: 10,
    input: (
      <Closed
        onclick={changeUp}
        buttons={buttons}
        commands={[]}
        onSubmit={onSubmit}
      ></Closed>
    ),
    commandlist: [],
  });

  //Handles the button press, maximizing the command line.
  function changeUp() {
    setParams({
      xs: 5,
      input: (
        <Expand
          onclick={changeDown}
          buttons={buttons}
          commands={params.commandlist}
          onSubmit={onSubmit}
        ></Expand>
      ),
    });
  }

  //Handles the button press, minimizing the command line
  function changeDown() {
    setParams({
      xs: 10,
      input: (
        <Closed
          onclick={changeUp}
          buttons={buttons}
          commands={params.commandlist}
          onSubmit={onSubmit}
        ></Closed>
      ),
    });
  }

  //Handles the submit of the commands in the command prompt
  function onSubmit(cmd) {
    console.log("step2");
    const output = [...params.commandlist, cmd];
    console.log(output);
    setParams({
      xs: params.xs,
      input: (
        <Expand
          onclick={changeDown}
          buttons={buttons}
          commands={output}
          onSubmit={onSubmit}
        ></Expand>
      ),
      commandlist: output,
    });
    console.log(params.commandlist);
  }

  return (
    <Paper className={classes.paperroot}>
      <Grid item container xs={params.xs} spacing={2}>
        <Grid item xs={8} container direction="column" spacing={2}>
          <Grid item>
            <Paper className={classes.paperbig}>
              <CryoGauge></CryoGauge>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.papersliver}>
              <MotorSpeed></MotorSpeed>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          {params.input}
        </Grid>
      </Grid>
    </Paper>
  );
}
