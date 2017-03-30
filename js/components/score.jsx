require('../../css/components/score.css');

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

class Score extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyStrokes: props.keyStrokes,
      completedWords: props.completedWords,
      time: props.time,
      errors: props.errors,
      keyStrokesPerMin: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.time !== this.state.time) {
      this.setState({
        time: nextProps.time,
        keyStrokesPerMin: this.getKeyStrokesPerMin(nextProps.keyStrokes, nextProps.time)
      });
    }
    if (nextProps.errors !== this.state.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.keyStrokes !== this.state.keyStrokes) {
      this.setState({
        keyStrokes: nextProps.keyStrokes,
        keyStrokesPerMin: this.getKeyStrokesPerMin(nextProps.keyStrokes, nextProps.time)
      });
    }
    if (nextProps.completedWords !== this.state.completedWords) {
      this.setState({ completedWords: nextProps.completedWords });
    }
  }

  getKeyStrokesPerMin(strokes, time) {
    return (strokes !== 0 && time !== 0) ? Math.floor(60 * (strokes / time)) : 0;
  }

  render() {
    return (
      <div className="Score">
        <p>keyStrokes: {this.state.keyStrokes}</p>
        <p>keyStrokes/min: {this.state.keyStrokesPerMin}</p>
        <p>completed words: {this.state.completedWords}</p>
        <p>errors: {this.state.errors}</p>
      </div>
    );
  }

}

Score.PropTypes = {
  time: PropTypes.number,
  keyStrokes: PropTypes.number,
  completedWords: PropTypes.number,
  errors: PropTypes.number
};

export default Score;