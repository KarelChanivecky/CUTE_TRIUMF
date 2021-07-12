import React from 'react'
import { Grid } from '@material-ui/core';
import {Box, makeStyles, Paper} from "@material-ui/core";
import ToggleHeader from "../../components/ToggleHeader/ToggleHeader";
import {ModuleDisplayStates} from "../../constants/moduleDisplayStates";
import CalibrationControl from "../../components/CuteCalibrationComponents/cuteCalibration.jsx";
import ExtraCalibrationControls from "../../components/CuteCalibrationComponents/modularButtons";
import {WidgetNames} from "../../constants/widgetNames";


export default function CalibrationWidget(props) {
    const displayState = props.displayState;

    let width = props.width ? props.width : 6;
    let height = props.height ? props.height : 40;

    switch (displayState) {
        case ModuleDisplayStates.OPEN :
            height = 40;
            width = 40;
            break;
        case ModuleDisplayStates.EXPANDED:
            height = 40;
            width = 75;
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }));
    const classes = useStyles()

    const onHelp = () => {
        window.open("http://192.168.44.30/CUTE_docs/calibration");
    };

    const getDirection = () => {
        return (props.displayState !== ModuleDisplayStates.MINIMIZED) ? "column" : "row"
    }

    return (
        <Box className={classes.root}>
            <Paper>
                <ToggleHeader
                    helpable={displayState !== ModuleDisplayStates.MINIMIZED}
                    onHelp={onHelp}
                    name={props.noName? null :WidgetNames.CALIBRATION}

                />
                <Grid container direction={getDirection()}>
                    <Grid item>
                        <CalibrationControl 
                            calibWebSock={props.calibWebSock}
                            displayState={props.displayState}
                        />
                    </Grid>
                    <Grid item>
                        <ExtraCalibrationControls
                            calibWebSock={props.calibWebSock}
                            vertical={props.displayState !== ModuleDisplayStates.MINIMIZED}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}
