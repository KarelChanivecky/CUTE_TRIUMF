import React from "react";
import { Box, makeStyles, Paper } from "@material-ui/core";
import ToggleHeader from "../../components/ToggleHeader/ToggleHeader";
import { ModuleDisplayStates } from "../../constants/moduleDisplayStates";
import CryostatComp from "../../components/CryostatComponents/CryostatComp";

export default function CryoStatWidget(props) {
  const displayState = props.displayState;

  let width = props.width ? props.width : 6;
  let height = props.height ? props.height : 40;

  switch (displayState) {
    case ModuleDisplayStates.OPEN:
      height = 70;
      width = 90;
      break;
    case ModuleDisplayStates.EXPANDED:
      height = 80;
      width = 140;
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        // margin: theme.spacing(1),
        // width: theme.spacing(width),
        // height: theme.spacing(height),
      },
    },
  }));
  const classes = useStyles();
  //let thing = (displayState == ModuleDisplayStates.OPEN) ?  <CryostatComp></CryostatComp> : <span></span>
  return (
    <Box className={classes.root}>
      <Paper>
        <ToggleHeader
          minimizable={props.minimizable}
          helpable={displayState !== ModuleDisplayStates.MINIMIZED}
          onToggle={props.onDisplayChange}
        />
        <CryostatComp expanded={displayState === ModuleDisplayStates.EXPANDED} onDisplayChange={props.onDisplayChange}/>
      </Paper>
    </Box>
  );
}
