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
        { command: "Command1", name: "cmd1" },
        { command: "Command2", name: "cmd2" },
        { command: "Command3", name: "cmd3" },
        { command: "Command4", name: "cmd4" },
        { command: "Command5", name: "cmd5" },
        { command: "Command6", name: "cmd6" },
        { command: "Command7", name: "cmd7" },
        { command: "Command8", name: "cmd8" },
        { command: "Command9", name: "cmd9" },
      ]}
      send={send}
    />
  );

  const [params, setParams] = React.useState({
    xs: 10,
    input: <Closed onclick={changeUp} buttons={buttons}></Closed>,
  });
  React.useEffect(() => {});
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

  function changeUp() {
    setParams({
      xs: 5,
      input: <Expand onclick={changeDown} buttons={buttons}></Expand>,
    });
  }
  function changeDown() {
    setParams({
      xs: 10,
      input: <Closed onclick={changeUp} buttons={buttons}></Closed>,
    });
  }
  function send(cmd) {
    console.log(cmd);
  }
}
