import React from 'react';
import {Box, Grid, Tab, Tabs, useTheme} from "@material-ui/core";
import CalibCryoFridgeWideTab from "./tabs/CalibCryoDiaTab/CalibCryoFridgeWideTab";
import CalibratorInProgressIndicator from "../../components/WarningHeader/WarningHeader";
import ColoredPaper from "../../components/ColoredPaper/ColoredPaper";
import PlottingTab from "./tabs/PlottingTab/PlottingTab";


function TabPage(props) {
    const theme = useTheme();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const tabs = [<CalibCryoFridgeWideTab/>, <PlottingTab/>];

    const ActiveTab = tabs[value];
    return (
        <Grid container>

            <Grid item container lg={12} xs={12}>
                <Box width={1}>
                    <ColoredPaper color={theme.palette.primary} square elevation={0}>
                        <Grid item container direction='row' justify="space-between" wrap="wrap-reverse">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="secondary"
                                textColor="inherit"
                                centered>
                                <Tab label="Calibration/Cryostat/Fridge"/>
                                <Tab label="Plotting"/>
                            </Tabs>
                            <CalibratorInProgressIndicator/>
                        </Grid>
                    </ColoredPaper>
                </Box>

                <ColoredPaper elevation={0} color={theme.palette.backgroundLight} square>
                    {ActiveTab}
                </ColoredPaper>
            </Grid>
        </Grid>

    );
}

export default TabPage;