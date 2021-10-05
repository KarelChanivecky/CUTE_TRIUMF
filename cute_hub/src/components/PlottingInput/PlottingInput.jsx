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
import MultipleSelect from "./components/MultiSelect/MultiSelect";

//dictionaries where the key is what we will be the value passed to the PHP script and the value is the label
const thermo_dict = {"MC1":"Mixing Chamber (Cernox)","MC2":"Mixing Chamber (RuOx)", "CP":"Cold Plate", "ST":"Still", "4K":"4K", "60K":"60K"};
const gauge_dict = {"P1":"P1","P2":"P2","P3":"P3","K3":"K3","K4":"K4","K5":"K5", "K6":"K6", "K8":"K8"};
const susp_dict = { "dampA":"Damper A",
                    "dampB":"Damper B",
                    "dampC":"Damper C",
                    "stageA":"Labjack A",
                    "stageB":"Labjack B",
                    "stageC":"Labjack C",
                    "motA" :"Motor A Speed",
                    "motB" :"Motor B Speed",
                    "motC" : "Motor C Speed"};

const facility_dict = { "labT":"Lab Temperature",
                        "labP":"Lab Air Pressure",
                        "pelT":"Peltier Temperature",
                        "pelOut":"Peltier Output (%)",
                        "LNW":"Liquid Nitrogen Weight",
                        "WTL":"Tank Water Level"};

const comp_dict = { "coolantIn":"Coolant In Temperature",
                    "coolantOut":"Coolant Out Temperature",
                    "oilT":"Oil Temperature",
                    "HeT":"Helium Temperature",
                    "compLowP":"Compressor Low Pressure",
                    "compHighP":"Compressor High Pressure",
                    "compDeltaP":"Average Pressure Difference"};


const today = new Date().toISOString().slice(0,10);

function PlottingInput(props) {

    const theme = useTheme();

    const useStyles = makeStyles(theme => ({
        root: {
            height: "2rem"
        }
    }));
    const classes = useStyles();

    const [queries, setQueries] = useState({});
    const [startDate, setStartDate] = useState({"date":today, "time":"00:00"});
    const [endDate, setEndDate] = useState({"date":today, "time":"23:59"});

    function addToQuery(key,val){
        setQueries((prevState) => ({
            ...prevState,
            [key]:val,
        }));
    }

    const handleTimeChange = (prevState, stateSetter) => event => {
        let newValue = event.target.value;
        stateSetter({...prevState, time:newValue});
    };
    const handleDateChange = (prevState, stateSetter) => event => {
        let newValue = event.target.value;
        stateSetter({...prevState, date:newValue});
    };

    const plotHandler = () => {
        //reformat the json object to an array of the arrays (no keys)
        var arrs = Object.entries(queries).map(x=>x[1]);
        //flatten the array of arrays into one array
        var flat = arrs.concat.apply([], arrs);
        var data = {
            "keys" : flat,
            "start":startDate,
            "end":endDate,
        };
        //handler for plotting the data
        props.plot(data);

    };

    const downloadHandler = () => {
        //reformat the json object to an array of the arrays (no keys)
        var arrs = Object.entries(queries).map(x=>x[1]);
        //flatten the array of arrays into one array
        var flat = arrs.concat.apply([], arrs);
        var data = {
            "keys" : flat,
            "start":startDate,
            "end":endDate,
        };
        //handler for plotting the data
        props.download(data);

    };

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
                    <Grid container justify="center" spacing={1}>

                             <Grid item>
                              <MultipleSelect oncheck={addToQuery} label="Thermometers" list={thermo_dict}/>
                             </Grid>

                             <Grid item>
                              <MultipleSelect oncheck={addToQuery} label="Pressure Gauges" list={gauge_dict}/>
                             </Grid>

                             <Grid item>
                              <MultipleSelect oncheck={addToQuery} label="Facility" list={facility_dict}/>
                             </Grid>

                             <Grid item>
                              <MultipleSelect oncheck={addToQuery} label="Suspension System" list={susp_dict}/>
                             </Grid>

                             <Grid item>
                              <MultipleSelect oncheck={addToQuery} label="Cryocompressor" list={comp_dict}/>
                             </Grid>

                             <Grid item container direction="row" justify="center">
                                <TextField value={startDate.date} onChange={handleDateChange(startDate, setStartDate)} label="Start Date" type="date"/>
                                <TextField value={startDate.time} onChange={handleTimeChange(startDate, setStartDate)} label="Start Time" type="time"/>
                             </Grid>

                             <Grid item container direction="row" justify="center">
                                <TextField value={endDate.date} onChange={handleDateChange(endDate, setEndDate)} label="End Date" type="date"/>
                                <TextField value={endDate.time} onChange={handleTimeChange(endDate, setEndDate)} label="End Time" type="time"/>
                             </Grid>

                            <Grid item>
                              <Button variant="outlined" color="primary" onClick={plotHandler}>Plot</Button>
                            </Grid>
                            <Grid item>
                              <Button variant="outlined" color="primary" onClick={downloadHandler}>Download</Button>
                            </Grid>

                    </Grid>
                </ColoredPaper>
            </Grid>
        </Grid>


    );
}

export default PlottingInput;
