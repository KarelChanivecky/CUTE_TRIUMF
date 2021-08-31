import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import LensIcon from '@material-ui/icons/Lens';
import {green, red, orange} from "@material-ui/core/colors";

//axios
import axios from "axios";

function ServerTab() {
    const onStyle = {color: green[500]}; //style that we will pass for on
    const offStyle = {color: red[500]};//style that we will pass for off
    const orangeStyle = {color: orange[500]};//style that we will pass for off

    //base url for the query string
    //const BASE_URL = "http://192.168.44.30/test.php"; //test script
    const BASE_URL = "http://192.168.44.30/api/serverControl.php";
    const CHECK_URL = "http://192.168.44.30/api/checkServerStatus.php";

    //state hook for the icon color
    const [iconColor, setIconColor] = useState({"all":offStyle, "avr":offStyle, "peltier":offStyle, "comp":offStyle});

    //functions that start/stop the servers
    //TODO: set up the axios calls
    function startServer(serverName){
        //make the GET request
        var queryURL = BASE_URL + "?server="+serverName + "&operation=start";
        axios.get(queryURL).then((response)=>{
            //console.log("got some kind of data");
            //console.log(response.data);
            getServerStatus();
            alert("Started the "+serverName+" server");
        })
        .catch(console.log);

    }
    function stopServer(serverName){
        //make the GET request
        var queryURL = BASE_URL + "?server="+serverName + "&operation=kill";
        axios.get(queryURL).then((response)=>{
            //console.log(response.data);
            getServerStatus();
            alert("Stopped the "+serverName+" server");
        })
        .catch(console.log);


    }
    function restartServer(serverName){
        //make the GET request
        var startURL = BASE_URL + "?server="+serverName + "&operation=start";
        var killURL = BASE_URL + "?server="+serverName + "&operation=kill";
        //first kill the server
        axios.get(killURL).then((response)=>{
            //then restart the server
            axios.get(startURL).then((response)=>{
                getServerStatus();
                alert("Restarted the "+serverName+" server");
            })
            .catch(console.log);
        })
        .catch(console.log);
    }
    // update the server status indicators
    const updateServerStatus = (serverStatus) => {
        var numRunning = 0; //number of servers running
        var totalServers = serverStatus.length; //number of servers
        serverStatus.forEach(function setIconCallback(element) { 
            var els = element.split(":");
            var srv = els[0];
            var stat = els[1];
            if (stat=="running") {
                var sty = onStyle;
                numRunning+=1; //increment the number of running servers
            }
            else if (stat=="stopped") {
                var sty = offStyle;
            }
            setIconColor(prevState => ({
                ...prevState,
                [srv] : sty,
            }));
        });
        //if all the servers are running, set the all indicator to green
        if (numRunning==totalServers){
            //setIconColor(onStyle);
            setIconColor(prevState => ({
                ...prevState,
                "all" : onStyle,
            }));
        }
        //if none of the servers are running set the indicator to red
        else if (numRunning==0){
            //setIconColor(offStyle);
            setIconColor(prevState => ({
                ...prevState,
                "all" : offStyle,
            }));
        }
        else {
            setIconColor(prevState => ({
                ...prevState,
                "all" : orangeStyle,
            }));
        }
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
                    All Servers
                </Typography>
            </Grid>
                <FormRow serverName="all"/>
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
