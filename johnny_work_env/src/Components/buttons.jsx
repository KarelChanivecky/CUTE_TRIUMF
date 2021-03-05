import React, { Component } from "react";
import { Button, Grid, Paper } from "@material-ui/core";
import App from "../App";
class FunctionButtons extends Component {
  state = {};
  render() {
    return (
      <div style={{ backgroundColor: "lightgrey", width: 800 }}>
        <Grid container spacing={3} xs={12}>
          <Grid item container spacing={3}>
            <Grid item xs={6}>
              <Paper style={{ backgroundColor: "Grey", height: 500 }}>
                Cryostat Gauges
              </Paper>
            </Grid>
            <Grid item xs={6} container direction={"column"}>
              <Grid item xs>
                <Paper style={{ backgroundColor: "Grey", height: 100 }}>
                  active control
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper style={{ backgroundColor: "Grey", height: 375 }}>
                  Function Buttons
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container spacing={3}>
            <Grid item xs={6}>
              <Paper style={{ backgroundColor: "Grey", height: 50 }}>
                Motor Speeds
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <App />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default FunctionButtons;
