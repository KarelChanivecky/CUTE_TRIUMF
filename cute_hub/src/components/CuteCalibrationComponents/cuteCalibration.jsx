import React, { useState } from 'react';
import './cuteCalibration.css';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import { makeStyles, OutlinedInput} from '@material-ui/core';
import { ModuleDisplayStates } from '../../constants/moduleDisplayStates';
import { StyledMovementSlider, StyledSourceSlider } from './sliderStyles/sStyle.jsx'
// console.log(userSliderStyles, srcPosSliderStyles);
// NOTE: The vertical slider has some funny properties, 
// it's actually a slider with values 10 to -150
// we hide that with labels and a label formatter that appear as -10 to 150 as well as 
// Doing this makes the slider properly represent the machine it controls

////////////////////////////////////////////////////////// Data Source ////////////////////////////////////////////////////////
// The source postion slider looks at this value and adjusts according to it
// position of source for the AVR board to use
// real physical source position, in centimeters
var source_position = -10;
var kMotorFactor = 90;
var kMotorFactorInv = 1/kMotorFactor;

// never got a moving indicator working
var moving = false;

// This function is called when the move button is clicked 
// the parameters its given are the requested slider position and the websocket you want to send the message to
function move_source(pos, ws) {
   if (pos > 150 || pos < -10) {
      alert("Input Number out of Range: \nPick a number between -10 and 150 (inclusive).");
   }
   //pos should be slider value in centimeters
   //multiply by calibration factor (100) to go from cm to motor position
   //var motor_pos = pos*100;//original
   var motor_pos = parseInt(pos*kMotorFactor);//updated with new calibration factor
   //TODO: test this function, be very careful with what is happening here
   ws.send("avr1: m0 on 1"); //get the motor ready
   //var txt = "avr1: m0 step " + motor_pos.toString() + " 500"; //TODO change the hardcoded speed 500 (=5cm/s) to accept any speed
   var txt = "avr1: m0 step " + motor_pos.toString() + " 50"; //TODO change the hardcoded speed 50 (=.5cm/s) to accept any speed
   ws.send(txt); //send the command, TODO: uncomment
   console.log(txt);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This creates an array of JSON objects that will be called at line ## to mark the values of a slider
const marks = (verticalBool)=>{
   let f = (verticalBool) ? -1 : 1;
   let marks = []
   for (let i = 0, m = -10; i < 17; ++i, m += 10) {
      marks[i] = {
         value: m * f,
         label: '' + m + '',
      }
   }
   return marks;
}

// This sets the class of the div the slider is sitting in, 
// the classes width and heights are found in the cuteCalibration.css file
function getCalibDivClass(displayState) {
   return (displayState === ModuleDisplayStates.MINIMIZED) ? "calib_control_vertical" : "calib_control_horizontal";
}

// Sets the styles of the move button.
const buttonStyle = makeStyles({
   root:{
      maxwidth : 100,
   }
});

// This slider displays the current source position
function SourcePositionSlider(props) {
   const verticalBool = props.vertical
   // The Source Slider Position is based on whatever variable you hand to this function...
   const getSrcPos = () => { return (verticalBool) ? source_position * -1: source_position;}
   const [srcPos, setSrcPos] = useState(source_position);
   
   React.useEffect(()=>{
      let secTimer = setInterval( () => {
         // ...this function
         setSrcPos(source_position)
       }, 1000)
   
       return () => clearInterval(secTimer);
   }, []);

   const getMin = () => { return(verticalBool) ? -150 : -10;} 
   const getMax = () => { return(verticalBool) ? 10 : 150;} 
   const orientValue = (value) => { return(verticalBool) ? value * -1: value ;}

   return (
      <StyledSourceSlider
               orientation={props.orientation}
               value={orientValue(srcPos)}
               min={getMin()}
               max={getMax()}
               valueLabelFormat={(x)=>{return (verticalBool) ? -1 * x: x;}}
               valueLabelDisplay="on"
            />
   )
}

function CalibrationSlider(props) {

   const verticalBool = (props.displayState === ModuleDisplayStates.MINIMIZED)

   // First value represents current position, Second Value represents desired position
   const [values, setValues] = React.useState([source_position,80])

   const changeSourcePos = (event)=>{
      console.log("Moving source to: " + event.data);
      source_position = parseInt(event.data);
   };

   const handleWSMessage = function(message) {
      //break the message up into a switch (c) and a msg 
      var c = message.data.substr(0,1);
      var msg = message.data.substr(2);
      //get the position of the source
      switch (c) {
         case 'C': 
            //console.log("case C"); //also useful for debugging
            //console.log("message from calibration ws:", msg); //also useful for debugging
         case 'G': 
            //console.log("case G"); //also useful for debugging
            //console.log("message from calibration ws:", msg); //also useful for debugging
            var temp_msg ="";
            var locate_pos = msg.search("POS");
            if (locate_pos != -1 ) {
               temp_msg = msg.substr(locate_pos); 
               var act_pos = temp_msg.substr(4);
               //act_pos = act_pos.substring(0,act_pos.indexOf("<")); //uncommented this after changing the server command
               //var real_pos = 0.01*act_pos; //real position of source in cm, original
               //var real_pos = kMotorFactorInv*act_pos; //real position of source in cm, limit to 1 decimal
               var real_pos = Number.parseFloat(kMotorFactorInv*act_pos).toFixed(1); //real position of source in cm, limit to 1 decimal
               console.log("gamma calibration source position:", real_pos);
               //TODO this part here I don't know if it's right, but it sometimes works
               // Note from Sean: The source_position variable is what the source 
               // position slider checks every second to update its value. This should work fine.
               source_position = real_pos;
            }
         break;
      }
   };

   React.useEffect(()=>{
      // handle messages from server
      props.ws.addEventListener('message', handleWSMessage, true);
      return () => { props.ws.removeEventListener('message', handleWSMessage, true); }
   });

   const handleChange = (_event, newValue) => {
      let value = (verticalBool) ? -1 * newValue : newValue;
      setValues([values[0],  value]);
   }
   
   // Handles text input for new source position, sets a min and max for that input.
   const minInput = -10
   const maxInput = 150
   const handleInputChange = (event) => {
      let newValue = event.target.value === '' ? '' : Number(event.target.value)
      if (newValue > maxInput) {
         newValue = maxInput;
      } else if (newValue < minInput) {
         newValue = minInput;
      }
      setValues([values[0], newValue]);
   }; 

   // handle logic for displaying the vertical slider
   const getSliderOrientation = () => {return(verticalBool) ? "vertical" : "horizontal";}
   const getGridOrientation = () => {return(verticalBool) ? "column" : "row";}

   const getMin = () => { return(verticalBool) ? -150 : -10;} 
   const getMax = () => { return(verticalBool) ? 10 : 150;} 
   const orientValue = (value) => { return(verticalBool) ? value  : value ;}

   return (      
      <Grid className="calibration_main" container direction="row">
         <Grid container item justify="center" spacing={4} direction={getGridOrientation()}>
            <Grid item>
               <div  
               className={getCalibDivClass(props.displayState)}
               id="calibration_slider">
                  <StyledMovementSlider
                     order="flipped"
                     value={(verticalBool) ? values[1] * -1: values[1]}
                     orientation={getSliderOrientation()}
                     aria-labelledby="range-slider"
                     onChange={handleChange}
                     marks={marks(verticalBool)}
                     valueLabelFormat={(x)=>{return (verticalBool) ? -1 * x: x;}}
                     // Steps controls the values the slider can have,
                     // 1 means it will have values 1,2,3,4, etc.
                     // .5 means it have have values .5,1,1.5,2
                     step={0.1}
                     /////////////////////////////
                     min={getMin()}
                     max={getMax()}
                     valueLabelDisplay="auto"
                     // ValueLabelComponent={customValueLabel}
                  />
                  <SourcePositionSlider
                     vertical={verticalBool}
                     orientation={getSliderOrientation()}
                  />
               </div>
            </Grid>
            
            <Grid item>
               <div className="inputDiv">
                  <OutlinedInput
                     className="calibration_input"
                     id="calibration_input"
                     value={orientValue(values[1])} 
                     type="number"
                     max={150}
                     step={0.1}
                     size='small'
                     onChange={handleInputChange}
                  />
                  <Button 
                     variant="contained" 
                     color="primary"
                     // Plug in function to change data here and hand it the same variable
                     onClick={()=>{move_source(values[1], props.ws)}}
                  >
                     Move
                  </Button>
               </div>
            </Grid>
         </Grid>
      </Grid>
   );
}

// 
export default function CalibrationControl(props) {
   return (
      <CalibrationSlider 
         ws={props.calibWebSock}
         displayState={props.displayState}
         />    
   );
}
