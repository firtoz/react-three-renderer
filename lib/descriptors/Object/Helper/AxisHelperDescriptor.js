'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Object3DDescriptor2 = require('../Object3DDescriptor');

var _Object3DDescriptor3 = _interopRequireDefault(_Object3DDescriptor2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AxisHelperDescriptor = function (_Object3DDescriptor) {
  _inherits(AxisHelperDescriptor, _Object3DDescriptor);

  function AxisHelperDescriptor(react3Instance) {
    _classCallCheck(this, AxisHelperDescriptor);

    var _this = _possibleConstructorReturn(this, (AxisHelperDescriptor.__proto__ || Object.getPrototypeOf(AxisHelperDescriptor)).call(this, react3Instance));

    _this.hasProp('size', {
      type: _propTypes2.default.number,
      update: _this.triggerRemount,
      default: 1
    });
    return _this;
  }

  _createClass(AxisHelperDescriptor, [{
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      _get(AxisHelperDescriptor.prototype.__proto__ || Object.getPrototypeOf(AxisHelperDescriptor.prototype), 'applyInitialProps', this).call(this, threeObject, props);
    }
  }, {
    key: 'construct',
    value: function construct(props) {
      var size = props.size;

      return new THREE.AxisHelper(size);
    }
  }, {
    key: 'unmount',
    value: function unmount(threeObject) {
      threeObject.geometry.dispose();
      threeObject.material.dispose();

      _get(AxisHelperDescriptor.prototype.__proto__ || Object.getPrototypeOf(AxisHelperDescriptor.prototype), 'unmount', this).call(this, threeObject);
    }
  }]);

  return AxisHelperDescriptor;
}(_Object3DDescriptor3.default);

module.exports = AxisHelperDescriptor;