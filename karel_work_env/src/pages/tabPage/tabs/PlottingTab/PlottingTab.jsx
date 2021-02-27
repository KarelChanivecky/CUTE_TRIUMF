import React from 'react';
import ColoredPaper from "../../../../components/ColoredPaper/ColoredPaper";
import {useTheme, Grid, Typography} from "@material-ui/core";
import PlottingInput from "../../../../widgets/PlottingInput/PlottingInput";

function PlottingTab(props) {
    const theme = useTheme();
    const notifyCheckedPressure = () => {};
    const notifyCheckedThermo = () => {};
    return (
        <Grid container justify="space-between">
            <Grid container item>
                <ColoredPaper color={theme.palette.backgroundLight}>
                    <PlottingInput
                        notifyCheckedThermoState={notifyCheckedThermo}
                        notifyCheckedPressureState={notifyCheckedPressure}
                    />
                </ColoredPaper>
            </Grid>



            <Grid container item>
                <ColoredPaper color={theme.palette.backgroundLight}>

                </ColoredPaper>
            </Grid>
        </Grid>
    );
}

export default PlottingTab;