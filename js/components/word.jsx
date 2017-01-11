require('../../css/components/word.css');

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

class Word extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: props.animate,
      cssClasses: 'Word'
    }
  }

  componentDidMount() {
    setTimeout(function() {
      this.setState({ cssClasses: `${this.state.cssClasses} ready` });
    }.bind(this), 10);
  }

  render() {
    return (
      <div className="wrapper">
        <span className={this.state.cssClasses} style={{left: this.props.left + '%'}}>{this.props.defaultValue}</span>
      </div>
    );
  }
};

Word.PropTypes = {
  defaultValue: PropTypes.string.isRequired,
  left: PropTypes.number.isRequired,
  animate: PropTypes.bool
};

Word.defaultProps = {
  animate: false
};

export default Word;