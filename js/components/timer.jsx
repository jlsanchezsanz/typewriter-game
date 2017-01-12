import React, {Component, PropTypes} from 'react';

class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timeLeft: props.timeLeft || 0,
      time: 0,
      running: false,
      onDataChange: props.onDataChange || function() {},
      interval: null
    }
  }

  countdown() {
    this.setState({
      timeLeft: this.state.timeLeft - 1,
      time: this.state.time + 1
    });
    if (!this.state.timeLeft) {
      clearInterval(this.state.interval);
      this.setState({
        running: false,
        interval: null
      });
    }
    this._fireDataChange({
      timeLeft: this.state.timeLeft,
      time: this.state.time,
      running: this.state.running
    });
  }

  _fireDataChange(data) {
    this.state.onDataChange(data);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ timeLeft: nextProps.timeLeft });
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
  timeLeft: PropTypes.number,
  running: PropTypes.bool,
  onDataChange: PropTypes.func
}

export default Timer;