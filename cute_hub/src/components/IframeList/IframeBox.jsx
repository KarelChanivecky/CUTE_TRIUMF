import React, { useState } from 'react';
import {Box, Grid, makeStyles, Paper} from "@material-ui/core";
import ToggleHeader from "../../components/ToggleHeader/ToggleHeader";
import {ModuleDisplayStates} from "../../constants/moduleDisplayStates";
import IframeTab from '../../components/IframeTab/IframeTab';

export default function IframeBox(props) {
    return (
        <Box>
            <Paper>
                <ToggleHeader
                  onHelp={props.helpUrl}
                  name={props.name}
                  helpable={true}
                />
            <IframeTab url={props.url} innerWidth={props.width} innerHeight={props.height}/>
            </Paper>
        </Box>

    )
}
