import React, {useState} from 'react';
import {
    Box, Button,
    Checkbox,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    TextField,
    Typography,
    useTheme
} from "@material-ui/core";
import ColoredPaper from "../ColoredPaper/ColoredPaper";
import ToggleHeader from "../ToggleHeader/ToggleHeader";


function todaysDate() {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const monthStr = month < 10 ? `0${month}` : month.toString();
    const dayStr = day < 10 ? `0${day}` : day.toString();
    return `${date.getFullYear()}-${monthStr}-${dayStr}`;
}

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

    const useStyles = makeStyles(theme => ({
        root: {
            height: "2rem"
        }
    }))

    const classes = useStyles();

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


    const defaultDate = todaysDate();
    const defaultTime = "00:00:00";

    const [checkedThermo, setCheckedThermo] = useState([]);
    const checkedThermoHandler = getHandleToggle(checkedThermo, setCheckedThermo);

    const [checkedPressure, setCheckedPressure] = useState([]);
    const checkedPressureHandler = getHandleToggle(checkedPressure, setCheckedPressure);

    const [startDateTime, setStartDateTime] = useState({
        date: defaultDate,
        time: defaultTime
    });

    const [endDateTime, setEndDateTime] = useState({
        date: defaultDate,
        time: defaultTime
    });

    const handleDateChange = (prevState, stateSetter) => event => {
        let newValue = event.target.value;
        if (newValue === null || newValue === "") {
            newValue = defaultDate;
        }
        stateSetter({...prevState, date: newValue});
    };

    const handleTimeChange = (prevState, stateSetter) => event => {
        let newValue = event.target.value;
        if (newValue === null || newValue === "") {
            newValue = defaultTime;
        }
        const newState = {...prevState, time: newValue,};
        stateSetter(newState);
    };

    const makeListItem = (key, id, checkedStates, handleToggle) => (
        <ListItem key={key} button onClick={handleToggle(id)} className={classes.root}>
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={checkedStates.indexOf(id) !== -1}
                    tabIndex={-1}/>
            </ListItemIcon>
            <ListItemText
                primary={<Typography variant={"body1"}>{id}</Typography>}
                id={"checkedText_" + id.split(" ").join()}/>
        </ListItem>
    );

    const plotHandler = () => {
        other.plot(startDateTime, endDateTime, checkedThermo, checkedPressure);
    };

    const downloadHandler = () => {
        other.download(startDateTime, endDateTime, checkedThermo, checkedPressure);
    };

    const withSeconds = {step: 1};

    const onHelp = () => {
        window.open("https://karelchanivecky.github.io/CUTE_docs/cryostat");
    };
    return (

        <Grid container>
            <Grid item xs={11} zeroMinWidth>
                <ColoredPaper elevation={0}>
                    <ToggleHeader
                    onHelp={onHelp}
                    helpable/>
                    <Grid container justify="center">
                        <Box width={0.95}>
                            <Grid item container direction="column">
                                <Typography variant="h2" align={"left"}>Thermometers</Typography>
                                <List dense>
                                    {thermoIds.map((id, i) => makeListItem(i, id, checkedThermo, checkedThermoHandler))}
                                </List>

                                <Typography variant="h2" align={"left"}>Pressure Gauges</Typography>
                                <List dense>
                                    {pressureIds.map((id, i) => makeListItem(i, id, checkedPressure, checkedPressureHandler))}
                                </List>
                                <Typography variant="h2" align={"left"}>Timeframe</Typography>


                                    <Grid container item direction="column" spacing={2} zeroMinWidth xs={12} md={12} lg={11} xl={11} >

                                        <Grid  item container direction="row" justify="space-between"  >

                                            <TextField label="start date" type="date"
                                                       value={startDateTime.date}
                                                       onChange={handleDateChange(startDateTime, setStartDateTime)}
                                            />
                                            <TextField label="start time" type="time"
                                                       value={startDateTime.time}
                                                       onChange={handleTimeChange(startDateTime, setStartDateTime)}
                                                       inputProps={withSeconds}/>
                                        </Grid>

                                        <Grid  item container direction="row" justify="space-between" >
                                            <TextField label="end date" type="date"
                                                       value={endDateTime.date}
                                                       onChange={handleDateChange(endDateTime, setEndDateTime)}/>
                                            <TextField label="end time" type="time"
                                                       value={endDateTime.time}
                                                       onChange={handleTimeChange(endDateTime, setEndDateTime)}
                                                       inputProps={withSeconds}/>
                                        </Grid>

                                    </Grid>

                                <Box py={2}>
                                    <Grid container direction="row" justify="space-between" >
                                        <Button color="primary" variant="outlined" m={4} onClick={downloadHandler}>Download</Button>
                                        <Button color="primary" variant="outlined" onClick={plotHandler} >Plot</Button>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Box>
                    </Grid>
                </ColoredPaper>
            </Grid>
        </Grid>


    );
}

export default PlottingInput;
