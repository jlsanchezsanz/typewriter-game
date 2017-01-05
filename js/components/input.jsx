import React, {Component, PropTypes} from 'react';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || '',
      autofocus: props.autofocus,
      keyStrokes: 0,
      disabled: props.disabled || false,
      onDataChange: props.onDataChange || function() {}
    };
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

  componentWillReceiveProps(nextProps) {
    if (this.props.disabled !== nextProps.disabled) {
      this.setState({ disabled: nextProps.disabled });
    }

    if (nextProps.defaultValue !== undefined && this.state.value !== nextProps.defaultValue) {
      this.setState({ value: nextProps.defaultValue });
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          autoFocus={this.state.autofocus}
          disabled={this.state.disabled}
          value={this.state.value}
          onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}

Input.PropTypes = {
  defaultValue: PropTypes.string,
  autofocus: PropTypes.bool,
  disabled: PropTypes.bool,
  keyStrokes: PropTypes.number,
  onDataChange: PropTypes.function
};

export default Input;