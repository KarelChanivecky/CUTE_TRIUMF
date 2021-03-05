import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import ButtonBase from "@material-ui/core/ButtonBase";
import App from "./App";
import { WrapText } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paperbig: {
    backgroundColor: "grey",
    height: 100,
  },
  paperCover: {
    padding: theme.spacing(2),
    backgroundColor: "darkgrey",
  },
  slider: {},
}));

export default function Test() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2} xs={8}>
        <Grid item xs={2}>
          <Paper className={classes.paperCover}>1</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paperCover}>
            <Grid item container xs={12} spacing={2}>
              <Grid item container xs={6} spacing={2}>
                <Grid item container xs={12}>
                  <Grid item xs>
                    <Paper className={classes.paperbig}>
                      <Grid item container xs={12}>
                        <Grid item xs={4}>
                          <Slider
                            className={classes.slider}
                            orientation="vertical"
                            defaultValue={30}
                            aria-labelledby="vertical-slider"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Slider
                            orientation="vertical"
                            defaultValue={30}
                            aria-labelledby="vertical-slider"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Slider
                            orientation="vertical"
                            defaultValue={30}
                            aria-labelledby="vertical-slider"
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paperbig}>2</Paper>
                </Grid>
              </Grid>
              <Grid item container xs={6} spacing={2}>
                <Grid item xs={12}>
                  <Paper className={classes.paperbig}>2</Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paperbig}>2</Paper>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
