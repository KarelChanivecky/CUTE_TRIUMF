import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Slider from '@material-ui/core/Slider';
import { TextField } from '@material-ui/core';

function getMarks() {
   let marks = []
   for (let i = 0, m = -10; i < 17; ++i, m += 10) {
      marks[i] = {
         value: m,
         label: '' + m + '',
      }
   }
   // Proof that we can have a second mark representing the current position mark
   // marks[17] = {
   //    value : 76,
   //    label : 'current'
   // }
   return marks;
}

function getOrientation(props) {
   let orient = "horizontal";
   if (window.innerWidth < window.innerHeight) {
      orient = "vertical";
   }
   return orient;
}

function getCalibDivClass() {
   return (window.innerWidth < window.innerHeight) ? "calib_control_vertical" : "calib_control_horizontal";
}

function CalibrationSlider(props) {
   console.log(props)
   return (      
      <div  id="calibration_widget">
         <div className={getCalibDivClass()}  id="calibration_Slider">
            <Slider
            defaultValue={80}
            orientation={(window.innerWidth < window.innerHeight)?"vertical":"horizontal"}
            aria-labelledby="discrete-slider-always"
            step={1}
            marks={getMarks()}
            min={-10}
            max={150}
            valueLabelDisplay="on"
            />
         </div>
         <TextField label="pos" type="number"></TextField>
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

// ReactDOM.render(<CalibrationControl />, document.getElementById("root"));