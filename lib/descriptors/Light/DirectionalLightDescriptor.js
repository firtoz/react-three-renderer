'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _LightDescriptorBase2 = require('./LightDescriptorBase');

var _LightDescriptorBase3 = _interopRequireDefault(_LightDescriptorBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DirectionalLightDescriptor = (_temp = _class = function (_LightDescriptorBase) {
  _inherits(DirectionalLightDescriptor, _LightDescriptorBase);

  function DirectionalLightDescriptor(react3Instance) {
    _classCallCheck(this, DirectionalLightDescriptor);

    var _this = _possibleConstructorReturn(this, (DirectionalLightDescriptor.__proto__ || Object.getPrototypeOf(DirectionalLightDescriptor)).call(this, react3Instance));

    _this.hasProp('intensity', {
      type: _propTypes2.default.number,
      simple: true,
      default: 1
    });

    _this.hasProp('shadowCameraLeft', {
      type: _propTypes2.default.number,
      updateInitial: true,
      update: function update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.left = value;
        }
      },

      default: DirectionalLightDescriptor.defaultShadowCameraLeft
    });

    _this.hasProp('shadowCameraBottom', {
      type: _propTypes2.default.number,
      updateInitial: true,
      update: function update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.bottom = value;
        }
      },

      default: DirectionalLightDescriptor.defaultShadowCameraBottom
    });

    _this.hasProp('shadowCameraRight', {
      type: _propTypes2.default.number,
      updateInitial: true,
      update: function update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.right = value;
        }
      },

      default: DirectionalLightDescriptor.defaultShadowCameraRight
    });

    _this.hasProp('shadowCameraTop', {
      type: _propTypes2.default.number,
      updateInitial: true,
      update: function update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.top = value;
        }
      },

      default: DirectionalLightDescriptor.defaultShadowCameraTop
    });

    _this.hasColor();
    _this.hasDirection();
    return _this;
  }

  _createClass(DirectionalLightDescriptor, [{
    key: 'construct',
    value: function construct(props) {
      var color = props.color;
      var intensity = props.intensity;

      var result = new THREE.DirectionalLight(color, intensity);

      result.position.set(0, 0, 0);

      return result;
    }
  }, {
    key: 'unmount',
    value: function unmount(threeObject) {
      _get(DirectionalLightDescriptor.prototype.__proto__ || Object.getPrototypeOf(DirectionalLightDescriptor.prototype), 'unmount', this).call(this, threeObject);
    }
  }]);

  return DirectionalLightDescriptor;
}(_LightDescriptorBase3.default), _class.defaultShadowCameraLeft = -5, _class.defaultShadowCameraRight = 5, _class.defaultShadowCameraTop = 5, _class.defaultShadowCameraBottom = -5, _temp);


module.exports = DirectionalLightDescriptor;