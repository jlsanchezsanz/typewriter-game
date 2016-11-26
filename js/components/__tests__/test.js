var React = require('react');
var TestUtils = require('react-dom/lib/ReactTestUtils');
var expect = require('expect');
var Hello = require('../hello').default;

describe('root', function() {
  it('renders without problems', function() {
    var hello = TestUtils.renderIntoDocument(<Hello/>);
    expect(hello).toExist();
  });
});