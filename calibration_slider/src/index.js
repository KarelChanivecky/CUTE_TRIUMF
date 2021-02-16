import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Slider from '@material-ui/core/Slider';

function getMarks() {
   let marks = []
   for (let i = 0, m = -10; i < 17; ++i, m += 10) {
      marks[i] = {
         value: m,
         label: '' + m + '',
      }
   }
   return marks;
}

function getOrientation() {
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
   return (      
      <div className={getCalibDivClass()} id="calibration_widget">
      <div id="calibration_Slider"/>
         <Slider
         defaultValue={80}
         orientation={getOrientation()}
         // getAriaValueText={valuetext}
         aria-labelledby="discrete-slider-always"
         step={1}
         marks={getMarks()}
         min={-10}
         max={150}
         valueLabelDisplay="on"
         />
      </div>
   );
}

//testing resizing rerender
function CalibrationControl() {
   const [dimensions, setDimensions] = React.useState({ 
      height: window.innerHeight,
      width: window.innerWidth
   })
   
   React.useEffect(() => {
   function handleResize() {
      setDimensions({
         height: window.innerHeight,
         width: window.innerWidth
      })
   }

   window.addEventListener('resize', handleResize)

   return _ => {
      window.removeEventListener('resize', handleResize)
   }
   })
   return (
         <CalibrationSlider />
   );
}

ReactDOM.render(<CalibrationControl />, document.getElementById("root"));