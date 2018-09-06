'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _ShapeAction2 = require('./ShapeAction');

var _ShapeAction3 = _interopRequireDefault(_ShapeAction2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuadraticCurveToAction = function (_ShapeAction) {
  _inherits(QuadraticCurveToAction, _ShapeAction);

  function QuadraticCurveToAction(cpX, cpY, x, y) {
    _classCallCheck(this, QuadraticCurveToAction);

    var _this = _possibleConstructorReturn(this, (QuadraticCurveToAction.__proto__ || Object.getPrototypeOf(QuadraticCurveToAction)).call(this));

    _this.cpX = cpX;
    _this.cpY = cpY;
    _this.x = x;
    _this.y = y;
    return _this;
  }

  _createClass(QuadraticCurveToAction, [{
    key: 'performAction',
    value: function performAction(shape) {
      shape.quadraticCurveTo(this.cpX, this.cpY, this.x, this.y);
    }
  }]);

  return QuadraticCurveToAction;
}(_ShapeAction3.default);

module.exports = QuadraticCurveToAction;