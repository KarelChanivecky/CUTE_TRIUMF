import axios from "axios";

const BASE_URL = "http://192.168.44.30/api/"; //base url for requests
const QUERY_URL = BASE_URL+"downloadData.php"; //data request

const headers = {
        //"Content-Type":"application/x-www-form-urlencoded", //workaround of CORS
        "Content-Type":"application/json", //had to add this to avoid CORS junk
};

export default async function downloadData(data){

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
    .catch(err => {
        console.log("download error", err);
        window.alert(`It was not possible to load data from db: ${err.response.status}`);
    });
}
