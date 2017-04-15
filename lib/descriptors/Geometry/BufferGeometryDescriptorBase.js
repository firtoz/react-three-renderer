'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GeometryDescriptorBase = require('./GeometryDescriptorBase');

var _GeometryDescriptorBase2 = _interopRequireDefault(_GeometryDescriptorBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BufferGeometryDescriptorBase = function (_GeometryDescriptorBa) {
  _inherits(BufferGeometryDescriptorBase, _GeometryDescriptorBa);

  function BufferGeometryDescriptorBase() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BufferGeometryDescriptorBase);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BufferGeometryDescriptorBase.__proto__ || Object.getPrototypeOf(BufferGeometryDescriptorBase)).call.apply(_ref, [this].concat(args))), _this), _this.updateCacheAndReplace = function (propName, threeObject, newValue) {
      threeObject.userData._propsCache[propName] = newValue;
      threeObject.userData._wantPropertyOverwrite = true;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BufferGeometryDescriptorBase, [{
    key: 'beginPropertyUpdates',
    value: function beginPropertyUpdates(threeObject) {
      _get(BufferGeometryDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(BufferGeometryDescriptorBase.prototype), 'beginPropertyUpdates', this).call(this, threeObject);

      threeObject.userData._wantPropertyOverwrite = false;
    }
  }, {
    key: 'completePropertyUpdates',
    value: function completePropertyUpdates(threeObject) {
      _get(BufferGeometryDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(BufferGeometryDescriptorBase.prototype), 'completePropertyUpdates', this).call(this, threeObject);

      if (threeObject.userData._wantPropertyOverwrite) {
        threeObject.userData._wantPropertyOverwrite = false;

        threeObject.copy(this.construct(threeObject.userData._propsCache));
      }
    }
  }, {
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      _get(BufferGeometryDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(BufferGeometryDescriptorBase.prototype), 'applyInitialProps', this).call(this, threeObject, props);

      threeObject.userData._propsCache = _extends({}, props);
    }
  }]);

  return BufferGeometryDescriptorBase;
}(_GeometryDescriptorBase2.default);

module.exports = BufferGeometryDescriptorBase;