import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button'
import { makeStyles, TextField, withStyles } from '@material-ui/core';

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

const PrettoSlider = withStyles({
   root: {
     color: '#52af77',
     height: 8,
   },
   thumb: {
     height: 24,
     width: 24,
     backgroundColor: '#fff',
     border: '2px solid currentColor',
     marginTop: -8,
     marginLeft: -12,
     '&:focus, &:hover, &$active': {
       boxShadow: 'inherit',
     },
   },
   active: {},
   valueLabel: {
     left: 'calc(-50% + 4px)',
   },
   track: {
     height: 8,
     borderRadius: 4,
   },
   rail: {
     height: 8,
     borderRadius: 4,
   },
 })(Slider);

function CalibrationSlider(props) {
   // First value represents current position, Second Value represents desired position
   const [values, setValues] = React.useState([-10,80])
   
   const handleChange = (_event, newValue) => {
      setValues([values[0],  newValue]);
   }
   
   const handleInputChange = (event) => {
      setValues( [values[0], event.target.value === '' ? '' : Number(event.target.value)]);
   };
   
   const orientation = () => {return(props.screenwidth < props.screenheight)?"vertical":"horizontal";}


   return (      
      <div  
         className="calibration_widget">
         <div  
            className={getCalibDivClass()}
            id="calibration_slider">
            <PrettoSlider
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
            <PrettoSlider
               orientation={orientation()}
               value={values[0]}
               min={-10}
               max={150}
            />
         </div>
         <TextField 
            id="calibration_input"
            value={values[1]} 
            type="number"
            size='small'
            onChange={handleInputChange}
         />
         <Button 
            variant="contained" 
            color="primary"
            onClick={()=>{setValues([values[1],values[1]])}}>
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