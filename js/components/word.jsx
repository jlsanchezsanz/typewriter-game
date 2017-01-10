require('../../css/components/word.css');

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

class Word extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
      animate: props.animate,
      cssClasses: 'Word'
    }
  }

  componentDidMount() {
    setTimeout(function() {
      this.setState({ cssClasses: this.state.cssClasses + ' ready'});
    }.bind(this), 10);
  }

  render() {
    return (<span className={this.state.cssClasses}>{this.state.value}</span>);    
  }
};

Word.PropTypes = {
  defaultValue: PropTypes.string.isRequired,
  animate: PropTypes.bool
};

Word.defaultProps = {
  animate: false
};

export default Word;