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
    displayState === expandedModules.FRIDGE
      ? ModuleDisplayStates.EXPANDED
      : displayState === expandedModules.BOTH
      ? ModuleDisplayStates.OPEN
      : ModuleDisplayStates.MINIMIZED;

  const cryoModuleState =
    displayState === expandedModules.CRYO
      ? ModuleDisplayStates.EXPANDED
      : displayState === expandedModules.BOTH
      ? ModuleDisplayStates.OPEN
      : ModuleDisplayStates.MINIMIZED;

  const handleExpandedChange = (module) => () => {
    const otherModule =
      module === expandedModules.CRYO
        ? expandedModules.FRIDGE
        : expandedModules.CRYO;

    if (displayState === otherModule || displayState === expandedModules.NONE) {
      // expanding
      if (displayState === expandedModules.NONE) {
        setDisplayState(module);
      } else {
        setDisplayState(expandedModules.BOTH);
      }
      return;
    }
    // minimizing
    if (displayState === expandedModules.BOTH) {
      setDisplayState(otherModule);
    } else {
      setDisplayState(expandedModules.NONE);
    }
  };

  return (
    <Grid container>
      <Grid item container lg={12} direction="column">
        <Grid item container lg={12} justify="space-between">
          <DiagramWidget
            displayState={fridgeModuleState}
            minimizable
            onDisplayChange={handleExpandedChange(expandedModules.FRIDGE)}
          />
          <CryoStatWidget
            displayState={cryoModuleState}
            minimizable
            onDisplayChange={handleExpandedChange(expandedModules.CRYO)}
          />
        </Grid>
      </Grid>
      <CalibrationWidget displayState={fridgeModuleState} minimizable />
    </Grid>
  );
}

export default CalibCryoFridgeWideTab;
