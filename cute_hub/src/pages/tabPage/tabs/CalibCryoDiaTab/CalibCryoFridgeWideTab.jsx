import React, { useState } from "react";
import PlaceholderWidget from "../../../../widgets/placeholder/placeholderWidget";
import DiagramWidget from "../../../../widgets/DiagramWidget/DiagramWidget";
import { ModuleDisplayStates } from "../../../../constants/moduleDisplayStates";
import { Grid } from "@material-ui/core";
import CryoStatWidget from "../../../../widgets/CryostatWidget/CryoStatWidget";
import CalibrationWidget from "../../../../widgets/CuteCalibrationWidget/CalibrationWidget";

function CalibCryoFridgeWideTab(props) {
  const expandedModules = {
    NONE: "none",
    FRIDGE: "fridge",
    CRYO: "cryo",
    BOTH: "both",
  };

  const [displayState, setDisplayState] = useState(expandedModules.BOTH);

  const fridgeModuleState =
    (displayState === expandedModules.FRIDGE) ? ModuleDisplayStates.EXPANDED : 
      (displayState === expandedModules.BOTH) ? ModuleDisplayStates.OPEN : ModuleDisplayStates.MINIMIZED;

  const cryoModuleState =
    (displayState === expandedModules.CRYO) ? ModuleDisplayStates.EXPANDED : 
      (displayState === expandedModules.BOTH) ? ModuleDisplayStates.OPEN : ModuleDisplayStates.MINIMIZED;

  const handleExpandedChange = (module) => () => {

    if (displayState === expandedModules.BOTH) {
        setDisplayState(expandedModules.CRYO);
        return;
    }

    setDisplayState(expandedModules.BOTH);
  };

  return (
    <Grid container justify="center" alignItems="flex-start">
      <Grid item container lg={12} direction="column" >
        <Grid item container lg={12} justify="center">
          <DiagramWidget
            displayState={fridgeModuleState} 
            minimizable
            onDisplayChange={handleExpandedChange(expandedModules.FRIDGE)}
          />
          <CryoStatWidget
            displayState={cryoModuleState}
            minimizable
            onDisplayChange={handleExpandedChange(expandedModules.CRYO)}
            cryostatWS={props.cryostatWS}
          />
        </Grid>
      </Grid>
      <CalibrationWidget calibWebSock={props.calibWebSock} helpable />
    </Grid>
  );
}

export default CalibCryoFridgeWideTab;
