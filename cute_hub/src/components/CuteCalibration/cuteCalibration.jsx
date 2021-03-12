import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './cuteCalibration.css';
import Grid from '@material-ui/core/Grid'
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import { makeStyles, OutlinedInput, TextField, ThemeProvider, Typography, withStyles } from '@material-ui/core';
import { ModuleDisplayStates } from '../../constants/moduleDisplayStates';

////////////////////////////////////////////////////////// Testing Data Source ////////////////////////////////////////////////////////
// The source postion slider looks at this value and adjusts according to it
var source_position = 40;

var moving = false;

// This function is called when the move button is clicked and can be replaced with something that actually moves the slider.
function move_source(pos) {
   setTimeout(()=>{
      if (pos > source_position) {   
         console.log(++source_position);  
      }  else if (pos < source_position) {
         console.log(--source_position); 
      } else {
         return undefined;
      }
      move_source(pos)
   }, 500)
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This creates an array of JSON objects that will be called at line ## to mark the values of a slider
const marks = ()=>{
   let marks = []
   for (let i = 0, m = -10; i < 17; ++i, m += 10) {
      marks[i] = {
         value: m,
         label: '' + m + '',
      }
   }
   return marks;
}

// This sets the class of the div the slider is sitting in, 
// the classes width and heights are found in the cuteCalibration.css file
function getCalibDivClass(displayState) {
   // return (window.innerWidth < window.innerHeight) ? "calib_control_vertical" : "calib_control_horizontal";
   return (displayState === ModuleDisplayStates.MINIMIZED) ? "calib_control_vertical" : "calib_control_horizontal";
}

// This JSON object sets the style properties of the sliders
const sliderStyles = {
   root: {
      color: 'primary',
      height: 8,
      width: 1000,
   },
   vertical: {
      color: 'primary',
      width: 8,
      height: 800,
      '& $rail': {
         marginLeft: -8,
         width: 20
      },
      '& $track': {
        width: 8
      },
      '& $thumb': {
        marginLeft: -8,
        marginBottom: -11
      }

   },
   thumb: {
      height: 20,
      width: 20,
      borderRadius: 0,
      backgroundColor: 'currentColor',
      border: '1px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
         boxShadow: 'inherit',
      },
   },
   active: {},
   valueLabel: {
      left: 'calc(-50% + 2px)',
   },
   track: {
      display: 'none',
      height: 8,
      borderRadius: 4,
   },
   rail: {
      marginTop: -8,
      height: 20,
      borderRadius: 4,
   },
}

// Creates a styled slider object that can be called like a regular slider with <StyledMovementSlider/>
// Used in the return value of CalibrationSlider
const StyledMovementSlider = withStyles(sliderStyles)(Slider);

// Sets the styles of the move button.
const buttonStyle = makeStyles({
   root:{
      maxwidth : 100,
   }
});

// This slider displays the current source position
function SourcePositionSlider(props) {

   // The Source Slider Position is based on whatever variable you hand to this function...
   const [srcPos, setSrcPos] = useState(source_position);
   
   React.useEffect(()=>{
      let secTimer = setInterval( () => {
         // ...this function
         setSrcPos(source_position)
       }, 1000)
   
       return () => clearInterval(secTimer);
   });

   // Applies some extra style to the source slider, starting with the original sliderStyle object.
   let sourceStyles = sliderStyles;
   sourceStyles.root.color = '#52af77';
   sourceStyles.vertical.color = '#52af77';
   sourceStyles.rail.display = 'none';
   sourceStyles.thumb.marginTop = -68;
   sourceStyles.vertical["& $thumb"].marginLeft = -56;

   // Creates a new Slider object with specific styling
   const StyledSourceSlider = withStyles(sourceStyles)(Slider);

   return (
      <StyledSourceSlider
               orientation={props.orientation}
               value={srcPos}
               min={-10}
               max={150}
               valueLabelDisplay="on"
            />
   )
}


function CalibrationSlider(props) {
   // First value represents current position, Second Value represents desired position
   const [values, setValues] = React.useState([source_position,80])

   const handleChange = (_event, newValue) => {
      setValues([values[0],  newValue]);
   }
   
   const handleInputChange = (event) => {
      setValues( [values[0], event.target.value === '' ? '' : Number(event.target.value)]);
   }; 


   console.log(props.displayState)
   const getSliderOrientation = () => {return(props.displayState === ModuleDisplayStates.MINIMIZED) ? "vertical" : "horizontal";}
   const getGridOrientation = () => {return(props.displayState === ModuleDisplayStates.MINIMIZED) ? "column" : "row";}

   // const getSliderOrientation = () => {return(props.screenwidth < props.screenheight) ? "vertical" : "horizontal";}
   // const getGridOrientation = () => {return(props.screenwidth < props.screenheight) ? "column" : "row";}

   return (      
      <div  
         className="calibration_widget">
         <Grid container direction={getGridOrientation()}>
         <Grid item><div  
            className={getCalibDivClass(props.displayState)}
            id="calibration_slider">
            <StyledMovementSlider
               value={values[1]}
               orientation={getSliderOrientation()}
               aria-labelledby="range-slider"
               onChange={handleChange}
               marks={marks()}
               // Steps controls the values the slider can have,
               // 1 means it will have values 1,2,3,4, etc.
               // .5 means it have have values .5,1,1.5,2
               step={0.1}
               /////////////////////////////
               min={-10}
               max={150}
               valueLabelDisplay="auto"
            />
            <SourcePositionSlider
               orientation={getSliderOrientation()}
            />
         </div></Grid>
         
         <Grid item><div className="inputDiv">
            <OutlinedInput
               className="calibration_input"
               id="calibration_input"
               value={values[1]} 
               type="number"
               step={0.1}
               size='small'
               onChange={handleInputChange}
            />
            <Button 
               variant="contained" 
               color="primary"
               // Plug in function to change data here and hand it the same variable
               onClick={()=>{move_source(values[1])}}>
                  Move
            </Button>
         </div></Grid>
         </Grid>
      </div>
   );
}

// 
export default function CalibrationControl(props) {
   const [dimensions, setDimensions] = React.useState({ 
      height: window.innerHeight,
      width: window.innerWidth,
   })
   
   React.useEffect(() => {
      function handleResize() {
         setDimensions({
            height: window.innerHeight,
            width: window.innerWidth,
         })
      }
      window.addEventListener('resize', handleResize)

      return _ => {
         window.removeEventListener('resize', handleResize)
      }
   })
   return (
         <CalibrationSlider 
            screenwidth={dimensions.width}
            screenheight={dimensions.height}
            displayState={props.displayState}
            />    
   );
}
