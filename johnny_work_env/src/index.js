import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Grid from "@material-ui/core/Grid";
import reportWebVitals from "./reportWebVitals";
import CommandLine from "./Components/commandline";
import DiscreteSlider from "./Components/Gauges/slider";
import App from "./App";
import FunctionButtons from "./Components/FunctionButtons/functionButtons";
import ActiveControl from "./Components/ActiveControl/ActiveControl";
import CryostatComp from "./Components/cryoskeleton2";
import Test from "./test3";
import Gauge from "./Components/Gauges/CryoGauge";
import Closed from "./Components/CryostatAlts/ClosedSec";
import Expand from "./Components/CryostatAlts/ExpandSec";

ReactDOM.render(<CryostatComp></CryostatComp>, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
