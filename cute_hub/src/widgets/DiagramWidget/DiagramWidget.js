import React from 'react';
import {useState, useEffect} from 'react'
import './DiagramWidget.css';
import DiagramSVG from '../../components/DiagramSVG/DiagramSVG'
import DiagramList from '../../components/DiagramList/DiagramList'
import {Box, makeStyles, Paper} from "@material-ui/core";
import ToggleHeader from "../../components/ToggleHeader/ToggleHeader";
import {ModuleDisplayStates} from "../../constants/moduleDisplayStates";

export default function DiagramWidget(props) {
  // const [width, setWidth] = useState(window.innerWidth);
  // const breakpoint = 620;

  // useEffect(() => {
  //   const handleWindowResize = () => setWidth(window.innerWidth)
  //   window.addEventListener("resize", handleWindowResize);

  //   // Return a function from the effect that removes the event listener
  //   return () => window.removeEventListener("resize", handleWindowResize);
  // }, []);

  // return width < breakpoint ? <DiagramList /> : <DiagramSVG />;

  const displayState = props.displayState;

    let width = props.width ? props.width : 30;
    let height = props.height ? props.height : 80;

    switch (displayState) {
        case ModuleDisplayStates.OPEN :
            height = 70;
            width = 80;
            break;
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(1),
                width: theme.spacing(width),
                height: theme.spacing(height),
            },
            '& > * > .diag': {
              width: theme.spacing(width+20),
              height: theme.spacing(height+20),
          },
        },
    }));
    const classes = useStyles()
    let thing = displayState === ModuleDisplayStates.OPEN ? <DiagramSVG className={classes.diag}/> : <DiagramList />
    return (
      <Box className={classes.root}>
          <Paper>
              <ToggleHeader minimizable={props.minimizable}
                            helpable={displayState !== ModuleDisplayStates.MINIMIZED}
                            onToggle={props.onDisplayChange}/>
              {thing}
          </Paper>
      </Box>

  )
}
