import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import {Box, Container, makeStyles, Paper} from "@material-ui/core";
import CalibratorInProgressIndicator from "../../components/CalibrationStatusIndicator/CalibrationStatusIndicator";
import ServerStatusIndicator from "../../components/ServerStatusIndicator/ServerStatusIndicator";

export default function StatusWidget(props) {
    //
                  //<Box>
                  //              <CalibratorInProgressIndicator/>
                  //</Box>
    return (
              <Box flexDirection="column" style={{alignSelf:"flex-end", marginRight:"10px"}}>
                  <Box>
                                <ServerStatusIndicator/>
                  </Box>
              </Box>
    )
}
