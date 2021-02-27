import React from 'react'
import PlaceholderWidget from "../../../../widgets/placeholder/placeholderWidget";
import {Grid} from "@material-ui/core";

function CalibCryoDiagWideTab(props) {
    return (
        <div>
            <Grid container lg={12} direction='column'>
                <Grid container justify='space-between'>
                    <PlaceholderWidget height={40} width={40}/>
                    <PlaceholderWidget height={40} width={40}/>
                </Grid>
            </Grid>
            <PlaceholderWidget height={20} width={85}/>
        </div>
    )
}


export default CalibCryoDiagWideTab
