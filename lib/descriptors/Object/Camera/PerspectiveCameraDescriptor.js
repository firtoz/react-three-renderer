'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

var _CameraDescriptorBase2 = require('./CameraDescriptorBase');

var _CameraDescriptorBase3 = _interopRequireDefault(_CameraDescriptorBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PerspectiveCameraDescriptor = function (_CameraDescriptorBase) {
  _inherits(PerspectiveCameraDescriptor, _CameraDescriptorBase);

  function PerspectiveCameraDescriptor(react3Instance) {
    _classCallCheck(this, PerspectiveCameraDescriptor);

    var _this = _possibleConstructorReturn(this, (PerspectiveCameraDescriptor.__proto__ || Object.getPrototypeOf(PerspectiveCameraDescriptor)).call(this, react3Instance));

    _this.propTypes = _extends({}, _this.propTypes, {

      fov: _ReactPropTypes2.default.number,
      aspect: _ReactPropTypes2.default.number,
      near: _ReactPropTypes2.default.number,
      far: _ReactPropTypes2.default.number
    });

    _this.propUpdates = _extends({}, _this.propUpdates, {
      aspect: _this._updateAspect,
      fov: _this._updateFov,
      far: _this._updateFar,
      near: _this._updateNear
    });
    return _this;
  }

  _createClass(PerspectiveCameraDescriptor, [{
    key: 'construct',
    value: function construct(props) {
      return new THREE.PerspectiveCamera(props.fov, props.aspect, props.near, props.far);
    }
  }, {
    key: '_updateFov',
    value: function _updateFov(threeObject, fov) {
      threeObject.fov = fov;

      threeObject.userData._needsProjectionMatrixUpdate = true;
    }
  }, {
    key: '_updateNear',
    value: function _updateNear(threeObject, near) {
      threeObject.near = near;

      threeObject.userData._needsProjectionMatrixUpdate = true;
    }
  }, {
    key: '_updateFar',
    value: function _updateFar(threeObject, far) {
      threeObject.far = far;

      threeObject.userData._needsProjectionMatrixUpdate = true;
    }

    /**
     * @param {THREE.PerspectiveCamera} threeObject
     * @param newAspect
     * @private
     */

  }, {
    key: '_updateAspect',
    value: function _updateAspect(threeObject, newAspect) {
      threeObject.aspect = newAspect;

      threeObject.userData._needsProjectionMatrixUpdate = true;
    }
  }]);

  return PerspectiveCameraDescriptor;
}(_CameraDescriptorBase3.default);

module.exports = PerspectiveCameraDescriptor;