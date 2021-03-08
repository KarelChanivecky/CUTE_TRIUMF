import React, { Component } from "react";
import "./App.css";
import { ThemeProvider, IconButton, TextField, Grid } from "@material-ui/core";
import theme from "./Themes/theme";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import OutputLine from "./Components/OutputLine";

class App extends Component {
  state = {
    output: this.props.commands,
    display: this.props.init,
    currentcmd: "",
    inputWidth: this.props.initWidth,
  };
  render() {
    return (
      <div style={{ width: 530 }}>
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
            onClick={this.props.onclick}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </ThemeProvider>
      </div>
    );
  }

  handleClick = () => {
    if (this.state.display != "none") {
      this.setState({ inputWidth: 482 });
    } else {
      this.setState({ inputWidth: 320 });
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
