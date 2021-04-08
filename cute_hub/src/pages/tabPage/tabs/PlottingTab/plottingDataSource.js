
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

import axios from "axios";
import {allData, data1} from "./testData";

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



function buildSensorBoolString(checkedThermo, checkedPressure) {
    const boolChars = [];
    for (let id of thermoPressureIds) {
        boolChars.push(checkedThermo.includes(id) || checkedPressure.includes(id) ? "1" : "0");
    }
    return "q=" + boolChars.join('');
}

function makeDateTimeString(startDateTime, endDateTime) {
    return `timeLeft=${startDateTime.date}&timeRight=${endDateTime.date}`;
}

function makeQuery(sensorBoolString, dateTimeString) {
    return `/query_db.php?q=${sensorBoolString}&${dateTimeString}`;
}

export default async function fetchData(startDateTime, endDateTime ,checkedThermo, checkedPressure) {
    // return data1;
    return allData;
    const sensorBoolString = buildSensorBoolString(checkedThermo, checkedPressure);
    const dateTimeString = makeDateTimeString(startDateTime, endDateTime);
    const query = makeQuery(sensorBoolString, dateTimeString);
    const url = `${baseDataURL}${query}`;
    return axios.get(url)
        .then(res => {
            const dataStr = res.data;
           return JSON.parse(dataStr);
        })
        .catch(err => {
            window.alert(`It was not possible to load data from db: ${err.response.status}`)
        });

}