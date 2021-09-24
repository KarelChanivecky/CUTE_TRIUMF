import { Typography } from "@material-ui/core";
import React, { Component } from "react";

// This is the output box of the command line which displays the commands.
class OutputLine extends Component {
  //Scrolls the command line to the bottom always
  //TODO: disabled the scrolling to bottom functionality
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    //this.scrollToBottom();
  }

  componentDidUpdate() {
    //this.scrollToBottom();
  }

  render() {
    return (
      <div
        id={"commandContainer"}
        style={{
          borderRadius : 10,
          display: this.props.display,
          width: 530,
          height: 520,
          overflowY: "auto",
          backgroundColor: "#0a2654",
          float: "left"
        }}
      >
        {this.props.output.map((text, index) => (
          <div key={text + index} style={{ color: "white", display: "flex", paddingLeft: 5}}>
            <Typography style={{whiteSpace:"pre-line"}} display="inline" align="left">{text}</Typography>
          </div>
        ))}
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            this.messagesEnd = el;
          }}
        ></div>
      </div>
    );
  }
}

export default OutputLine;
