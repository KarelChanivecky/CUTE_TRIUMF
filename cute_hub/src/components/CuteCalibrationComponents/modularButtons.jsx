import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import {ModuleDisplayStates} from "../../constants/moduleDisplayStates";
import { Grid, makeStyles } from '@material-ui/core';



export default function ExtraCalibrationControls(props) {

   const buttonStyles = makeStyles((theme) => ({
      root: {
         '& > *': {
            width: 100,
         },
      },
   }));
   
   const mainGridStyles = makeStyles((theme) => ({
      root: {
         border: "1px solid primary",
         marginLeft: (props.vertical) ? 0 : -50,
         '& > *': {
            margin: theme.spacing(1),
         },
      },
   }));

   // Set up the websocket
   const ws = props.calibWebSock

   const handleWSMessage = (event) => {
      console.log(event.data);
   }
   
   React.useEffect(()=>{
      // handle messages from server
      ws.addEventListener('message', handleWSMessage, true);
      return () => { ws.removeEventListener('message', handleWSMessage, true); }
   });

   const btnStyles = buttonStyles();

   const controls = 
   [
      // Label controls
      <Typography variant="h3">Drive:</Typography>,
      // Drive source up
      <Button className={btnStyles.root} variant="outlined" color="primary" startIcon={<ArrowBackIosOutlinedIcon/>}
         onClick={()=>{
            ws.send("up")
         }}>Up</Button>,
      // Stop Driving Source
      <Button className={btnStyles.root} variant="contained" color="primary" startIcon={<NotInterestedIcon/>}
         onClick={()=>{
            ws.send("stop")
         }}>Stop</Button>,
      // Drive source down
      <Button className={btnStyles.root} variant="outlined" color="primary" endIcon={<ArrowForwardIosOutlinedIcon/>}
         onClick={()=>{
            ws.send("down")
         }}>Down</Button>
   ]

   const mainGrid = mainGridStyles();

   const getDirection = () => {return (props.vertical) ? "row" : "column"}

   const Controls = controls.map((button, index)=> {
      return <Grid key={index} item> {button} </Grid>
   });

   return (
      <Grid 
         className={mainGrid.root}  
         container
         direction={getDirection()}>
         {Controls}
      </Grid>
   )
}