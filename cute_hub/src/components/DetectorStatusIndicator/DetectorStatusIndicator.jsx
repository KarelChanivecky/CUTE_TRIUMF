import React from 'react';
import {useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core";
import LensIcon from '@material-ui/icons/Lens';
import 'bootstrap/dist/css/bootstrap.min.css';
import {green, red, orange} from "@material-ui/core/colors";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {spacing} from "@material-ui/system";
//axios
import axios from "axios";

const useStyles = makeStyles((theme) => ({

    color: {
        borderRadius: "5px",
        // backgroundColor: "lightgreen",
        margin: "0.5em",
        padding: "0.7em"
    }

}));


function DetectorStatusIndicator(props) {

    //URL for checking the server status
    const CHECK_URL = "http://192.168.44.30/api/checkDetectorStatus.php";

    const classes = useStyles();

    //colors for the indicator
    const onStyle = {color: green[500]}; //style that we will pass for on
    const offStyle = {color: red[500]};//style that we will pass for off
    const orangeStyle = {color: orange[500]};//style that we will pass for off
    //
    //state hook for the icon color
    const [iconColor, setIconColor] = useState(offStyle);

    // update the server status indicators
    const updateServerStatus = (detStatus) => {
        //if all the servers are running, set the all indicator to green
        if (detStatus=="run:ongoing"){
            setIconColor(onStyle);
        }
        //if none of the servers are running set the indicator to red
        else if (detStatus=="run:stopped"){
            setIconColor(offStyle); 
        }
        else {
            setIconColor(orangeStyle);
        }
    }
        //
    //function that queries the server status
    const getServerStatus = () => {
        axios.get(CHECK_URL).then((response)=>{
            //console.log(response.data[0]);
            updateServerStatus(response.data[0]);
        })
        .catch(console.log); //log any errors to console
    };

    //set up the use effect so that server status updates constantly
    //
    useEffect(() => {
        //get the state of the various servers
        getServerStatus();
        const interval = setInterval(() => {
            getServerStatus();
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, [])  // includes empty dependency array

        //<Box flexDirection="row" spacing={0} alignItems="center" justifyContent="center">
    return (
        <Box display="flex" flexDirection="column" alignItems="center" mx={2}>
                <Typography variant="button" gutterBottom>
                    RUN STATUS
                </Typography>
                <LensIcon fontSize="small" style={iconColor}/>
        </Box>
    );
}

export default DetectorStatusIndicator;
