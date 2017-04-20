'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

var _Object3DDescriptor2 = require('../Object3DDescriptor');

var _Object3DDescriptor3 = _interopRequireDefault(_Object3DDescriptor2);

var _CameraUtils = require('../../../utils/CameraUtils');

var _CameraUtils2 = _interopRequireDefault(_CameraUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CameraHelperDescriptor = function (_Object3DDescriptor) {
  _inherits(CameraHelperDescriptor, _Object3DDescriptor);

  function CameraHelperDescriptor(react3Instance) {
    _classCallCheck(this, CameraHelperDescriptor);

    var _this = _possibleConstructorReturn(this, (CameraHelperDescriptor.__proto__ || Object.getPrototypeOf(CameraHelperDescriptor)).call(this, react3Instance));

    _this.hasProp('visible', {
      type: _ReactPropTypes2.default.bool,
      override: true,
      update: function update(threeObject, visible) {
        threeObject.userData._visible = visible;

        threeObject.visible = threeObject.userData._hasCamera && visible;
      },

      updateInitial: true,
      default: true
    });

    _this.hasProp('cameraName', {
      type: _ReactPropTypes2.default.string.isRequired,
      update: function update(threeObject, cameraName) {
        _this._clearCameraEvents(threeObject);

        threeObject.userData._cameraName = cameraName;

        _this._startCameraFinder(threeObject);
      },
      default: undefined
    });
    return _this;
  }

  _createClass(CameraHelperDescriptor, [{
    key: 'construct',
    value: function construct() {
      return new THREE.CameraHelper(new THREE.PerspectiveCamera());
    }
  }, {
    key: 'applyInitialProps',
    value: function applyInitialProps(cameraHelper, props) {
      var _this2 = this;

      _get(CameraHelperDescriptor.prototype.__proto__ || Object.getPrototypeOf(CameraHelperDescriptor.prototype), 'applyInitialProps', this).call(this, cameraHelper, props);

      cameraHelper.userData._onCameraProjectionUpdate = function () {
        cameraHelper.update();
      };

      cameraHelper.userData._onCameraDispose = function () {
        _this2._startCameraFinder(cameraHelper);
      };

      cameraHelper.userData._onCameraRename = function (payload) {
        if (payload.oldName === cameraHelper.userData._cameraName) {
          _this2._startCameraFinder(cameraHelper);
        }
      };

      cameraHelper.userData._onBeforeRender = function () {
        cameraHelper.visible = cameraHelper.userData._hasCamera && cameraHelper.userData._visible && _CameraUtils2.default.current !== cameraHelper.userData._camera;
      };

      cameraHelper.userData._cameraName = props.cameraName;
      cameraHelper.userData._visible = props.hasOwnProperty('visible') ? props.visible : true;

      cameraHelper.userData.events.once('addedIntoRoot', function () {
        var rootInstance = cameraHelper.userData.markup._rootInstance;

        rootInstance.addBeforeRenderListener(cameraHelper.userData._onBeforeRender);

        _this2._startCameraFinder(cameraHelper);
      });
    }
  }, {
    key: 'unmount',
    value: function unmount(threeObject) {
      this._clearCameraEvents(threeObject);

      delete threeObject.userData._onCameraProjectionUpdate;

      return _get(CameraHelperDescriptor.prototype.__proto__ || Object.getPrototypeOf(CameraHelperDescriptor.prototype), 'unmount', this).call(this, threeObject);
    }
  }, {
    key: '_getCamera',
    value: function _getCamera(rootInstance, cameraName) {
      var camera = null;

      if (cameraName) {
        var camerasByName = rootInstance.getObjectsByName(cameraName).filter(function (obj) {
          return obj instanceof THREE.Camera;
        });

        if (camerasByName.length > 0) {
          camera = camerasByName[0];
        }
      }

      return camera;
    }
  }, {
    key: '_clearCameraEvents',
    value: function _clearCameraEvents(helper) {
      if (helper.userData._hasCamera) {
        helper.userData._camera.userData.events.removeListener('updateProjectionMatrix', helper.userData._onCameraProjectionUpdate);
        helper.userData._camera.userData.events.removeListener('dispose', helper.userData._onCameraDispose);
        helper.userData._camera.userData.events.removeListener('rename', helper.userData._onCameraRename);
      }
    }
  }, {
    key: '_setCamera',
    value: function _setCamera(helper, camera) {
      var userData = helper.userData;

      if (userData._camera === camera) {
        return;
      }

      this._clearCameraEvents(helper);

      userData._hasCamera = true;
      userData._camera = camera;
      helper.camera = camera;
      helper.matrix = camera.matrixWorld;
      helper.update();
      helper.visible = userData._visible;
      var cameraEvents = helper.userData._camera.userData.events;

      cameraEvents.on('rename', userData._onCameraRename);
      cameraEvents.on('updateProjectionMatrix', userData._onCameraProjectionUpdate);
      cameraEvents.once('dispose', userData._onCameraDispose);
    }
  }, {
    key: '_startCameraFinder',
    value: function _startCameraFinder(helper) {
      var _this3 = this;

      this._clearCameraEvents(helper);

      var rootInstance = helper.userData.markup && helper.userData.markup._rootInstance;

      if (!rootInstance) {
        return;
      }

      helper.userData._hasCamera = false;
      helper.userData._camera = null;
      helper.camera = new THREE.PerspectiveCamera();
      helper.visible = false;

      var camera = this._getCamera(rootInstance, helper.userData._cameraName);

      if (camera) {
        this._setCamera(helper, camera);
      } else {
        // try to find camera before renders
        var findCamera = function findCamera() {
          var foundCamera = _this3._getCamera(rootInstance, helper.userData._cameraName);

          if (foundCamera) {
            rootInstance.removeAnimateListener(findCamera);

            _this3._setCamera(helper, foundCamera);
          }
        };

        rootInstance.addAnimateListener(findCamera);
      }
    }
  }]);

  return CameraHelperDescriptor;
}(_Object3DDescriptor3.default);

module.exports = CameraHelperDescriptor;