import React, {useState} from 'react';
import {Checkbox, Grid, ListItem, ListItemIcon, ListItemText, Typography, useTheme} from "@material-ui/core";
import ColoredPaper from "../../components/ColoredPaper/ColoredPaper";


const getHandleToggle = (checked, setChecked) => (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
        newChecked.push(value);
    } else {
        newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
};


function PlottingInput(props) {
    const theme = useTheme();

    const {notifyCheckedThermoState, notifyCheckedPressureState, ...other} = props


    const thermoIds = [
        "MC - RuO2",
        "MC - Cernox",
        "CP - RuO2",
        "ST - Cernox",
        "4K",
        "60K"
    ];

    const pressureIds = [
        "P1",
        "P2",
        "P3",
        "K3",
        "K4",
        "Flow",
        "K5",
        "K6",
        "K8"
    ];

    const [checkedThermo, setCheckedThermo] = useState([]);
    const checkedThermoHandler = getHandleToggle(checkedThermo, setCheckedThermo);

    const [checkedPressure, setCheckedPressure] = useState([]);
    const checkedPressureHandler = getHandleToggle(checkedPressure, setCheckedPressure);

    const makeListItem = (key, id, checkedStates, handleToggle) => (
        <ListItem key={key} button onClick={handleToggle(id)} dense>
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={checkedStates.indexOf(id) !== -1}
                    tabIndex={-1}/>
            </ListItemIcon>
            <ListItemText
                primary={id}
                id={"checkedText_" + id.split(" ").join()}/>
        </ListItem>
    );

    return (
        <ColoredPaper color={theme.palette.backgroundLight} square>
            <Grid container direction="column">
                <Typography variant="h2">Thermometers</Typography>
                {thermoIds.map((id, i) => makeListItem(i, id, checkedThermo, checkedThermoHandler))}

                <Typography variant="h2">Pressure Gauges</Typography>
                {pressureIds.map((id, i) => makeListItem(i, id, checkedPressure, checkedPressureHandler))}
            </Grid>
        </ColoredPaper>

    );
}

export default PlottingInput;
