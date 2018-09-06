'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Viewport = require('../Viewport');

var _Viewport2 = _interopRequireDefault(_Viewport);

var _THREEElementDescriptor = require('./THREEElementDescriptor');

var _THREEElementDescriptor2 = _interopRequireDefault(_THREEElementDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewportDescriptor = function (_THREEElementDescript) {
  _inherits(ViewportDescriptor, _THREEElementDescript);

  function ViewportDescriptor(react3Instance) {
    _classCallCheck(this, ViewportDescriptor);

    var _this = _possibleConstructorReturn(this, (ViewportDescriptor.__proto__ || Object.getPrototypeOf(ViewportDescriptor)).call(this, react3Instance));

    ['x', 'y', 'width', 'height'].forEach(function (propName) {
      _this.hasProp(propName, {
        type: _propTypes2.default.number.isRequired,
        simple: true
      });
    });

    _this.hasProp('cameraName', {
      type: _propTypes2.default.string.isRequired,
      simple: true
    });
    return _this;
  }

  _createClass(ViewportDescriptor, [{
    key: 'construct',
    value: function construct(props) {
      return new _Viewport2.default(props);
    }
  }]);

  return ViewportDescriptor;
}(_THREEElementDescriptor2.default);

module.exports = ViewportDescriptor;