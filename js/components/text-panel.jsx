import React, {Component, PropTypes} from 'react';

class TextPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text || '',
      readyWords: [] 
    };
    this.state.words = this.splitText(this.state.text);
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
      this.setState({
        words: words,
        readyWords: readyWords,
      });
    }
  }

  removeWord(word) {
    var readyWords = this.state.readyWords;
    var index = readyWords.findIndex(_word => _word === word);
    if (index >= 0) {
      readyWords.splice(index, 1);
    }
    this.setState({ readyWords: readyWords });
  }

  render() {
    return (
      <div>
        <button onClick={this.showWord.bind(this)}>showWord</button>
        <button onClick={this.removeWord.bind(this, 'una')}>removeWord</button>
        <div className="wordsContainer">
          {this.state.readyWords.map((word, index) => <span className="word" key={`word-${index}`}>{word}</span>)}
        </div>
      </div>
    );
  }
}

TextPanel.PropTypes = {
  text: PropTypes.string,
  words: React.PropTypes.arrayOf(React.PropTypes.string),
  readyWords: React.PropTypes.arrayOf(React.PropTypes.string)
};

export default TextPanel;