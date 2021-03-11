import React from 'react'
import PlaceholderWidget from "../../../../widgets/placeholder/placeholderWidget";
import {Grid} from "@material-ui/core";
import {CalibrationControl} from "../../../../components/CuteCalibration/cute_calibration";

function CalibCryoDiagWideTab(props) {
    return (
        <div>
            <Grid container lg={12} direction='column'>
                <Grid container justify='space-between'>
                    <PlaceholderWidget height={40} width={40}/>
                    <PlaceholderWidget height={40} width={40}/>
                </Grid>
            </Grid>
            <CalibrationControl />
        </div>
    )
}


export default CalibCryoDiagWideTab
