import React, {Component, PropTypes} from 'react';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || '',
      autofocus: props.autofocus,
      keyStrokes: 0,
      onDataChange: props.onDataChange || function() {}
    };
  }

  clean() {
    this.setState({ value: '' });
  }

  _fireDataChange(data) {
    this.state.onDataChange(data);
  }

  handleChange(e) {
    var state = {
      keyStrokes: this.state.keyStrokes + 1,
      value: e.target.value
    };
    this.setState(state);
    this._fireDataChange(state);
  }

  getKeyStrokes() {
    return this.state.keyStrokes;
  }

  render() {
    return (
      <div>
        <input
          type="text"
          autoFocus={this.state.autofocus}
          value={this.state.value}
          onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}

Input.PropTypes = {
  defaultValue: PropTypes.string,
  autofocus: PropTypes.bool,
  keyStrokes: PropTypes.number,
  onDataChange: PropTypes.function
};

export default Input;