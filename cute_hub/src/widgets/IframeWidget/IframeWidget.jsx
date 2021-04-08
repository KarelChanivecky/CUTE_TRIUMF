import React, { useState } from 'react';
import {Box, Grid, makeStyles, Paper} from "@material-ui/core";
import ToggleHeader from "../../components/ToggleHeader/ToggleHeader";
import {ModuleDisplayStates} from "../../constants/moduleDisplayStates";
import {WidgetNames} from "../../constants/widgetNames";
import IframeTab from '../../components/IframeTab/IframeTab';
export default function IframeWidget(props) {
    const [dimensions, setDimensions] = useState({innerWidth: window.innerWidth, innerHeight: window.innerHeight})

    React.useEffect(() => {
      function handleResize() {
        // Set window width/height to state
        setDimensions({
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
        });
      }
      console.log(window)
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [window]);


    const displayState = props.displayState;

    let width = 30;
    let height = 80;

    switch (displayState) {
        case ModuleDisplayStates.OPEN :
            width = props.width ? props.width : 90;
            height = props.height ? props.height : 80;
            break;
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(1),
                width: theme.spacing(width),
                height: theme.spacing(height),
            },
            '& > * > .diag': {
                width: theme.spacing(width + 20),
                height: theme.spacing(height + 20),
            },
        },
    }));


    return (
        <Box>
            <Paper>
                <Grid container alignItems="center" justify="center">
                    <IframeTab url={props.url} innerWidth={props.width} innerHeight={props.height}></IframeTab>
                </Grid>
            </Paper>
        </Box>

    )
}
