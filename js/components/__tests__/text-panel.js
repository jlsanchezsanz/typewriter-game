var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-dom/lib/ReactTestUtils');
var expect = require('expect');
var TextPanel = require('../text-panel').default;

describe('TextPanel', function() {
  var textPanel;

  beforeEach(function() {
    textPanel = TestUtils.renderIntoDocument(<TextPanel text="this is a mock text" />);
  });

  describe('Check its properties', function() {
    it('should have "text" property', function() {
      expect(TextPanel.PropTypes.text).toEqual(React.PropTypes.string);
    });

    it('should have "word" property', function() {
      expect(TextPanel.PropTypes.word).toEqual(React.PropTypes.string);
    });
  });

  describe('Behavior', function() {
    it('should divide "text" into "words"', function() {
      expect(textPanel.state.text.length).toEqual(19);
      expect(textPanel.state.words.length).toEqual(5);
    });

    it('should show one word when showWord() is executed', function() {
      expect(textPanel.state.words.length).toEqual(5);
      expect(textPanel.state.readyWords.length).toEqual(0);
      textPanel.showWord();
      expect(TestUtils.findRenderedDOMComponentWithClass(textPanel, 'Word').innerText).toEqual('this');
      expect(textPanel.state.words.length).toEqual(4);
      expect(textPanel.state.readyWords.length).toEqual(1);
    });

    it('should remove a specific word when removeWord() is executed', function() {
      textPanel.showWord();
      expect(textPanel.state.readyWords.length).toEqual(1);
      expect(TestUtils.findRenderedDOMComponentWithClass(textPanel, 'Word').innerText).toEqual('this');
      textPanel.removeWord('this');
      expect(textPanel.state.readyWords.length).toEqual(0);
    });

    it('should look for "word" in "words" and remove it if found', function() {
      textPanel.showWord();
      expect(textPanel.state.readyWords.length).toEqual(1);
      textPanel = TestUtils.renderIntoDocument(<TextPanel text="this is a mock text" word="this" />);
      expect(textPanel.state.readyWords.length).toEqual(0);
    });
  });
});