var expect = require('expect');
var React = require('react');
var createReactClass = require('create-react-class');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');
var Router = require('../../index');
var Route = require('../Route');
var RouteHandler = require('../RouteHandler');
var TestLocation = require('../../locations/TestLocation');
var { Bar, Foo } = require('../../TestUtils');

describe('RouteHandler', function () {

  it('uses the old handler until the top-level component is rendered again', function (done) {
    var updateComponentBeforeNextRender;
    var location = new TestLocation([ '/foo' ]);

    var Root = createReactClass({
      displayName: 'Root',

      componentDidMount: function () {
        updateComponentBeforeNextRender = function (cb) {
          this.forceUpdate(cb);
        }.bind(this);
      },

      render: function () {
        return (
          <div>
            <h1>Root</h1>
            <RouteHandler/>
          </div>
        );
      },
    });

    var routes = (
      <Route name="root" handler={Root} path='/'>
        <Route name="foo" handler={Foo} path='/foo'/>
        <Route name="bar" handler={Bar} path='/bar'/>
      </Route>
    );

    var div = document.createElement('div');
    var steps = [];

    steps.push(function (Handler, state) {
      ReactDOM.render(<Handler/>, div, function () {
        expect(div.innerHTML).toMatch(/Foo/);
        location.push('/bar');
      });
    });

    steps.push(function (Handler, state) {
      updateComponentBeforeNextRender(function () {
        expect(div.innerHTML).toMatch(/Foo/);
        ReactDOM.render(<Handler/>, div, function () {
          expect(div.innerHTML).toMatch(/Bar/);
          done();
        });
      });
    });

    Router.run(routes, location, function () {
      steps.shift().apply(this, arguments);
    });
  });

  it('renders after an update', function (done) {
    var Nested = createReactClass({
      displayName: 'Nested',

      componentDidMount: function () {
        this.forceUpdate(finishTest);
      },

      render: function () {
        return (
          <div>
            hello
            <RouteHandler />
          </div>
        );
      },
    });

    var Foo = createReactClass({
      displayName: 'Foo',

      render: function () {
        return <div>foo</div>;
      },
    });

    var routes = (
      <Route path='/' handler={Nested}>
        <Route path='foo' handler={Foo}/>
      </Route>
    );

    var div = document.createElement('div');

    Router.run(routes, '/foo', function (App) {
      ReactDOM.render(<App />, div);
    });

    function finishTest() {
      expect(div.innerHTML).toMatch(/hello/);
      expect(div.innerHTML).toMatch(/foo/);
      done();
    }
  });

});
