'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _Object3DDescriptor2 = require('../Object3DDescriptor');

var _Object3DDescriptor3 = _interopRequireDefault(_Object3DDescriptor2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CameraDescriptorBase = function (_Object3DDescriptor) {
  _inherits(CameraDescriptorBase, _Object3DDescriptor);

  function CameraDescriptorBase() {
    _classCallCheck(this, CameraDescriptorBase);

    return _possibleConstructorReturn(this, (CameraDescriptorBase.__proto__ || Object.getPrototypeOf(CameraDescriptorBase)).apply(this, arguments));
  }

  _createClass(CameraDescriptorBase, [{
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      _get(CameraDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(CameraDescriptorBase.prototype), 'applyInitialProps', this).call(this, threeObject, props);
    }
  }, {
    key: 'setParent',
    value: function setParent(camera, parentObject3D) {
      _get(CameraDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(CameraDescriptorBase.prototype), 'setParent', this).call(this, camera, parentObject3D);
    }
  }, {
    key: 'unmount',
    value: function unmount(threeObject) {
      _get(CameraDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(CameraDescriptorBase.prototype), 'unmount', this).call(this, threeObject);
    }
  }, {
    key: 'beginPropertyUpdates',
    value: function beginPropertyUpdates(threeObject) {
      _get(CameraDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(CameraDescriptorBase.prototype), 'beginPropertyUpdates', this).call(this, threeObject);

      threeObject.userData._needsProjectionMatrixUpdate = false;
    }

    /**
     * @param {THREE.PerspectiveCamera | THREE.OrthographicCamera} threeObject
     */

  }, {
    key: 'completePropertyUpdates',
    value: function completePropertyUpdates(threeObject) {
      _get(CameraDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(CameraDescriptorBase.prototype), 'completePropertyUpdates', this).call(this, threeObject);

      if (threeObject.userData._needsProjectionMatrixUpdate) {
        threeObject.userData._needsProjectionMatrixUpdate = false;

        threeObject.updateProjectionMatrix();
        threeObject.userData.events.emit('updateProjectionMatrix');
      }
    }
  }]);

  return CameraDescriptorBase;
}(_Object3DDescriptor3.default);

module.exports = CameraDescriptorBase;