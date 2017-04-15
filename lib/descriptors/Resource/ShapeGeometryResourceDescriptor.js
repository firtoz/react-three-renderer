'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _GeometryResourceDescriptor = require('./GeometryResourceDescriptor');

var _GeometryResourceDescriptor2 = _interopRequireDefault(_GeometryResourceDescriptor);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShapeGeometryResourceDescriptor = function (_GeometryResourceDesc) {
  _inherits(ShapeGeometryResourceDescriptor, _GeometryResourceDesc);

  function ShapeGeometryResourceDescriptor(react3RendererInstance) {
    _classCallCheck(this, ShapeGeometryResourceDescriptor);

    var _this = _possibleConstructorReturn(this, (ShapeGeometryResourceDescriptor.__proto__ || Object.getPrototypeOf(ShapeGeometryResourceDescriptor)).call(this, react3RendererInstance));

    _this.hasProp('type', {
      type: _ReactPropTypes2.default.oneOf(['points', 'spacedPoints', 'shape']).isRequired,
      update: _this.triggerRemount,
      default: ''
    });

    _this.hasProp('divisions', {
      type: _ReactPropTypes2.default.number,
      update: _this.triggerRemount,
      default: 5
    });
    return _this;
  }

  _createClass(ShapeGeometryResourceDescriptor, [{
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      _get(ShapeGeometryResourceDescriptor.prototype.__proto__ || Object.getPrototypeOf(ShapeGeometryResourceDescriptor.prototype), 'applyInitialProps', this).call(this, threeObject, props);

      threeObject.userData._divisions = props.divisions;

      threeObject.userData._type = props.type;
    }
  }, {
    key: 'applyToSlot',
    value: function applyToSlot(threeObject, parentObject, shape) {
      if (!shape) {
        return _get(ShapeGeometryResourceDescriptor.prototype.__proto__ || Object.getPrototypeOf(ShapeGeometryResourceDescriptor.prototype), 'applyToSlot', this).call(this, threeObject, parentObject, null);
      }

      var geometry = void 0;

      switch (threeObject.userData._type) {
        case 'points':
          geometry = shape.createPointsGeometry();
          break;
        case 'spacedPoints':
          geometry = shape.createSpacedPointsGeometry(threeObject.userData._divisions);
          break;
        case 'shape':
          // TODO shapeGeometryDescriptor
          geometry = new THREE.ShapeGeometry(shape);
          break;
        default:
          break;
      }

      return _get(ShapeGeometryResourceDescriptor.prototype.__proto__ || Object.getPrototypeOf(ShapeGeometryResourceDescriptor.prototype), 'applyToSlot', this).call(this, threeObject, parentObject, geometry);
    }
  }]);

  return ShapeGeometryResourceDescriptor;
}(_GeometryResourceDescriptor2.default);

module.exports = ShapeGeometryResourceDescriptor;