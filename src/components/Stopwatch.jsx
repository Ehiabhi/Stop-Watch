import React, { Component } from "react";

class Stopwatch extends Component {
  state = {
    status: false,
    ms: 0,
    seconds: 0,
    minutes: 0,
  };

  stopms;
  stopSeconds;
  stopMinutes;

  handleClick = () => {
    this.changeStatus();
    if (this.state.status) {
      clearInterval(this.stopms);
      clearInterval(this.stopSeconds);
      clearInterval(this.stopMinutes);
    } else {
      this.stopms = setInterval(this.changeMs, 1);
      this.stopSeconds = setInterval(this.changeSeconds, 1000);
      this.stopMinutes = setInterval(this.changeMinutes, 60000);
    }
  };

  changeStatus = () => {
    return this.setState((state) => {
      return { status: !state.status };
    });
  };

  changeMs = () => {
    return this.setState((state) => {
      if (state.ms === 99) {
        return { ms: 0 };
      } else {
        return { ms: state.ms + 1 };
      }
    });
  };

  changeSeconds = () => {
    return this.setState((state) => {
      if (state.seconds === 59) {
        return { seconds: 0 };
      } else {
        return { seconds: state.seconds + 1 };
      }
    });
  };

  changeMinutes = () => {
    return this.setState((state) => {
      if (state.seconds === 59) {
        return { minutes: 0 };
      } else {
        return { minutes: state.minutes + 1 };
      }
    });
  };

  handleReset = () => {
    clearInterval(this.stopms);
    clearInterval(this.stopSeconds);
    clearInterval(this.stopMinutes);
    this.setState({ seconds: 0, status: false, minutes: 0, ms: 0 });
  };

  componentWillUnmount() {
    clearInterval(this.stopms);
    clearInterval(this.stopSeconds);
    clearInterval(this.stopMinutes);
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.minutes} : {this.state.seconds} .{" "}
          <span>{this.state.ms}</span>
        </h1>
        <button className="btn btn-lg btn-dark" onClick={this.handleClick}>
          {this.state.status === false ? "Start" : "Stop"}
        </button>
        <button className="btn btn-lg btn-dark" onClick={this.handleReset}>
          Reset
        </button>
      </div>
    );
  }
}

export default Stopwatch;
