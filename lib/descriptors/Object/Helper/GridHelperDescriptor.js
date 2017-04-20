'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

var _Object3DDescriptor2 = require('../Object3DDescriptor');

var _Object3DDescriptor3 = _interopRequireDefault(_Object3DDescriptor2);

var _propTypeInstanceOf = require('../../../utils/propTypeInstanceOf');

var _propTypeInstanceOf2 = _interopRequireDefault(_propTypeInstanceOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GridHelperDescriptor = function (_Object3DDescriptor) {
  _inherits(GridHelperDescriptor, _Object3DDescriptor);

  function GridHelperDescriptor(react3Instance) {
    _classCallCheck(this, GridHelperDescriptor);

    var _this = _possibleConstructorReturn(this, (GridHelperDescriptor.__proto__ || Object.getPrototypeOf(GridHelperDescriptor)).call(this, react3Instance));

    _this.hasProp('size', {
      type: _ReactPropTypes2.default.number.isRequired,
      update: _this.triggerRemount,
      default: 1
    });

    _this.hasProp('step', {
      type: _ReactPropTypes2.default.number,
      update: _this.triggerRemount,
      default: 1
    });

    _this.hasProp('colorCenterLine', {
      type: _ReactPropTypes2.default.oneOfType([(0, _propTypeInstanceOf2.default)(THREE.Color), _ReactPropTypes2.default.number, _ReactPropTypes2.default.string]),
      update: _this.triggerRemount,
      default: 0x444444
    });

    _this.hasProp('colorGrid', {
      type: _ReactPropTypes2.default.oneOfType([(0, _propTypeInstanceOf2.default)(THREE.Color), _ReactPropTypes2.default.number, _ReactPropTypes2.default.string]),
      update: _this.triggerRemount,
      default: 0x888888
    });
    return _this;
  }

  _createClass(GridHelperDescriptor, [{
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      _get(GridHelperDescriptor.prototype.__proto__ || Object.getPrototypeOf(GridHelperDescriptor.prototype), 'applyInitialProps', this).call(this, threeObject, props);
    }
  }, {
    key: 'construct',
    value: function construct(props) {
      var size = props.size,
          step = props.step;

      return new THREE.GridHelper(size, step);
    }
  }, {
    key: 'unmount',
    value: function unmount(threeObject) {
      threeObject.geometry.dispose();
      threeObject.material.dispose();

      _get(GridHelperDescriptor.prototype.__proto__ || Object.getPrototypeOf(GridHelperDescriptor.prototype), 'unmount', this).call(this, threeObject);
    }
  }]);

  return GridHelperDescriptor;
}(_Object3DDescriptor3.default);

module.exports = GridHelperDescriptor;