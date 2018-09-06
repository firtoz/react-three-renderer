'use strict';

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GeometryDescriptorBase = require('./GeometryDescriptorBase');

var _GeometryDescriptorBase2 = _interopRequireDefault(_GeometryDescriptorBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PolyhedronGeometryDescriptorBase = function (_GeometryDescriptorBa) {
  _inherits(PolyhedronGeometryDescriptorBase, _GeometryDescriptorBa);

  function PolyhedronGeometryDescriptorBase(react3RendererInstance) {
    _classCallCheck(this, PolyhedronGeometryDescriptorBase);

    var _this = _possibleConstructorReturn(this, (PolyhedronGeometryDescriptorBase.__proto__ || Object.getPrototypeOf(PolyhedronGeometryDescriptorBase)).call(this, react3RendererInstance));

    ['radius', 'detail'].forEach(function (propName) {
      _this.hasProp(propName, {
        type: _propTypes2.default.number.isRequired,
        update: _this.triggerRemount,
        default: undefined
      });
    });
    return _this;
  }

  return PolyhedronGeometryDescriptorBase;
}(_GeometryDescriptorBase2.default);

module.exports = PolyhedronGeometryDescriptorBase;