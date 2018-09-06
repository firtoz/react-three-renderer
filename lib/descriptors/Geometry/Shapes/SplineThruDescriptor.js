'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ShapeActionDescriptorBase = require('./ShapeActionDescriptorBase');

var _ShapeActionDescriptorBase2 = _interopRequireDefault(_ShapeActionDescriptorBase);

var _SplineThruAction = require('../../../Shapes/SplineThruAction');

var _SplineThruAction2 = _interopRequireDefault(_SplineThruAction);

var _propTypeInstanceOf = require('../../../utils/propTypeInstanceOf');

var _propTypeInstanceOf2 = _interopRequireDefault(_propTypeInstanceOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SplineThruDescriptor = function (_ShapeActionDescripto) {
  _inherits(SplineThruDescriptor, _ShapeActionDescripto);

  function SplineThruDescriptor(react3RendererInstance) {
    _classCallCheck(this, SplineThruDescriptor);

    var _this = _possibleConstructorReturn(this, (SplineThruDescriptor.__proto__ || Object.getPrototypeOf(SplineThruDescriptor)).call(this, react3RendererInstance));

    _this.hasProp('points', {
      type: _propTypes2.default.arrayOf((0, _propTypeInstanceOf2.default)(THREE.Vector2)).isRequired,
      update: _this.triggerRemount,
      default: []
    });
    return _this;
  }

  _createClass(SplineThruDescriptor, [{
    key: 'construct',
    value: function construct(props) {
      return new _SplineThruAction2.default(props.points);
    }
  }]);

  return SplineThruDescriptor;
}(_ShapeActionDescriptorBase2.default);

module.exports = SplineThruDescriptor;