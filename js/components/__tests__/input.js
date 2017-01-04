var React = require('react');
var TestUtils = require('react-dom/lib/ReactTestUtils');
var expect = require('expect');
var Input = require('../input').default;

describe('Input', function() {
  var input;
  var innerInput;

  beforeEach(function() {
    var onDataChange = function() {};
    input = TestUtils.renderIntoDocument(<Input onDataChange={onDataChange} />);
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

    it('should have "disabled" property', function() {
      expect(Input.PropTypes.disabled).toEqual(React.PropTypes.bool);
    });

    it('should have "keyStrokes" property', function() {
      expect(Input.PropTypes.keyStrokes).toEqual(React.PropTypes.number);
    });

    it('should have "onDataChange" property', function() {
      expect(Input.PropTypes.onDataChange).toEqual(React.PropTypes.function);
    });
  });

  describe('Value', function() {
    it('should update value on input keydown', function() {
      innerInput.value = 'randomValue';
      TestUtils.Simulate.change(innerInput);
      expect(input.state.value).toEqual('randomValue');
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
    it('should update number of strokes on change value', function() {
      expect(input.state.keyStrokes).toEqual(0);
      TestUtils.Simulate.keyDown(innerInput, {key: 'a', keyCode: 65});
      TestUtils.Simulate.change(innerInput);
      expect(input.state.keyStrokes).toEqual(1);
    });

    it('should execute onDataChange method on change value', function() {
      innerInput.value = 'randomValue';
      var spy = expect.spyOn(input.state, 'onDataChange');
      TestUtils.Simulate.keyDown(innerInput, {key: 'a', keyCode: 65});
      TestUtils.Simulate.change(innerInput);
      expect(spy.getLastCall().arguments).toEqual([{keyStrokes: 1, value: 'randomValue'}]);
    });
  });
});