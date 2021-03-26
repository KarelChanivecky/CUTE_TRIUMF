import React from 'react'
import {Box, makeStyles, Paper} from "@material-ui/core";
import ToggleHeader from "../../components/ToggleHeader/ToggleHeader";
import {ModuleDisplayStates} from "../../constants/moduleDisplayStates";
import CalibrationControl from "../../components/CuteCalibration/cuteCalibration.jsx";
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
        window.open("https://karelchanivecky.github.io/CUTE_docs/calibration");
    };
    return (
        <Box className={classes.root}>
            <Paper>
                <ToggleHeader
                              helpable={displayState !== ModuleDisplayStates.MINIMIZED}
                              onHelp={onHelp}
                              name={props.noName? null :WidgetNames.CALIBRATION}

                />
                <CalibrationControl calibWebSock={props.calibWebSock}
                                    displayState={props.displayState}
                />
            </Paper>
        </Box>
    )
}
