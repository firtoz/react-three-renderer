'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PolyhedronGeometryDescriptorBase = require('./PolyhedronGeometryDescriptorBase');

var _PolyhedronGeometryDescriptorBase2 = _interopRequireDefault(_PolyhedronGeometryDescriptorBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PolyhedronGeometryDescriptor = function (_PolyhedronGeometryDe) {
  _inherits(PolyhedronGeometryDescriptor, _PolyhedronGeometryDe);

  function PolyhedronGeometryDescriptor(react3RendererInstance) {
    _classCallCheck(this, PolyhedronGeometryDescriptor);

    var _this = _possibleConstructorReturn(this, (PolyhedronGeometryDescriptor.__proto__ || Object.getPrototypeOf(PolyhedronGeometryDescriptor)).call(this, react3RendererInstance));

    _this.hasProp('vertices', {
      override: true,
      type: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
      update: _this.triggerRemount,
      default: undefined
    });

    _this.hasProp('indices', {
      type: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
      update: _this.triggerRemount,
      default: undefined
    });
    return _this;
  }

  _createClass(PolyhedronGeometryDescriptor, [{
    key: 'construct',
    value: function construct(props) {
      var vertices = props.vertices,
          indices = props.indices,
          radius = props.radius,
          detail = props.detail;


      return new THREE.PolyhedronGeometry(vertices, indices, radius, detail);
    }
  }]);

  return PolyhedronGeometryDescriptor;
}(_PolyhedronGeometryDescriptorBase2.default);

module.exports = PolyhedronGeometryDescriptor;