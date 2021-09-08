import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import {Box, Container, makeStyles, Paper} from "@material-ui/core";
import CalibratorInProgressIndicator from "../../components/CalibrationStatusIndicator/CalibrationStatusIndicator";
import ServerStatusIndicator from "../../components/ServerStatusIndicator/ServerStatusIndicator";
import DetectorStatusIndicator from "../../components/DetectorStatusIndicator/DetectorStatusIndicator";

export default function StatusWidget(props) {
    //
                  //<Box>
                  //              <CalibratorInProgressIndicator/>
                  //</Box>
    return (
              <Box display="flex" spacing={2} flexDirection="row" style={{alignSelf:"flex-end", marginRight:"10px"}}>
                                <DetectorStatusIndicator/>
                                <ServerStatusIndicator/>
              </Box>
    )
}
