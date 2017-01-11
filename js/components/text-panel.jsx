require('../../css/components/text-panel.css');

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Word from './word';

class TextPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text || '',
      word: props.word || '',
      readyWords: [],
      onWordFound: props.onWordFound || function() {},
      onWordNotFound: props.onWordNotFound || function() {}
    };
    this.state.words = this.splitText(this.state.text);
    this.positions = [];
  }

  splitText(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#]/g, '').replace(/\n/, ' ').toLowerCase().split(' ');
  }

  showWord() {
    if (this.state.words) {
      var words = this.state.words;
      var readyWords = this.state.readyWords;
      var word = words.shift();
      readyWords.push(word);
      this.positions.push(Math.floor(Math.random() * 100));
      this.setState({
        words: words,
        readyWords: readyWords
      });
    }
  }

  removeWord(word) {
    var readyWords = this.state.readyWords;
    var index = readyWords.findIndex(_word => _word === word);
    if (index >= 0) {
      readyWords.splice(index, 1);
      this.positions.splice(index, 1);
      this.setState({ readyWords: readyWords });
      return true;
    }
  }

  _fireWordFound(data) {
    this.state.onWordFound(data);
  }

  _fireWordNotFound() {
    this.state.onWordNotFound();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.word !== this.props.word && nextProps.word.length) {
      var matches = this.state.readyWords.filter(_word => _word.indexOf(nextProps.word) === 0);
      if (!matches.length) {
        this._fireWordNotFound();
      } else if (this.removeWord(nextProps.word)) {
        this._fireWordFound(nextProps.word);
      }
    }
  }

  render() {
    return (
      <div className="TextPanel">
        <div className="words-container">
          {this.state.readyWords.map((word, index) => <Word key={`word-${index}`} defaultValue={word} left={this.positions[index]}/>)}
        </div>
      </div>
    );
  }
}

TextPanel.PropTypes = {
  text: PropTypes.string,
  word: React.PropTypes.string,
  onWordFound: PropTypes.function,
  onWordNotFound: PropTypes.function
};

export default TextPanel;