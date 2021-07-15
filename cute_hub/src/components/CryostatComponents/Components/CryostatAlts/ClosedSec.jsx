import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ActiveControl from "../ActiveControl/ActiveControl";
import CommandLine from "../CommandLine";
import Dampers from "../Dampers/Dampers"
const useStyles = makeStyles((theme) => ({
  rootGrid: {
    width: 500,
  },
  paperActiveControl: {
    maxWidth: 333,
    height: 50,
    backgroundColor: 'primary',
    border: "solid",
    borderColor: '#009fdf',
    borderWidth: 0.5,
  },
  paperDampers: {
    maxWidth: 333,
    height: 75,
    backgroundColor: "white",
    border: "solid",
    borderWidth: 0.5,
    borderColor: "#009fdf",
  },
  paperbig: {
    maxWidth: 333,
    height: 360,
    backgroundColor: "white",
    border: "solid",
    borderColor: '#009fdf',
    borderWidth: 0.5,
    paddingTop: 10
  },
}));

export default function Closed(props) {
  const classes = useStyles();
  return (
    //This component is the right side of the Cryostat when the command line is closed
    <div className={classes.rootGrid}>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2} alignContent="flex-start">
          <Grid item>
            <Paper className={classes.paperActiveControl}>
              <ActiveControl cryostatWS={props.cryostatWS} activeState={props.activeOn} onActive={props.sendCommand}/>
            </Paper>
          </Grid>
          <Grid item>
          <Paper className={classes.paperDampers}>
            <Dampers cryostatWS={props.cryostatWS} />
          </Paper>
        </Grid>
          <Grid item>
            <Paper className={classes.paperbig}>{props.buttons}</Paper>
          </Grid>
          <Grid item>
            <CommandLine
              init={"none"}
              initWidth={320}
              onclick={props.onclick ?? null}
              commands={props.commands}
              sendCommand={props.sendCommand}
              />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
