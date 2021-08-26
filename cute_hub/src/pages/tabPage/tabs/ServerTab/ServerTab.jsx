import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import LensIcon from '@material-ui/icons/Lens';
import {green, red} from "@material-ui/core/colors";

//axios
import axios from "axios";

function ServerTab() {
    const onStyle = {color: green[500]}; //style that we will pass for on
    const offStyle = {color: red[500]};//style that we will pass for off

    //base url for the query string
    //const BASE_URL = "http://192.168.44.30/test.php"; //test script
    const BASE_URL = "http://192.168.44.30/api/serverControl.php";
    const CHECK_URL = "http://192.168.44.30/api/checkServerStatus.php";

    //state hook for the icon color
    const [iconColor, setIconColor] = useState({"avr":offStyle, "peltier":offStyle, "comp":offStyle});

    //functions that start/stop the servers
    //TODO: set up the axios calls
    function startServer(serverName){
        setIconColor(prevState => ({
            ...prevState,
            [serverName] : onStyle,
        }));

        //make the GET request
        var queryURL = BASE_URL + "?server="+serverName + "&operation=start";
        axios.get(queryURL).then((response)=>{
            //console.log("got some kind of data");
            //console.log(response.data);
            alert("Started the "+serverName+" server");
        })
        .catch(function(err){
            console.log("get request error occured");
            console.log(err.response.data);
        });

    }
    function stopServer(serverName){
        setIconColor(prevState => ({
            ...prevState,
            [serverName] : offStyle,
        }));

        //make the GET request
        var queryURL = BASE_URL + "?server="+serverName + "&operation=kill";
        axios.get(queryURL).then((response)=>{
            console.log(response.data);
            alert("Stopped the "+serverName+" server");
        })
        .catch(function(err){
            console.log("get request error occured");
            console.log(err.response.data);
        });


    }
    //TODO: the restart functionality isn't actually implemented yet
    function restartServer(serverName){
        console.log("this button doesn't do anything yet..");
    }
    // update the server status indicators
    const updateServerStatus = (serverStatus) => {
        serverStatus.forEach(function setIconCallback(element) { 
            var els = element.split(":");
            var srv = els[0];
            var stat = els[1];
            if (stat=="running") {
                var sty = onStyle;
            }
            else if (stat=="stopped") {
                var sty = offStyle;
            }
            setIconColor(prevState => ({
                ...prevState,
                [srv] : sty,
            }));
        });
    };
    //function that queries the server status
    const getServerStatus = () => {
        axios.get(CHECK_URL).then((response)=>{
            //console.log(response.data);
            updateServerStatus(response.data);
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
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [])  // includes empty dependency array

    //format of the server status display and the buttons
    function FormRow(props){
    return (
    <React.Fragment>
        <Grid container spacing={1}>
        <Grid container item xs={1}>
            <LensIcon style={iconColor[props.serverName]}/>
        </Grid>
        <Grid container item xs={4}>
            <ButtonGroup variant="contained" color="primary" ml={2}>
                <Button onClick={() => startServer(props.serverName)}>Start</Button>
                <Button onClick={() => stopServer(props.serverName)}>Stop</Button>
                <Button onClick={() => restartServer(props.serverName)}>Restart</Button>
            </ButtonGroup>
        </Grid>
        </Grid>
    </React.Fragment>
    );
    }

  return (
      <Container maxWidth="sm">
        <Typography variant="h3" align="left" gutterBottom>
            Server Control
        </Typography>
        <Grid container spacing={3} direction="column">
            <Grid item>
                <Typography variant="h4" align="left" gutterBottom>
                    Suspension/Calibration
                </Typography>
            </Grid>
                <FormRow serverName="avr"/>
            <Grid item>
                <Typography variant="h4" align="left" gutterBottom>
                    Peltier Cooler
                </Typography>
            </Grid>
                <FormRow serverName="peltier"/>
            <Grid item>
                <Typography variant="h4" align="left" gutterBottom>
                    Compressor Monitoring
                </Typography>
            </Grid>
            <FormRow serverName="comp"/>
        </Grid>
        </Container>
  );
}

export default ServerTab;
