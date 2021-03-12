import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ActiveControl from "../ActiveControl/ActiveControl";
import CommandLine from "../CommandLine";
const useStyles = makeStyles((theme) => ({
  rootGrid: {
    width: 500,
  },
  papersliver: {
    maxWidth: 333,
    height: 50,
    backgroundColor: 'primary',
    border: "solid",
    borderColor: '#009fdf',
    borderWidth: 0.5,
  },
  paperbig: {
    maxWidth: 333,
    height: 460,
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

    <div className={classes.rootGrid}>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2} alignContent="flex-start">
          <Grid item>
            <Paper className={classes.papersliver}>
              <ActiveControl onActive={props.sendCommand}></ActiveControl>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paperbig}>{props.buttons}</Paper>
          </Grid>
          <Grid item>
            <CommandLine
              init={"none"}
              initWidth={320}
              onclick={props.onclick}
              commands={props.commands}
              sendCommand={props.sendCommand}
            ></CommandLine>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
