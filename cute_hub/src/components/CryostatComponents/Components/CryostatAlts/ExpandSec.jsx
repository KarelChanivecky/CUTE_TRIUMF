import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ActiveControl from "../ActiveControl/ActiveControl";
import CommandLine from "../CommandLine";
const useStyles = makeStyles((theme) => ({
  rootGrid: { width: 1000 },
  papersliver: {
    maxWidth: 333,
    height: 50,
    backgroundColor: "white",
    border: "solid",
    borderColor: '#009fdf',
    borderWidth: 0.5,
  },
  paperbig: {
    maxWidth: 333,
    height: 505,
    backgroundColor: "white",
    border: "solid",
    borderColor: '#009fdf',
    borderWidth: 0.5,
    paddingTop: 10
  },
}));

export default function Expand(props) {
  const classes = useStyles();

  return (
    <div className={classes.rootGrid}>
      <Grid
        item
        xs={6}
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={9} container direction="column" spacing={2}>
          <Grid item>
            <Paper className={classes.papersliver}>
              <ActiveControl onActive={props.sendCommand}></ActiveControl>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paperbig}>{props.buttons}</Paper>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <div style={{width: 530}}>
          <CommandLine
            init={"display"}
            initWidth={482}
            onclick={props.onclick}
            commands={props.commands}
            sendCommand={props.sendCommand}
          ></CommandLine>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
