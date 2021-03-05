import React, { Component } from "react";
import "./App.css";
import { ThemeProvider, IconButton, TextField, Grid } from "@material-ui/core";
import theme from "./Themes/theme";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import OutputLine from "./Components/OutputLine";

class App extends Component {
  state = {
    output: [],
    display: "none",
    currentcmd: "",
    inputWidth: 320,
  };
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <OutputLine output={this.state.output} display={this.state.display} />
          <TextField
            onChange={this.handleChange}
            onKeyDown={this.handleSubmit}
            value={this.state.currentcmd}
            style={{ width: this.state.inputWidth }}
          ></TextField>
          <IconButton
            variant="contained"
            color="primary"
            onClick={this.handleClick}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </ThemeProvider>
      </div>
    );
  }

  handleClick = () => {
    let newDisplay = this.state.display == "none" ? "block" : "none";

    if (newDisplay != "none") {
      this.setState({ display: newDisplay, inputWidth: 482 });
    } else {
      this.setState({ display: newDisplay, inputWidth: 320 });
    }
  };
  handleChange = (e) => {
    this.setState({ currentcmd: e.target.value });
  };
  handleSubmit = (e) => {
    if (e.keyCode == 13) {
      const output = [...this.state.output, e.target.value];
      this.setState({ output, currentcmd: "" });
      console.log(output);
    }
  };
}

export default App;
