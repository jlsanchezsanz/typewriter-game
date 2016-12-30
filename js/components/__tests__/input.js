var React = require('react');
var TestUtils = require('react-dom/lib/ReactTestUtils');
var expect = require('expect');
var Input = require('../input').default;
var input;
var innerInput;

describe('Input', function() {
  beforeEach(function() {
    input = TestUtils.renderIntoDocument(<Input/>);
    innerInput = TestUtils.findRenderedDOMComponentWithTag(input, 'input');
  });

  describe('Mount component', function() {
    it('should have an instance of html input element', function() {
      expect(innerInput).toExist();
    });
  });

  describe('Check its properties', function() {
    it('should have "defaultValue" property ', function() {
      expect(Input.PropTypes.defaultValue).toEqual(React.PropTypes.string);
    });

    it('should have "autofocus" property', function() {
      expect(Input.PropTypes.autofocus).toEqual(React.PropTypes.bool);
    });

    it('should have "keyStrokes" property', function() {
      expect(Input.PropTypes.keyStrokes).toEqual(React.PropTypes.number);
    });
  });

  describe('Value', function() {
    it('should update value on input keydown', function() {
      innerInput.value = 'randomValue';
      TestUtils.Simulate.keyDown(innerInput, {key: 'a', which: 65});
      TestUtils.Simulate.change(innerInput);
      expect(innerInput.value).toEqual('randomValue');
    });
  });

  describe('Clean', function() {
    it('should be cleaned when "clean" method is executed', function() {
      innerInput.value = 'randomValue';
      TestUtils.Simulate.change(innerInput);
      expect(innerInput.value).toEqual('randomValue');
      input.clean();
      expect(innerInput.value).toEqual('');
    });
  });

  describe('Publish info', function() {
    it('should update number of strokes on keydown', function() {
      expect(input.getKeyStrokes()).toEqual(0);
      TestUtils.Simulate.keyDown(innerInput, {key: 'a', which: 65});
      TestUtils.Simulate.change(innerInput);
      expect(input.getKeyStrokes()).toEqual(1);
    });
  });
});