import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

var testValues = [1,1,1];

function move_source() {
  setTimeout(()=>{
    testValues = [
      Math.random() * 2,
      Math.random() * 2,
      Math.random() * 2
    ]
    console.log(testValues)
    move_source()
  }, 1000)
}

move_source();

const useStyles = makeStyles((theme) => ({
  paperroot: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    "& div": {
      display: "flex",
      justifyContent: "space-between",
      margin: 30}
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
    color: '#52af77',
    height: 8,
    width: 860,
  },
  vertical: {
    color: '#52af77',
    width: 8,
    height: 800,
    '& $rail': {
      width: 10
    },
    '& $track': {
      width: 8
    },
    '& $thumb': {
      marginLeft: -7,
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

function valuetext(value) {
  return `${value}°C`;
}

export default function CryoGauge(props) {
  const classes = useStyles();

  const [damperPositions, setDamperPositions] = React.useState({
    a: testValues[0],
    b: testValues[1],
    c: testValues[2],
  });
  
  React.useEffect(()=>{
    let secTimer = setInterval(() => {
        setDamperPositions({
          a: testValues[0],
          b: testValues[1],
          c: testValues[2],
        })
      }, 1000)
  
      return () => clearInterval(secTimer);
  });

  return (
    <div className={classes.paperroot}>
      <div className=".container">
        <StyledSlider
          value={damperPositions.a}
          valueLabelDisplay="on"
          orientation="vertical"
          step={0.1}
          marks={marks()}
          min={0}
          max={2}
        />
        <StyledSlider
          valueLabelDisplay="on"
          value={damperPositions.b}
          orientation="vertical"
          step={0.1}
          marks={marks()}
          min={0}
          max={2}
        />
        <StyledSlider
          valueLabelDisplay="on"
          value={damperPositions.c}
          orientation="vertical"
          step={0.1}
          marks={marks()}
          min={0}
          max={2}
        />
      </div>
    </div>
  );
}
