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

var ArrowHelperDescriptor = function (_Object3DDescriptor) {
  _inherits(ArrowHelperDescriptor, _Object3DDescriptor);

  function ArrowHelperDescriptor(react3Instance) {
    _classCallCheck(this, ArrowHelperDescriptor);

    var _this = _possibleConstructorReturn(this, (ArrowHelperDescriptor.__proto__ || Object.getPrototypeOf(ArrowHelperDescriptor)).call(this, react3Instance));

    _this.hasProp('origin', {
      type: (0, _propTypeInstanceOf2.default)(THREE.Vector3).isRequired,
      update: function update(threeObject, origin) {
        threeObject.position.copy(origin);
      },

      default: undefined
    });

    _this.hasProp('dir', {
      type: (0, _propTypeInstanceOf2.default)(THREE.Vector3).isRequired,
      update: function update(threeObject, newDir) {
        threeObject.setDirection(newDir);
      },

      default: undefined
    });

    _this.hasProp('color', {
      type: _ReactPropTypes2.default.oneOfType([(0, _propTypeInstanceOf2.default)(THREE.Color), _ReactPropTypes2.default.number, _ReactPropTypes2.default.string]),
      update: function update(threeObject, newColor) {
        threeObject.setColor(newColor);
      },

      default: 0xffff00
    });

    _this.hasProp('length', {
      type: _ReactPropTypes2.default.number,
      update: function update(threeObject, length) {
        threeObject.userData.lengthProps.length = length;

        threeObject.userData.lengthsChanged = true;
      },

      default: 1
    });

    _this.hasProp('headLength', {
      type: _ReactPropTypes2.default.number,
      update: function update(threeObject, headLength) {
        threeObject.userData.lengthProps.headLength = headLength;

        threeObject.userData.lengthsChanged = true;
      },
      default: undefined
    });

    _this.hasProp('headWidth', {
      type: _ReactPropTypes2.default.number,
      update: function update(threeObject, headWidth) {
        threeObject.userData.lengthProps.headWidth = headWidth;

        threeObject.userData.lengthsChanged = true;
      },
      default: undefined
    });
    return _this;
  }

  _createClass(ArrowHelperDescriptor, [{
    key: 'beginPropertyUpdates',
    value: function beginPropertyUpdates(threeObject) {
      threeObject.userData.lengthsChanged = false;
    }
  }, {
    key: 'completePropertyUpdates',
    value: function completePropertyUpdates(threeObject) {
      if (threeObject.userData.lengthsChanged) {
        threeObject.userData.lengthsChanged = false;

        var length = threeObject.userData.lengthProps.length;
        var _threeObject$userData = threeObject.userData.lengthProps,
            headLength = _threeObject$userData.headLength,
            headWidth = _threeObject$userData.headWidth;


        if (headLength === undefined) {
          headLength = 0.2 * length;
        }

        if (headWidth === undefined) {
          headWidth = 0.2 * headLength;
        }

        threeObject.setLength(length, headLength, headWidth);
      }
    }
  }, {
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      _get(ArrowHelperDescriptor.prototype.__proto__ || Object.getPrototypeOf(ArrowHelperDescriptor.prototype), 'applyInitialProps', this).call(this, threeObject, props);

      var length = props.length,
          headLength = props.headLength,
          headWidth = props.headWidth;


      threeObject.userData.lengthProps = {
        length: length,
        headLength: headLength,
        headWidth: headWidth
      };
    }
  }, {
    key: 'construct',
    value: function construct(props) {
      var dir = props.dir,
          origin = props.origin,
          length = props.length,
          color = props.color,
          headLength = props.headLength,
          headWidth = props.headWidth;


      return new THREE.ArrowHelper(dir, origin, length, color, headLength, headWidth);
    }
  }, {
    key: 'unmount',
    value: function unmount(threeObject) {
      if (threeObject.line) {
        threeObject.line.geometry.dispose();
        threeObject.line.material.dispose();
      }

      if (threeObject.cone) {
        threeObject.cone.geometry.dispose();
        threeObject.cone.material.dispose();
      }

      _get(ArrowHelperDescriptor.prototype.__proto__ || Object.getPrototypeOf(ArrowHelperDescriptor.prototype), 'unmount', this).call(this, threeObject);
    }
  }]);

  return ArrowHelperDescriptor;
}(_Object3DDescriptor3.default);

module.exports = ArrowHelperDescriptor;