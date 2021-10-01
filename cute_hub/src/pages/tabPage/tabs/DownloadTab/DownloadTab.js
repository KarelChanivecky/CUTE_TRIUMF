import {React, useState} from "react";
import MultipleSelect from "./components/MultiSelect/MultiSelect";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

//axios
import axios from "axios";

const BASE_URL = "http://192.168.44.30/api/"; //base url for requests
const QUERY_URL = BASE_URL+"downloadData.php"; //data request

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

const headers = {
        //"Content-Type":"application/x-www-form-urlencoded", //workaround of CORS
        "Content-Type":"application/json", //had to add this to avoid CORS junk
};

const today = new Date().toISOString().slice(0,10);
function DownloadTab() {


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

function dbRequest(){
    //reformat the json object to an array of the arrays (no keys)
    var arrs = Object.entries(queries).map(x=>x[1]);
    //flatten the array of arrays into one array
    var flat = arrs.concat.apply([], arrs);
    var data = {
        "keys" : flat,
        "start":startDate,
        "end":endDate,
    };

    //request the data from the server, and put the response into a json file for download
    axios.post(QUERY_URL, data, {headers})
    .then((response) => {
        //console.log(response.data);
        var json = JSON.stringify(response.data, null, 1); //format the response data to a json
        const blob = new Blob([json], { type: "text/json"}); //put the json in a blob

        //create a hyperlink element and click it
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "data.json"; //default filename
        a.click(); //click the link
        URL.revokeObjectURL(a.href);
    })
    .catch(console.log);
}
  return (

<Grid container direction="column" justify="center" spacing={2}>

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
      <Button variant="outlined" color="primary" onClick={()=>{dbRequest()}}>Download</Button>
    </Grid>
</Grid>

  );
}

export default DownloadTab;
