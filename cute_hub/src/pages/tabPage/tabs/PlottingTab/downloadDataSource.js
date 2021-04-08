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
const baseDataURL = "http://192.168.44.30/viewer";

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

export default function download(checkedThermo, checkedPressure, startDateTime, endDateTime) {
    const sensorBoolString = buildSensorBoolString(checkedThermo, checkedPressure);
    const dateTimeString = makeDateTimeString(startDateTime, endDateTime);
    const query = makeQuery(sensorBoolString, dateTimeString);
    const url = `${baseDataURL}${query}`;
    axios.get(url)
        .then(() => {
            const a = document.createElement("a");
            // TODO Add url to csv file
            a.href = "URL TO FILE HERE";
            a.download = "data.csv";
            a.click();
            URL.revokeObjectURL(a.href);
        })
        .catch(err => {
            window.alert(`It was not possible to load data from db: ${err.response.status}`)
        });
}