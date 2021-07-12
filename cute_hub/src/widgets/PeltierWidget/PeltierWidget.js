import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import {Box, makeStyles, Paper} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ToggleHeader from "../../components/ToggleHeader/ToggleHeader";
import {ModuleDisplayStates} from "../../constants/moduleDisplayStates";
import {WidgetNames} from "../../constants/widgetNames";

const initialDataState = {
    "T1" : 0,
    "T2" : 0,
    "output" : "0%",
    "state" : 0,
};

export default function PeltierWidget(props) {
    const displayState = props.displayState;

   //set up the setpoint control
   const [setPoint, setSetPoint] = React.useState(14);
   //set up the power button text
   const [PwrBtnText, setBtnText] = React.useState("Enable Control");
   //data points
   const [values, setValues] = useState(initialDataState);
   const adjustSetPoint = (event) => {
      let newValue = event.target.value === '' ? '' : Number(event.target.value)
      setSetPoint(newValue);
      console.log(newValue);
   }

   // Set up the websocket
   const ws = props.peltierWS;
   //changed message from event here
   const handleWSMessage = (message) => {
      // TODO handle websocket event
      //console.log(message.data);
        var obj = JSON.parse(message.data);
        setValues(prevState => ({
            ...prevState,
            "T1": obj["peltier_T"].toFixed(1),
            "T2": obj["fpline_T"].toFixed(1),
            "output": obj["output"].toFixed(1)+"%", //add a percent sign
            "state": parseInt(obj["state"], 10),
        }));
   }
   React.useEffect(()=>{
      // handle messages from server
      ws.addEventListener('message', handleWSMessage, true);
      return () => { ws.removeEventListener('message', handleWSMessage, true); }
   });

    let width = props.width ? props.width : 75; //originally 6
    let height = props.height ? props.height : 100;

    //switch (displayState) {
    //    case ModuleDisplayStates.OPEN :
    //        height = 40;
    //        width = 40;
    //        break;
    //    case ModuleDisplayStates.EXPANDED:
    //        height = 40;
    //        width = 75;
    //}

    const divStyle = {
        fontSize : "20px",
    };
    const useStyles = makeStyles((theme) => ({
        test: {
            height: "150px",
            spacing:"4px",
          },
    }));
    const classes = useStyles()

    const onHelp = () => {
        window.open("http://192.168.44.30/CUTE_docs/peltier");
    };
    const updateSPT = () => {
        console.log("desired setpoint:", setPoint); //TODO
        ws.send("/set "+setPoint); //send the command to the websocket to change the setpoint
    };
    const btnPwrCmd = () => {
        console.log("pushed the button");
        //if the Peltier controller was previously off we should send the on command
        if (values["state"]==0) {
            console.log("controller was off, sending enable command");
            setValues(prevState => ({
                ...prevState,
                "state": 1,
            }));
            ws.send("/enable");
            setBtnText("Disable Control");
        }
        else {
            console.log("controller was on, sending disable command");
            setValues(prevState => ({
                ...prevState,
                "state": 0,
            }));
            ws.send("/disable");
            setBtnText("Enable Control");
        }
    };

    return (
        <Box className={classes.test} width="81.5%">
            <Paper>
                <ToggleHeader
                    helpable={displayState !== ModuleDisplayStates.MINIMIZED}
                    onHelp={onHelp}
                    name={props.noName? null :WidgetNames.PELTIER}

                />
                <Grid container direction="column" justify="space-around" spacing={2}>

                  <Grid item>
                      <Grid container direction="row" justify="space-around" spacing={1}>
                        <Grid item>
                            Output: {values["output"]}
                        </Grid>
                        <Grid item>
                            Peltier Temperature (<span>&deg;C</span>): {values["T1"]}
                        </Grid>
                      </Grid>
                  </Grid>

                  <Grid item>
                      <Grid container direction="row" justify="center" alignItems="center" spacing={4} >

                            <TextField
                              label="Set Point Temperature"
                              inputProps={{margin:"none",size:"small", style:{textAlign: "center"}}}
                              type="number"
                              onChange={adjustSetPoint}
                               value={setPoint}
                            />
                            <Button variant="contained" color="secondary" onClick={updateSPT}> Update Set Point </Button>
                            <Button variant="contained" color="primary" onClick={btnPwrCmd}> {PwrBtnText} </Button>
                      </Grid>
                  </Grid>

                </Grid>
            </Paper>
        </Box>
    )
}
