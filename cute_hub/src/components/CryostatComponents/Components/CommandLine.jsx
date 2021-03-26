import React, {Component} from "react";
import {IconButton, TextField, ThemeProvider} from "@material-ui/core";
import theme from "./theme";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import OutputLine from "./OutputLine";

class CommandLine extends Component {
    state = {
        output: this.props.commands,
        display: this.props.init,
        currentcmd: "",
        inputWidth: this.props.initWidth,
    };

    //Handles the size of the input line on prompt resize
    handleClick = () => {
        if (this.state.display !== "none") {
            this.setState({inputWidth: 482});
        } else {
            this.setState({inputWidth: 320});
        }
    };

    //Handles the change in the input line
    handleChange = (e) => {
        this.setState({currentcmd: e.target.value});
    };

    //Checks to see if the key pressed is the enter key and handles it
    handleSubmit = (e) => {
        if (e.keyCode === 13) {
            const output = [...this.state.output, e.target.value];
            this.setState({output, currentcmd: ""});
            this.props.sendCommand(e.target.value, output);
        }
    };

  render() {
    return (
        <ThemeProvider theme={theme}>
          <OutputLine output={this.state.output} display={this.state.display} />
          <TextField
            onChange={this.handleChange}
            onKeyDown={this.handleSubmit}
            value={this.state.currentcmd}
            style={{width: this.state.inputWidth}}
            />
          <IconButton
            variant="contained"
            color="primary"
            onClick={ this.props.onclick ? () => {
              this.props.onclick(this.state.output);
            }
            : null}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </ThemeProvider>
    );
  }
}

export default CommandLine;
