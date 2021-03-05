import React from 'react';
import ColoredPaper from "../../../../components/ColoredPaper/ColoredPaper";
import {Grid, useTheme} from "@material-ui/core";
import PlottingInput from "../../../../components/PlottingInput/PlottingInput";

function PlottingTab(props) {
    const theme = useTheme();
    const notifyCheckedPressure = checkedList => {
    };
    const notifyCheckedThermo = checkedList => {
    };
    return (
        <Grid container justify="space-between">
            <Grid container item >
                <PlottingInput
                    notifyCheckedThermoState={notifyCheckedThermo}
                    notifyCheckedPressureState={notifyCheckedPressure}
                />
            </Grid>


            <Grid container item>
                <ColoredPaper color={theme.palette.backgroundLight}>

                </ColoredPaper>
            </Grid>
        </Grid>
    );
}

export default PlottingTab;