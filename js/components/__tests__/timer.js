var React = require('react');
var TestUtils = require('react-dom/lib/ReactTestUtils');
var expect = require('expect');
var sinon = require('sinon/pkg/sinon');
var Timer = require('../timer').default;


describe('Timer', function() {
  var timer;
  var onDataChange;
  var clock;

  beforeEach(function() {
    onDataChange = function() {};
    timer = TestUtils.renderIntoDocument(<Timer time="30" onDataChange={onDataChange} />);
    clock = sinon.useFakeTimers();
  });

  describe('Mount component', function() {
  });

  describe('Check its properties', function() {
    it('should have "time" property', function() {
      expect(Timer.PropTypes.time).toEqual(React.PropTypes.number);
    });

    it('should have "running" property', function() {
      expect(Timer.PropTypes.running).toEqual(React.PropTypes.bool);
    });

    it('should have "onDataChange" property', function() {
      expect(Timer.PropTypes.onDataChange).toEqual(React.PropTypes.func);
    });
  });

  describe('Behavior', function() {
    it('should countdown', function() {
      timer.countdown();
      expect(timer.state.timeLeft).toEqual(29);
    });

    it('should update data', function() {
      var spy = expect.spyOn(timer.state, 'onDataChange');
      timer.countdown();
      expect(spy.calls.length).toEqual(1);
    });

    it('should set "running" to false when timeLeft is 0', function() {

      expect(timer.state.running).toEqual(false);
    });
  });
});