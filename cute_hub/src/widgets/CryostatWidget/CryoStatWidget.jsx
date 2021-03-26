import React from "react";
import { Box, makeStyles, Paper } from "@material-ui/core";
import ToggleHeader from "../../components/ToggleHeader/ToggleHeader";
import { ModuleDisplayStates } from "../../constants/moduleDisplayStates";
import CryostatComp from "../../components/CryostatComponents/CryostatComp";
import {WidgetNames} from "../../constants/widgetNames";

export default function CryoStatWidget(props) {
  const displayState = props.displayState;

  let width = props.width ? props.width : 6;
  let height =  40;

  switch (displayState) {
    case ModuleDisplayStates.OPEN:
      height = props.height ? props.height : 70;
      width = 90;
      break;
    case ModuleDisplayStates.EXPANDED:
      height = props.height ? props.height : 80;
      width = 140;
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
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
          name={props.noName? null :WidgetNames.CRYOSTAT}
        />
        <CryostatComp expanded={displayState === ModuleDisplayStates.EXPANDED} onDisplayChange={props.onDisplayChange ?? null} cryostatWS={props.cryostatWS}/>
      </Paper>
    </Box>
  );
}
