'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');

var _ReactComponentWithPureRenderMixin2 = _interopRequireDefault(_ReactComponentWithPureRenderMixin);

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _React3Renderer = require('./React3Renderer');

var _React3Renderer2 = _interopRequireDefault(_React3Renderer);

var _propTypeInstanceOf = require('./utils/propTypeInstanceOf');

var _propTypeInstanceOf2 = _interopRequireDefault(_propTypeInstanceOf);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = _react2.default.PropTypes;
var React3 = (_temp = _class = function (_React$Component) {
  _inherits(React3, _React$Component);

  /* eslint-disable react/no-unused-prop-types */
  /* eslint-disable react/require-default-props */
  function React3(props, context) {
    _classCallCheck(this, React3);

    var _this = _possibleConstructorReturn(this, (React3.__proto__ || Object.getPrototypeOf(React3)).call(this, props, context));

    _this.shouldComponentUpdate = _ReactComponentWithPureRenderMixin2.default.shouldComponentUpdate;

    _this._onRecreateCanvas = function () {
      _this.setState({
        // changing the key will recreate the element
        canvasKey: _this.state.canvasKey + 1
      });
    };

    _this._canvasRef = function (c) {
      _this._canvas = c;
      if (_this.props.canvasRef) {
        _this.props.canvasRef(c);
      }
    };

    _this.state = {
      canvasKey: 0
    };
    return _this;
  }
  /* eslint-enable react/require-default-props */
  /* eslint-enable react/no-unused-prop-types */

  _createClass(React3, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.react3Renderer = new _React3Renderer2.default();

      this._render();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var lastProps = this.props;

      if (lastProps.canvasRef !== newProps.canvasRef) {
        if (lastProps.canvasRef) {
          lastProps.canvasRef(null);
        }

        if (newProps.canvasRef) {
          newProps.canvasRef(this._canvas);
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._render();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.react3Renderer.dispose();
      delete this.react3Renderer;
    }
  }, {
    key: '_render',
    value: function _render() {
      var canvas = this._canvas;

      var propsToClone = _extends({}, this.props);

      delete propsToClone.canvasStyle;
      delete propsToClone.canvasRef;

      this.react3Renderer.render(_react2.default.createElement(
        'react3',
        _extends({}, propsToClone, {
          onRecreateCanvas: this._onRecreateCanvas
        }),
        this.props.children
      ), canvas);
    }
  }, {
    key: 'render',
    value: function render() {
      var canvasKey = this.state.canvasKey;


      return _react2.default.createElement('canvas', {
        ref: this._canvasRef,
        key: canvasKey,
        width: this.props.width,
        height: this.props.height,
        style: _extends({}, this.props.canvasStyle, {
          width: this.props.width,
          height: this.props.height
        })
      });
    }
  }]);

  return React3;
}(_react2.default.Component), _class.propTypes = {
  context: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.node,
  /* eslint-disable react/forbid-prop-types */
  canvasStyle: PropTypes.any,
  /* eslint-enable react/forbid-prop-types */
  customRenderer: PropTypes.func,
  gammaInput: PropTypes.bool,
  gammaOutput: PropTypes.bool,
  sortObjects: PropTypes.bool,
  mainCamera: PropTypes.string,
  onAnimate: PropTypes.func,
  clearColor: PropTypes.oneOfType([(0, _propTypeInstanceOf2.default)(THREE.Color), PropTypes.number, PropTypes.string]),
  shadowMapEnabled: PropTypes.bool,
  shadowMapType: PropTypes.oneOf([THREE.BasicShadowMap, THREE.PCFShadowMap, THREE.PCFSoftShadowMap]),
  shadowMapCullFace: PropTypes.oneOf([THREE.CullFaceNone, THREE.CullFaceBack, THREE.CullFaceFront, THREE.CullFaceFrontBack]),
  shadowMapDebug: PropTypes.bool,
  pixelRatio: PropTypes.number,
  antialias: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  canvasRef: PropTypes.func
}, _class.defaultProps = {
  context: '3d'
}, _class.findTHREEObject = _React3Renderer2.default.findTHREEObject, _class.eventDispatcher = _React3Renderer2.default.eventDispatcher, _temp);


module.exports = React3;