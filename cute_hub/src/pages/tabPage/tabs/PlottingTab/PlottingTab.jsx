import React from 'react';
import ColoredPaper from "../../../../components/ColoredPaper/ColoredPaper";
import {Grid, useTheme} from "@material-ui/core";
import PlottingInput from "../../../../components/PlottingInput/PlottingInput";
import axios from 'axios';

/*
Proper order of inputs for request as per data.html:
var sensors = [
mc1_bool,
mc2_bool,
cp_bool,
st_bool,
fourK_bool,
sixtyK_bool,
p1_bool,
p2_bool,
p3_bool,
k3_bool,
k4_bool,
flow_bool,
k5_bool,
k6_bool,
k8_bool];
 */

const thermoPressureIds = [
    "MC - RuO2",
    "MC - Cernox",
    "CP - RuO2",
    "ST - Cernox",
    "4K",
    "60K",
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

// TODO point to right url
const baseDataURL = "https://www.mydomain.com";

/*
This builds the string to add to query to get sensor data from server. The order of the id's was taken from the old page
 */
function buildSensorBoolString(checkedThermo, checkedPressure) {
    const boolChars = [];
    for (let id of thermoPressureIds) {
        boolChars.push(checkedThermo.includes(id) || checkedPressure.includes(id) ? "1" : "0");
    }
    return "q=" + boolChars.join('');
}

function makeDateTimeString(startDateTime, endDateTime) {
    return `dateLeft=${startDateTime.date}&timeLeft=${startDateTime.time}&dateRight=${endDateTime.date}&timeRight=${endDateTime.time}`
}

function makeQuery(sensorBoolString, dateTimeString) {
    return `/make_csv.php?q=${sensorBoolString}&${dateTimeString}`;
}

function PlottingTab(props) {
    const theme = useTheme()

    // The following empty functions will be used to implement the plotting
    const notifyCheckedPressure = checkedList => {
    };
    const notifyCheckedThermo = checkedList => {
    };

    const plot = (startDateTime, endDateTime, checkedThermo, checkedPressure) => {

    }

    const download = (startDateTime, endDateTime, checkedThermo, checkedPressure) => {
        const sensorBoolString  = buildSensorBoolString(checkedThermo, checkedPressure);
        const dateTimeString = makeDateTimeString(startDateTime, endDateTime);
        const query = makeQuery(sensorBoolString, dateTimeString);
        const url = `${baseDataURL}${query}`;
        axios.get(url)
            .then(()=>{
                const a = document.createElement("a");
                // TODO Add url to csv file
                a.href = "URL TO FILE HERE";
                a.download =  "data.csv";
                a.click();
                URL.revokeObjectURL(a.href);
            });
    }
    return (
        <Grid container >

                <PlottingInput
                    notifyCheckedThermoState={notifyCheckedThermo}
                    notifyCheckedPressureState={notifyCheckedPressure}
                    plot={plot}
                    download={download}
                />


            <Grid container item>
                <ColoredPaper color={theme.palette.backgroundLight}>
                {/*plotting here*/}
                </ColoredPaper>
            </Grid>
        </Grid>
    );
}

export default PlottingTab;