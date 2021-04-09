import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import {ModuleDisplayStates} from "../../constants/moduleDisplayStates";
import { Grid, makeStyles } from '@material-ui/core';

// Extra Calibration Controls has the same websocket as the rest of the Calibration widget and can be used to control the source
// The Component uses an array of React Elements to dynamically build a list of interactable controls.
export default function ExtraCalibrationControls(props) {

   // Styles
   // -------------------------------------------------------
   const buttonStyles = makeStyles((theme) => ({
      root: {
         '& > *': {
            width: 100,
         },
      },
   }));
   const btnStyles = buttonStyles();

   const textFieldStyles = makeStyles((theme) => ({
      root: 
           { '& > *': {
            width: 100,
         },}
   }));
   const tFStyles = textFieldStyles();

   const mainGridStyles = makeStyles((theme) => ({
      root: {
         border: "1px solid primary",
         marginLeft: (props.vertical) ? 0 : -50,
         '& > *': {
            margin: theme.spacing(1),
         },
      },
   }));
   const mainGrid = mainGridStyles();
   // React Hooks for holding states such as motorspeed or a reference to the websocket
   // ----------------------------------------------------------------------------------

   // Set up the websocket
   const ws = props.calibWebSock

   const handleWSMessage = (event) => {
      // TODO handle websocket event
      // console.log(event.data);
   }
   
   React.useEffect(()=>{
      // handle messages from server
      ws.addEventListener('message', handleWSMessage, true);
      return () => { ws.removeEventListener('message', handleWSMessage, true); }
   });


   // Setup motorSpeed
   // TODO set min and max motor speed 
   const minSpeed = 0
   const maxSpeed = 10
   const [motorSpeed, setMotorSpeed] = React.useState(2);
   const adjustSpeed = (event) => {
      let newValue = event.target.value === '' ? '' : Number(event.target.value)
      if (newValue > maxSpeed) {
         newValue = maxSpeed;
      } else if (newValue < minSpeed) {
         newValue = minSpeed;
      }
      setMotorSpeed(newValue);
   }

   const getDirection = () => {return (props.vertical) ? "row" : "column"}

   const controls = 
   [
      // Label controls
      // <Typography variant="h3">Drive Source:</Typography>
      // Drive source up 
      // TODO send whatever you like to the web socket
      <Button className={btnStyles.root} variant="outlined" color="primary" 
         startIcon={getDirection()==="row" ? <KeyboardArrowLeftIcon/> : <></>}
         endIcon={getDirection()==="row" ? <></>: <KeyboardArrowUpIcon/>}
         onClick={()=>{
            // ws.send(`Up @ ${motorSpeed}`)
         }}>Up</Button>,
      // Stop Driving Source 
      // TODO send whatever you like to the web socket
      <Button className={btnStyles.root} variant="contained" color="primary" 
         startIcon={<NotInterestedIcon/>}
         onClick={()=>{
            // ws.send(`Stop`)
         }}>Stop</Button>,
      // Drive source down 
      // TODO send whatever you like to the web socket
      <Button className={btnStyles.root} variant="outlined" color="primary" 
         endIcon={getDirection()==="row" ? <KeyboardArrowRightIcon/> : <KeyboardArrowDownIcon/>}
         onClick={()=>{
            // ws.send(`Down @ ${motorSpeed}`)
         }}>Down</Button>,
      // Set desired motorspeed  
      <TextField className={tFStyles.root} type="number"
         step={0.1} onChange={adjustSpeed} 
         value={motorSpeed} label="MotorSpeed" />,
   ]

   

   const Controls = controls.map((button, index)=> {
      return <Grid key={index} item> {button} </Grid>
   });

   return (
      <Grid 
         className={mainGrid.root}  
         container
         justify="center"
         direction={getDirection()}>
         {Controls}
      </Grid>
   )
}