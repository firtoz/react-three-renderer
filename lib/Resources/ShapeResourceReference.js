'use strict';

var _ResourceReference2 = require('./ResourceReference');

var _ResourceReference3 = _interopRequireDefault(_ResourceReference2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// all logic handled within ExtrudeGeometryDescriptor
// TODO implement here instead
var ShapeResourceReference = function (_ResourceReference) {
  _inherits(ShapeResourceReference, _ResourceReference);

  function ShapeResourceReference() {
    _classCallCheck(this, ShapeResourceReference);

    return _possibleConstructorReturn(this, (ShapeResourceReference.__proto__ || Object.getPrototypeOf(ShapeResourceReference)).apply(this, arguments));
  }

  return ShapeResourceReference;
}(_ResourceReference3.default);

module.exports = ShapeResourceReference;