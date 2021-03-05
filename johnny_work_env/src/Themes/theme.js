import { createMuiTheme } from "@material-ui/core";
import { deepPurple, amber } from "@material-ui/core/colors";
import { ArrowForwardIosIcon } from "@material-ui/icons/ArrowForwardIos";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#a5a1ac",
      contrastText: deepPurple[900],
    },
  },
});

theme.props = {
  MuiIconButton: {
    disableElevation: true,
  },

  MuiFormControl: {
    size: "small",
    margin: "dense",
  },

  MuiGrid: {
    alignContent: "stretch",
  },
};

theme.overrides = {
  MuiIconButton: {
    root: {
      borderRadius: 0,
      textTransform: "none",
    },
    containedPrimary: {
      "&:hover": {
        backgroundColor: "#a5a1ac",
        color: deepPurple[900],
      },
    },
  },
};
export default theme;
