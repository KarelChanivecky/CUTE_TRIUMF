import React, { useState } from 'react';
import {Box, Grid, makeStyles, Paper} from "@material-ui/core";
import ToggleHeader from "../../components/ToggleHeader/ToggleHeader";
import {ModuleDisplayStates} from "../../constants/moduleDisplayStates";
import IframeTab from '../../components/IframeTab/IframeTab';

//TODO: onclick isn't working properly
export default function IframeBox(props) {
    const onHelp = () => {
        window.open(props.helpUrl);
    };
    return (
        <Box>
                <ToggleHeader
                  onHelp={onHelp}
                  name={props.name}
                  helpable={true}
                />
            <IframeTab url={props.url} innerWidth={props.width} innerHeight={props.height}/>
        </Box>

    )
}
