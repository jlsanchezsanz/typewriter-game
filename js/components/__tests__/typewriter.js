var React = require('react');
var TestUtils = require('react-dom/lib/ReactTestUtils');
var expect = require('expect');
var Typewriter = require('../typewriter').default;


describe('Typewriter', function() {
  var typewriter;
  var input;
  var textPanel;

  beforeEach(function() {
    typewriter = TestUtils.renderIntoDocument(<Typewriter />);
    input = TestUtils.scryRenderedDOMComponentsWithTag(typewriter, 'Input');
    textPanel = TestUtils.scryRenderedDOMComponentsWithTag(typewriter, 'TextPanel');
  });

  describe('Mount component', function() {
    it('should have an instance of Input component', function() {
      expect(input).toExist();
    });

    it('should have an instance of TextPanel component', function() {
      expect(textPanel).toExist();
    });
  });
});