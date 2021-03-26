import {createMuiTheme} from "@material-ui/core/styles";

// https://www.triumf.ca/home/for-media/publicationsgallery/style-guide/colours
const triumfPalette = {
    primary: {
        main: "#009fdf",
        contrastText: "#FFF"
    },
    reversedPrimary: {
        main: "#FFF",
        dark: "#FFF",
        light: "#FFF",
        contrastText: "#009fdf"
    },
    secondary: {
        main: "#666666"
    },
    error: {
        main: "#DE163D"
    },
    warning: {
        main: "#FFCB04"
    },
    // info: {
    //     main: ""
    // },
    success: {
        main: "#0BDEA7"
    },
    backgroundLight: {
        main: "#F1F2F2"
    },
    backgroundMed: {
        main: "#CCCCCC"
    },

};

const triumfTypography = {
    fontFamily: [
        "Helvetica Neue",
        "Arial"
    ].join(", "),
    h1: {
        fontSize: "2rem",
    },
    h2: {
        fontSize: "1.7rem"
    },
    h3: {
        fontSize: "1.5rem",
    },
    // button: {
    //     fontSize: "0.92rem"
    // }
};

const muiThemeOptions = {
    palette: triumfPalette,
    typography: triumfTypography,
};
const triumfTheme = createMuiTheme(muiThemeOptions);

export default () => triumfTheme;