'use strict';

var React = require('react');
var createReactClass = require('create-react-class');
var RouteHandler = require('./components/RouteHandler');
var PropTypes = require('./PropTypes');

exports.Nested = createReactClass({
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        { className: 'Nested' },
        'Nested'
      ),
      React.createElement(RouteHandler, null)
    );
  }
});

exports.Foo = createReactClass({
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Foo' },
      'Foo'
    );
  }
});

exports.Bar = createReactClass({
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Bar' },
      'Bar'
    );
  }
});

exports.Baz = createReactClass({
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Baz' },
      'Baz'
    );
  }
});

exports.Async = createReactClass({
  statics: {
    delay: 10,

    willTransitionTo: function willTransitionTo(transition, params, query, callback) {
      setTimeout(callback, exports.Async.delay);
    }
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'Async' },
      'Async'
    );
  }
});

exports.RedirectToFoo = createReactClass({
  statics: {
    willTransitionTo: function willTransitionTo(transition) {
      transition.redirect('/foo');
    }
  },

  render: function render() {
    return null;
  }
});

exports.RedirectToFooAsync = createReactClass({
  statics: {
    delay: 10,

    willTransitionTo: function willTransitionTo(transition, params, query, callback) {
      setTimeout(function () {
        transition.redirect('/foo');
        callback();
      }, exports.RedirectToFooAsync.delay);
    }
  },

  render: function render() {
    return null;
  }
});

exports.Abort = createReactClass({
  statics: {
    willTransitionTo: function willTransitionTo(transition) {
      transition.abort();
    }
  },

  render: function render() {
    return null;
  }
});

exports.AbortAsync = createReactClass({
  statics: {
    delay: 10,

    willTransitionTo: function willTransitionTo(transition, params, query, callback) {
      setTimeout(function () {
        transition.abort();
        callback();
      }, exports.AbortAsync.delay);
    }
  },

  render: function render() {
    return null;
  }
});

exports.EchoFooProp = createReactClass({
  render: function render() {
    return React.createElement(
      'div',
      null,
      this.props.foo
    );
  }
});

exports.EchoBarParam = createReactClass({
  contextTypes: {
    router: PropTypes.router.isRequired
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'EchoBarParam' },
      this.context.router.getCurrentParams().bar
    );
  }
});