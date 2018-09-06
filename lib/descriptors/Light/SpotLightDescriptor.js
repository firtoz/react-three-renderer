'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var SpotLightDescriptor = function (_LightDescriptorBase) {
  _inherits(SpotLightDescriptor, _LightDescriptorBase);

  function SpotLightDescriptor(react3Instance) {
    _classCallCheck(this, SpotLightDescriptor);

    var _this = _possibleConstructorReturn(this, (SpotLightDescriptor.__proto__ || Object.getPrototypeOf(SpotLightDescriptor)).call(this, react3Instance));

    var defaults = [1, // intensity
    0, // distance
    Math.PI / 3, // angle
    10, // exponent
    1, // decay
    0];

    ['intensity', 'distance', 'angle', 'exponent', 'decay', 'penumbra'].forEach(function (propName, i) {
      _this.hasProp(propName, {
        type: _propTypes2.default.number,
        simple: true,
        default: defaults[i]
      });
    });

    _this.hasProp('shadowCameraFov', {
      type: _propTypes2.default.number,
      updateInitial: true,
      update: function update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.fov = value;
        }
      },

      default: 50
    });

    _this.hasColor();
    _this.hasDirection();
    return _this;
  }

  _createClass(SpotLightDescriptor, [{
    key: 'construct',
    value: function construct(props) {
      var color = props.color,
          intensity = props.intensity,
          distance = props.distance,
          angle = props.angle,
          exponent = props.exponent,
          decay = props.decay;


      return new THREE.SpotLight(color, intensity, distance, angle, exponent, decay);
    }
  }]);

  return SpotLightDescriptor;
}(_LightDescriptorBase3.default);

module.exports = SpotLightDescriptor;