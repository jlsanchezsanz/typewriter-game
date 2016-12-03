import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || '',
      autofocus: props.autofocus,
      keyStrokes: 0
    };
  }

  clean() {
    this.setState({ value: '' });
  }

  handleChange(e) {
    this.setState({ 
      value: e.target.value,
      keyStrokes: this.state.keyStrokes + 1
    });
  }

  getKeyStrokes() {
    return this.state.keyStrokes;
  }

  render() {
    return (
      <div>
        Input
        <input
          type="text"
          autoFocus={this.props.autofocus}
          value={this.state.value}
          onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}

Input.PropTypes = {
  defaultValue: PropTypes.string,
  autofocus: PropTypes.bool,
  keyStrokes: PropTypes.number
};

export default Input;