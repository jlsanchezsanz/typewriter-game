import React, {Component, PropTypes} from 'react';

class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timeLeft: props.time || 0,
      running: false,
      onDataChange: props.onDataChange || function() {},
      interval: null
    }
  }

  countdown() {
    if (this.state.timeLeft) {
      this.setState({ timeLeft: this.state.timeLeft - 1 });
    } else {
      clearInterval(this.state.interval);
      this.setState({
        running: false,
        interval: null
      });
    }
    this._fireDataChange(this.state.timeLeft);
  }

  _fireDataChange(data) {
    this.state.onDataChange(data);
  }

  start() {
    this.setState({
      running: true,
      interval: setInterval(this.countdown.bind(this), 1000)
    });
  }

  render() {
    return (
      <span>{this.state.timeLeft}</span>
    );
  }

  componentDidMount() {
    this.start();
  }

}

Timer.PropTypes = {
  time: PropTypes.number,
  running: PropTypes.bool,
  onDataChange: PropTypes.func
}

export default Timer;