import axios from "axios";

const BASE_URL = "http://192.168.44.30/api/"; //base url for requests
const QUERY_URL = BASE_URL+"downloadData.php"; //data request

const headers = {
        //"Content-Type":"application/x-www-form-urlencoded", //workaround of CORS
        "Content-Type":"application/json", //had to add this to avoid CORS junk
};

export default async function fetchPlotData(data){

    //request the data from the server, and put the response into a json file for download
    return axios.post(QUERY_URL, data, {headers})
    .then((response) => {
        return response.data;
    })
    .catch(err => {
        console.log("plotting error", err);
        window.alert(`It was not possible to load data from db: ${err.response.status}`);
    });
}
