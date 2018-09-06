'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ShapeActionDescriptorBase = require('./ShapeActionDescriptorBase');

var _ShapeActionDescriptorBase2 = _interopRequireDefault(_ShapeActionDescriptorBase);

var _LineToAction = require('../../../Shapes/LineToAction');

var _LineToAction2 = _interopRequireDefault(_LineToAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LineToDescriptor = function (_ShapeActionDescripto) {
  _inherits(LineToDescriptor, _ShapeActionDescripto);

  function LineToDescriptor(react3RendererInstance) {
    _classCallCheck(this, LineToDescriptor);

    var _this = _possibleConstructorReturn(this, (LineToDescriptor.__proto__ || Object.getPrototypeOf(LineToDescriptor)).call(this, react3RendererInstance));

    ['x', 'y'].forEach(function (propName) {
      _this.hasProp(propName, {
        type: _propTypes2.default.number.isRequired,
        update: _this.triggerRemount,
        default: 0
      });
    });
    return _this;
  }

  _createClass(LineToDescriptor, [{
    key: 'construct',
    value: function construct(props) {
      return new _LineToAction2.default(props.x, props.y);
    }
  }]);

  return LineToDescriptor;
}(_ShapeActionDescriptorBase2.default);

module.exports = LineToDescriptor;