var React = require('react');
var createReactClass = require('create-react-class');
var RouteHandler = require('./components/RouteHandler');
var PropTypes = require('./PropTypes');

exports.Nested = createReactClass({
  render: function () {
    return (
      <div>
        <h1 className="Nested">Nested</h1>
        <RouteHandler />
      </div>
    );
  }
});

exports.Foo = createReactClass({
  render: function () {
    return <div className="Foo">Foo</div>;
  }
});

exports.Bar = createReactClass({
  render: function () {
    return <div className="Bar">Bar</div>;
  }
});

exports.Baz = createReactClass({
  render: function () {
    return <div className="Baz">Baz</div>;
  }
});

exports.Async = createReactClass({
  statics: {
    delay: 10,

    willTransitionTo: function (transition, params, query, callback) {
      setTimeout(callback, exports.Async.delay);
    }
  },

  render: function () {
    return <div className="Async">Async</div>;
  }
});

exports.RedirectToFoo = createReactClass({
  statics: {
    willTransitionTo: function (transition) {
      transition.redirect('/foo');
    }
  },

  render: function () {
    return null;
  }
});

exports.RedirectToFooAsync = createReactClass({
  statics: {
    delay: 10,

    willTransitionTo: function (transition, params, query, callback) {
      setTimeout(function () {
        transition.redirect('/foo');
        callback();
      }, exports.RedirectToFooAsync.delay);
    }
  },

  render: function () {
    return null;
  }
});


exports.Abort = createReactClass({
  statics: {
    willTransitionTo: function (transition) {
      transition.abort();
    }
  },

  render: function () {
    return null;
  }
});

exports.AbortAsync = createReactClass({
  statics: {
    delay: 10,

    willTransitionTo: function (transition, params, query, callback) {
      setTimeout(function () {
        transition.abort();
        callback();
      }, exports.AbortAsync.delay);
    }
  },

  render: function () {
    return null;
  }
});

exports.EchoFooProp = createReactClass({
  render: function () {
    return <div>{this.props.foo}</div>;
  }
});

exports.EchoBarParam = createReactClass({
  contextTypes: {
    router: PropTypes.router.isRequired
  },
  render: function () {
    return <div className="EchoBarParam">{this.context.router.getCurrentParams().bar}</div>;
  }
});
