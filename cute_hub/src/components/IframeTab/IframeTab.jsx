import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// KNOWN ISSUE:
// Command display does not actively render, must be closed then opened to show responses from the LogMsg function,
// this only happens on button pushes/active command switch,
// typing into the console is fine.

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 20,
    display: "inline-block",
  },
  paperbig: {
    maxWidth: 333,
    height: 475,
    backgroundColor: "white",
    border: "solid",
    borderWidth: 0.5,
    borderColor: "#009fdf",
  },
  papersliver: {
    width: "100%",
    height: "0%"

  },
}));



export default function IframeTab(props) {

    const classes = useStyles();

  return (
    <iframe src={props.url} width={props.innerWidth} height={props.innerHeight}></iframe>
  );
}
