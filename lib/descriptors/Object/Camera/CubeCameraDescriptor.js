'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Object3DDescriptor2 = require('../Object3DDescriptor');

var _Object3DDescriptor3 = _interopRequireDefault(_Object3DDescriptor2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CubeCameraDescriptor = function (_Object3DDescriptor) {
  _inherits(CubeCameraDescriptor, _Object3DDescriptor);

  function CubeCameraDescriptor(react3Instance) {
    _classCallCheck(this, CubeCameraDescriptor);

    var _this = _possibleConstructorReturn(this, (CubeCameraDescriptor.__proto__ || Object.getPrototypeOf(CubeCameraDescriptor)).call(this, react3Instance));

    _this.propTypes = _extends({}, _this.propTypes, {

      near: _propTypes2.default.number,
      far: _propTypes2.default.number,
      cubeResolution: _propTypes2.default.number.isRequired
    });
    return _this;
  }

  _createClass(CubeCameraDescriptor, [{
    key: 'construct',
    value: function construct(props) {
      return new THREE.CubeCamera(props.near, props.far, props.cubeResolution);
    }
  }]);

  return CubeCameraDescriptor;
}(_Object3DDescriptor3.default);

module.exports = CubeCameraDescriptor;