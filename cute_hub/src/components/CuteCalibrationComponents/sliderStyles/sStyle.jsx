
import Slider from '@material-ui/core/Slider';
import {withStyles} from '@material-ui/core';
// This JSON object sets the style properties of the sliders
const userSliderStyles = {
   root: {
      color: 'primary',
      height: 8,
      width: 1200,
   },
   // css vertical sliders
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
      width: 100,
      left: 'calc(-50% + 2px)',
      fontSize: 15
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

const srcPosSliderStyles =  {
   root: {
      color: '#52af77',
      height: 8,
      width: 1200,
   },
   // css vertical sliders
   vertical: {
      color: '#52af77',
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
        marginLeft: -56,
        marginBottom: -11
      }

   },
   thumb: {
      height: 20,
      width: 20,
      borderRadius: 0,
      backgroundColor: 'currentColor',
      border: '1px solid currentColor',
      marginTop: -68,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
         boxShadow: 'inherit',
      },
   },
   active: {},
   valueLabel: {
      width: 100,
      left: 'calc(-50% + 2px)',
      fontSize: 15
   },
   track: {
      display: 'none',
      height: 8,
      borderRadius: 4,
   },
   rail: {
      display: 'none',
      marginTop: -8,
      height: 20,
      borderRadius: 4,
   },
}

// Creates a styled slider object that can be called like a regular slider with <StyledMovementSlider/>
// Used in the return value of CalibrationSlider
const StyledMovementSlider = withStyles(userSliderStyles)(Slider);

// Creates a new Slider object with specific styling
const StyledSourceSlider = withStyles(srcPosSliderStyles)(Slider);

export {StyledMovementSlider, StyledSourceSlider};