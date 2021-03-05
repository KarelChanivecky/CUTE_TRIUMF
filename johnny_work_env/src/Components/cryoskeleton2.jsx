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
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 20,
    minWidth: 1200,
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
    maxWidth: 1200,
    height: 500,
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

export default function CryostatComp() {
  const classes = useStyles();
  console.log(Array.from(Array(30).keys()));
  return (
    <div className={classes.root}>
      <Grid container spacing={2} xs={12}>
        <Grid item xs={1}>
          <Paper className={classes.paperdiagram}>
            {[...Array.from(Array(30).keys())].map((e) => (
              <Paper className={classes.paperitem}>{e}</Paper>
            ))}
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paperroot}>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
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
              </Grid>

              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item>
                    <Paper className={classes.papersliver}>
                      <ActiveControl></ActiveControl>
                    </Paper>
                  </Grid>
                  <Grid item>
                    <Paper className={classes.paperbig}>
                      <FunctionButtons
                        commands={[
                          { command: "Command", name: "cmd1" },
                          { command: "Command", name: "cmd2" },
                          { command: "Command", name: "cmd3" },
                          { command: "Command", name: "cmd4" },
                          { command: "Command", name: "cmd5" },
                          { command: "Command", name: "cmd6" },
                          { command: "Commandnew", name: "cmd7" },
                        ]}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid xs></Grid>
                  <App />
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
