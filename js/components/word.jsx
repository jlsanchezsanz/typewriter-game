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
    ReactDOM.findDOMNode(this.refs.word).addEventListener('transitionend', this.props.onNotCompleted.bind(this, this.props.id));
  }

  componentWillUnmount () {
    ReactDOM.findDOMNode(this.refs.word).removeEventListener('transitionend', null);
  }

  render() {
    return (
      <span ref="word" className={this.state.cssClasses} style={{left: this.props.left + '%'}}>{this.props.defaultValue}</span>
    );
  }
};

Word.PropTypes = {
  defaultValue: PropTypes.string.isRequired,
  left: PropTypes.number.isRequired,
  animate: PropTypes.bool,
  onNotCompleted: PropTypes.function
};

Word.defaultProps = {
  animate: false,
  onNotCompleted: function() {}
};

export default Word;