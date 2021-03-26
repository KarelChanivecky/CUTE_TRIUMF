import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";

//TODO I added the websocket module here
// import {w3cwebsocket as WebSocket} from "websocket"; //import the websocket module
////////////////////////// TEST VALUES
var testValues = [1,1,1];

function changeTestValues() {
  setTimeout(()=>{
    testValues = [
      parseFloat((Math.random() * .4 + .8).toFixed(1)),
      parseFloat((Math.random() * .4 + .8).toFixed(1)),
      parseFloat((Math.random() * .4 + .8).toFixed(1)),
    ]
    // console.log(testValues)
    changeTestValues()
  }, 2000)
}

//changeTestValues();
/////////////////////////////////////////

const useStyles = makeStyles((theme) => ({
  paperroot: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    "& div": {
      margin: 19}
  },
}));

const marks = ()=>{
  let marks = []
  for (let i = 0, m = 0; i < 9; ++i, m += .25) {
     marks[i] = {
        value: m,
        label: '' + m + '',
     }
  }
  return marks;
}

const StyledSlider = withStyles({
  root: {
     color: 'primary',
     height: 8,
     width: 860,
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
})(Slider);

function valuetext(value) {
  return `${value}°C`;
}

// Draw the 3 damper position
export default function CryoGauge(props) {
  const classes = useStyles();
  //
    //create the websocket instance, or at least a null reference to it 
    const ws = React.useRef(null);

  // The next two functions set and reset the values of damper position sliders,
  // They do this based on the test values array at the top of the file.
  // Either change the test values array object or have them point at another object to accurately show the damper positions.

  // Set the initial values of the gauges
  // TODO I changed this line here
  const [damperPositions, setDamperPositions] = React.useState({
    a: 0.0,
    b: 0.0,
    c: 1.0,
  });
  
  const GaugeMessageReceive = (message)=>{
      //break the message up into a switch (c) and a msg 
      var c = message.data.substr(0,1);
      var msg = message.data.substr(2);
      switch (c) {

          case 'F': { // digital readouts (time, 3 x pos, 3 x weight, pressure, water level) //water level isn't here
              var v = msg.split(' ').map(Number);
              //console.log(v);
              var t = v.shift(); //removes first element of the array (time is not very useful)
              //var pos = v.splice(0,3); //starting at position 0, remove 3 elements
              setDamperPositions({
                  a: v[0].toFixed(2),
                  b: v[1].toFixed(2),
                  c: v[2].toFixed(2),
              });
              //var airPressure = v[0];
              //var airPressure = v.shift();
              //var loads = v.splice(0,3); //starting at position 0, remove 3 elements
          }
          // proves that this is successfully communicates with server when it recieves a message.
          // default : {
          //   setDamperPositions({
          //     a: 1,
          //     b: 1,
          //     c: 1
          // });
          // } 
          break;
      }
  }

  // Reset the values every second to display the current value.
  //TODO I'm going to change this function, but I'll just comment it out for now
  React.useEffect(()=>{
    props.cryostatWS.addEventListener('message', GaugeMessageReceive, true);
    return () => props.cryostatWS.removeEventListener('message', GaugeMessageReceive, true);
  }, []); //TODO put an empty brack there

  //React.useEffect(()=>{
  //  let secTimer = setInterval(() => {
  //      setDamperPositions({
  //          a: props.suspension[0],
  //      b: props.suspension[1],
  //      c: props.suspension[2],
  //      })
  //    }, 1000)
  //    // ^ you can change this time interval to anything

  //    // return value is important
  //    return () => clearInterval(secTimer);
  //});

  return (
    <div className={classes.paperroot}>
      <Grid container direction="row">
        <Grid item xs={2}>
          <StyledSlider
            value={damperPositions.a}
            valueLabelDisplay="on"
            orientation="vertical"
            step={0.1}
            marks={marks()}
            min={0}
            max={2}
          />
        </Grid>
        <Grid item  xs={2}>
          <StyledSlider
            valueLabelDisplay="on"
            value={damperPositions.b}
            orientation="vertical"
            step={0.1}
            marks={marks()}
            min={0}
            max={2}
          />
        </Grid>
        <Grid item xs={2}>
          <StyledSlider
            valueLabelDisplay="on"
            value={damperPositions.c}
            orientation="vertical"
            step={1}
            marks={marks()}
            min={0}
            max={2}
          />
        </Grid>
      </Grid>
    </div>
  );


//   <div className={classes.paperroot}>
//   <div className=".container">
//     <StyledSlider
//       value={damperPositions.a}
//       valueLabelDisplay="on"
//       orientation="vertical"
//       step={0.1}
//       marks={marks()}
//       min={0}
//       max={2}
//     />
//     <StyledSlider
//       valueLabelDisplay="on"
//       value={damperPositions.b}
//       orientation="vertical"
//       step={0.1}
//       marks={marks()}
//       min={0}
//       max={2}
//     />
//     <StyledSlider
//       valueLabelDisplay="on"
//       value={damperPositions.c}
//       orientation="vertical"
//       step={0.1}
//       marks={marks()}
//       min={0}
//       max={2}
//     />
//   </div>
// </div>
}
