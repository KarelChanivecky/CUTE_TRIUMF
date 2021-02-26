import React from 'react';
import {Grid, makeStyles, Paper, Tab, Tabs} from "@material-ui/core";
import CalibCryoFridgeWideTab from "./tabs/CalibCryoDiaTab/CalibCryoFridgeWideTab";
import WarningHeader from "../../../../cute_hub/src/components/WarningHeader/WarningHeader";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "darkcyan"
    },

}));


function TabPage(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const classes = useStyles();

    const tabs = [<CalibCryoFridgeWideTab/>, <></>];

    const ActiveTab = tabs[value];
    return (
        <Grid container lg={12} xs={12}>
            <Grid container direction='row'>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered>
                    <Tab label="Calibration/Cryostat/Fridge"/>
                    <Tab label="Plotting"/>
                </Tabs>
                <WarningHeader/>
            </Grid>

            <Paper className={classes.root}>
                {ActiveTab}

            </Paper>
        </Grid>

    );
}

export default TabPage;