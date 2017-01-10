var React = require('react');
var TestUtils = require('react-dom/lib/ReactTestUtils');
var expect = require('expect');
var Word = require('../word').default;

describe('Word', function() {
  var word;

  beforeEach(function() {
    word = TestUtils.renderIntoDocument(<Word />);
  });

  describe('Mount component', function() {
    it('Should be instantiated', function() {

    });
  });

  describe('Check its properties', function() {
    it('should have "defaultValue" property ', function() {
      expect(Word.PropTypes.defaultValue).toEqual(React.PropTypes.string);
    });

    it('should have "animate" property', function() {
      expect(Word.PropTypes.animate).toEqual(React.PropTypes.bool);
    });
  });
});