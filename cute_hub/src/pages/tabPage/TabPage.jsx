import React, {useState} from 'react';
import {Box, Container, Grid, Tab, Tabs, useTheme} from "@material-ui/core";
import CalibCryoFridgeWideTab from "./tabs/CalibCryoDiaTab/CalibCryoFridgeWideTab";
import CalibratorInProgressIndicator from "../../components/CalibrationStatusIndicator/CalibrationStatusIndicator";
import ColoredPaper from "../../components/ColoredPaper/ColoredPaper";
import PlottingTab from "./tabs/PlottingTab/PlottingTab";
import CalibrationWidget from "../../widgets/CuteCalibrationWidget/CalibrationWidget";
import CalibCryoFridgeMediumTab from "./tabs/CalibCryoDiaTab/CalibCryoFridgeMediumTab";
import {ModuleDisplayStates} from '../../constants/moduleDisplayStates';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: '1.2rem',
    }
}));

const WindowBreakpoints = {
    FULL_SCREEN: 1570,//1520
    ACCORDION: 800
}

const WindowStates = {
    NARROW: 0,
    ACCORDION: 1,
    FULL_SCREEN: 2,
}

function evaluateWindowWidth() {
    const width = window.innerWidth;

    if (WindowBreakpoints.FULL_SCREEN < width) {
        return WindowStates.FULL_SCREEN;
    }

    if (WindowBreakpoints.ACCORDION < width) {
        return WindowStates.ACCORDION;
    }

    return WindowStates.NARROW;
}

function getCalibCryoFridgeTab() {
    switch (evaluateWindowWidth()) {
        case WindowStates.NARROW:
            return <CalibrationWidget helpable displayState={ModuleDisplayStates.MINIMIZED}/>;
        case WindowStates.ACCORDION:
            return <CalibCryoFridgeMediumTab/>;
        default:
            return <CalibCryoFridgeWideTab/>;
    }
}

function TabPage(props) {
    const theme = useTheme();
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [tabs, setTabs] = useState([getCalibCryoFridgeTab(), <PlottingTab/>]);

    // This handles detecting the changing width of the screen and show the appropriate CalibCryoFridgeTabVersion
    // Currently, changing the screen size may result in loosing the log of commands sent
    window.onresize =
        () => {
            setTabs([getCalibCryoFridgeTab(), tabs[1]]);
        };

    const ActiveTab = tabs[value];

    const height = props.height ?? "auto";
    return (


        <Box width={1} height={height}>

            <ColoredPaper elevation={0} color={theme.palette.backgroundLight} parentSize square>
                <ColoredPaper color={theme.palette.primary} square elevation={0}>
                    <Grid item container direction='row' justify="space-between" wrap="wrap-reverse" alignItems={"stretch"}>
                        {/*<Grid item container alignItems="flex-end">*/}
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="secondary"
                                textColor="inherit"
                                centered>
                                <Tab label="Controls" className={classes.root}/>
                                <Tab label="Data" className={classes.root}/>
                            </Tabs>
                        {/*</Grid>*/}
                        <CalibratorInProgressIndicator/>
                    </Grid>
                </ColoredPaper>

                {ActiveTab}
            </ColoredPaper>
        </Box>
    );
}

export default TabPage;