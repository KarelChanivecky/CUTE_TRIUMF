import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import {source_position, move_source} from './test.js'
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import { makeStyles, OutlinedInput, TextField, withStyles } from '@material-ui/core';

////////////////////////////////////////////////////////// Testing Data Source ////////////////////////////////////////////////////////
var source_position = 40;

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

function getCalibDivClass() {
   return (window.innerWidth < window.innerHeight) ? "calib_control_vertical" : "calib_control_horizontal";
}

const StyledSlider = withStyles({
   root: {
      color: '#52af77',
      height: 8,
      width: 860,
   },
   vertical: {
      color: '#52af77',
      width: 8,
      height: 800,
      '& $rail': {
        width: 8
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
      height: 8,
      borderRadius: 4,
   },
})(Slider);

const buttonStyle = makeStyles({
   root:{
      maxwidth : 100,
   }
});

// This slider displays the current source position
function SourcePositionSlider(props) {

   // The Source Slider Position is based on whatever variable you hand to this function...
   const [srcPos, setSrcPos] = useState(0);
   
   React.useEffect(()=>{
      let secTimer = setInterval( () => {
         // ...this function
         setSrcPos(source_position)
       }, 500)
   
       return () => clearInterval(secTimer);
   });

   return (
      <StyledSlider
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
   
   const orientation = () => {return(props.screenwidth < props.screenheight) ? "vertical" : "horizontal";}


   return (      
      <div  
         className="calibration_widget">
         <div  
            className={getCalibDivClass()}
            id="calibration_slider">
            <StyledSlider
               value={values[1]}
               orientation={orientation()}
               aria-labelledby="range-slider"
               onChange={handleChange}
               marks={marks()}
               step={1}
               min={-10}
               max={150}
               valueLabelDisplay="on"
            />
            <SourcePositionSlider
               orientation={orientation()}
            />
         </div>
         <OutlinedInput
            className={buttonStyle.root}
            id="calibration_input"
            value={values[1]} 
            type="number"
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
      </div>
   );
}

//testing resizing rerender
function CalibrationControl(props) {
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
            />    
   );
}

ReactDOM.render(<CalibrationControl />, document.getElementById("root"));