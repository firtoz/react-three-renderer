'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ShapeActionDescriptorBase = require('./ShapeActionDescriptorBase');

var _ShapeActionDescriptorBase2 = _interopRequireDefault(_ShapeActionDescriptorBase);

var _BezierCurveToAction = require('../../../Shapes/BezierCurveToAction');

var _BezierCurveToAction2 = _interopRequireDefault(_BezierCurveToAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BezierCurveToDescriptor = function (_ShapeActionDescripto) {
  _inherits(BezierCurveToDescriptor, _ShapeActionDescripto);

  function BezierCurveToDescriptor(react3RendererInstance) {
    _classCallCheck(this, BezierCurveToDescriptor);

    var _this = _possibleConstructorReturn(this, (BezierCurveToDescriptor.__proto__ || Object.getPrototypeOf(BezierCurveToDescriptor)).call(this, react3RendererInstance));

    ['cp1X', 'cp1Y', 'cp2X', 'cp2Y', 'aX', 'aY'].forEach(function (propName) {
      _this.hasProp(propName, {
        type: _propTypes2.default.number.isRequired,
        update: _this.triggerRemount,
        default: 0
      });
    });
    return _this;
  }

  _createClass(BezierCurveToDescriptor, [{
    key: 'construct',
    value: function construct(props) {
      var cp1X = props.cp1X,
          cp1Y = props.cp1Y,
          cp2X = props.cp2X,
          cp2Y = props.cp2Y,
          aX = props.aX,
          aY = props.aY;


      return new _BezierCurveToAction2.default(cp1X, cp1Y, cp2X, cp2Y, aX, aY);
    }
  }]);

  return BezierCurveToDescriptor;
}(_ShapeActionDescriptorBase2.default);

module.exports = BezierCurveToDescriptor;