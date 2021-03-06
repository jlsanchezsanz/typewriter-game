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
      onWordNotFound: props.onWordNotFound || function() {},
      words: this.splitText(props.text)
    };
  }

  splitText(text) {
    return text.replace(/[-[\]{}()*+?.,:;\\^$|#]/g, '').replace(/\n/, ' ').toLowerCase().split(' ');
  }

  showWord() {
    if (this.state.words) {
      var words = this.state.words;
      var readyWords = this.state.readyWords;
      var word = words.shift();
      readyWords.push({
        value: word,
        index: readyWords.length,
        position: Math.floor(Math.random() * 100),
        completed: false
      });
      this.setState({
        words: words,
        readyWords: readyWords
      });
    }
  }

  removeWord(word) {
    var readyWords = this.state.readyWords;
    var index = readyWords.findIndex(_word => !_word.completed && _word.value === word);
    if (index >= 0) {
      readyWords[index].completed = true;
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

  onNotCompletedWord(word) {
    var readyWords = this.state.readyWords;
    readyWords[word.split('-')[1]].completed = true;
    this.setState({ readyWords: readyWords });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.word !== this.props.word && nextProps.word.length) {
      var matches = this.state.readyWords.filter(_word => _word.value.indexOf(nextProps.word) === 0 && !_word.completed);
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
          {this.state.readyWords.map((word, index) => !word.completed
            ? <Word
                key={`${word.value}-${word.index}`}
                id={`${word.value}-${word.index}`}
                defaultValue={word.value}
                left={word.position}
                onNotCompleted={this.onNotCompletedWord.bind(this)} />
            : null)}
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