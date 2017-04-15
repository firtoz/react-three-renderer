'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _PathDescriptorBase2 = require('./PathDescriptorBase');

var _PathDescriptorBase3 = _interopRequireDefault(_PathDescriptorBase2);

var _resource = require('../../decorators/resource');

var _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShapeDescriptor = (0, _resource2.default)(_class = function (_PathDescriptorBase) {
  _inherits(ShapeDescriptor, _PathDescriptorBase);

  function ShapeDescriptor() {
    _classCallCheck(this, ShapeDescriptor);

    return _possibleConstructorReturn(this, (ShapeDescriptor.__proto__ || Object.getPrototypeOf(ShapeDescriptor)).apply(this, arguments));
  }

  _createClass(ShapeDescriptor, [{
    key: 'construct',
    value: function construct(props) {
      if (props.hasOwnProperty('points')) {
        return new THREE.Shape(props.points);
      }

      return new THREE.Shape();
    }
  }]);

  return ShapeDescriptor;
}(_PathDescriptorBase3.default)) || _class;

module.exports = ShapeDescriptor;