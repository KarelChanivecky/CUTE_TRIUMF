import React, { Component } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

class CommandLine extends Component {
  state = {
    currentcmd: "",
    output: [],
    outputboxStyle: {
      width: 500,
      height: 400,
      overflow: "auto",
      backgroundColor: "black",
    },
  };
  render() {
    return (
      <div>
        <div id="output" style={this.state.outputboxStyle}>
          {this.state.output.map((text) => (
            <span style={{ color: "white" }}>
              {text}
              <br></br>
            </span>
          ))}
        </div>
        <TextField
          id="outlined-basic"
          variant="outlined"
          style={{ width: 500 }}
          onKeyDown={this.keyPress}
          onChange={this.handleChange}
          value={this.state.currentcmd}
        />
        <IconButton aria-label="delete" onClick={this.expand}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    );
  }
  expand = () => {
    let newStyle =
      this.state.outputboxStyle === { display: "none" }
        ? {
            width: 500,
            height: 400,
            overflow: "auto",
            backgroundColor: "black",
          }
        : { display: "none" };
    this.setState({ outputboxStyle: newStyle });
    console.log(newStyle);
  };

  handleChange = (e) => {
    this.setState({ currentcmd: e.target.value });
  };

  keyPress = (e) => {
    if (e.keyCode == 13) {
      const output = [...this.state.output, e.target.value];
      this.setState({ currentcmd: "", output });
      console.log(e.target.value);
      console.log(output);
    }
  };
}

export default CommandLine;
