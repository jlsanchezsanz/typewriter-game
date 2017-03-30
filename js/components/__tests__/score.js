var React = require('react');
var TestUtils = require('react-dom/lib/ReactTestUtils');
var expect = require('expect');
var Score = require('../score').default;

describe('Score', function() {
  var score;

  beforeEach(function() {
    score = TestUtils.renderIntoDocument(<Score />);
  });

  describe('Mount component', function() {
    it('Should be instantiated', function() {
      
    });
  });

  describe('Check its properties', function() {
    it('should have "time" property ', function() {
      expect(Score.PropTypes.time).toEqual(React.PropTypes.string);
    });

    it('should have "keyStrokes" property', function() {
      expect(Score.PropTypes.keyStrokes).toEqual(React.PropTypes.bool);
    });

    it('should have "errors" property', function() {
      expect(Score.PropTypes.errors).toEqual(React.PropTypes.number);
    });

    it('should have "completedScores" property', function() {
      expect(Score.PropTypes.completedScores).toEqual(React.PropTypes.function);
    });
  });
});