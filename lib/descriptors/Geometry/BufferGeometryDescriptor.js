'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

var _GeometryDescriptorBase = require('./GeometryDescriptorBase');

var _GeometryDescriptorBase2 = _interopRequireDefault(_GeometryDescriptorBase);

var _propTypeInstanceOf = require('../../utils/propTypeInstanceOf');

var _propTypeInstanceOf2 = _interopRequireDefault(_propTypeInstanceOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BufferGeometryDescriptor = function (_GeometryDescriptorBa) {
  _inherits(BufferGeometryDescriptor, _GeometryDescriptorBa);

  function BufferGeometryDescriptor(react3RendererInstance) {
    _classCallCheck(this, BufferGeometryDescriptor);

    var _this = _possibleConstructorReturn(this, (BufferGeometryDescriptor.__proto__ || Object.getPrototypeOf(BufferGeometryDescriptor)).call(this, react3RendererInstance));

    ['vertices', 'colors', 'faceVertexUvs', 'faces', 'dynamic'].forEach(function (propName) {
      _this.removeProp(propName);
    });

    ['position', 'normal', 'color'].forEach(function (attributeName) {
      _this.hasProp(attributeName, {
        type: _ReactPropTypes2.default.oneOfType([(0, _propTypeInstanceOf2.default)(THREE.BufferAttribute), (0, _propTypeInstanceOf2.default)(THREE.InterleavedBufferAttribute)]),
        update: function update(threeObject, attributeValue) {
          if (attributeValue) {
            threeObject.addAttribute(attributeName, attributeValue);
          } else {
            threeObject.removeAttribute(attributeName);
          }
        },

        updateInitial: true,
        default: undefined
      });
    });

    _this.hasProp('index', {
      type: _ReactPropTypes2.default.oneOfType([(0, _propTypeInstanceOf2.default)(THREE.BufferAttribute), (0, _propTypeInstanceOf2.default)(THREE.InterleavedBufferAttribute)]),
      update: function update(threeObject, attributeValue) {
        threeObject.setIndex(attributeValue);
      },

      updateInitial: true,
      default: undefined
    });
    return _this;
  }

  _createClass(BufferGeometryDescriptor, [{
    key: 'construct',
    value: function construct() {
      return new THREE.BufferGeometry();
    }
  }]);

  return BufferGeometryDescriptor;
}(_GeometryDescriptorBase2.default);

module.exports = BufferGeometryDescriptor;