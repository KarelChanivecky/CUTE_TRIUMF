import React, { Component } from "react";

class OutputLine extends Component {
  //Scrolls the command line to the bottom always
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div
        id={"commandContainer"}
        style={{
          display: this.props.display,
          width: 530,
          height: 520,
          overflowY: "auto",
          backgroundColor: "black",
        }}
      >
        {this.props.output.map((text, index) => (
          <div key={text + index} style={{ color: "white"}}>
            {text}
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
