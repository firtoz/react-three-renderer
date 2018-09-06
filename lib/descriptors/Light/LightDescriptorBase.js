'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = require('fbjs/lib/warning');

var _warning2 = _interopRequireDefault(_warning);

var _Object3DDescriptor2 = require('../Object/Object3DDescriptor');

var _Object3DDescriptor3 = _interopRequireDefault(_Object3DDescriptor2);

var _propTypeInstanceOf = require('../../utils/propTypeInstanceOf');

var _propTypeInstanceOf2 = _interopRequireDefault(_propTypeInstanceOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var updateLightTargetFromQuaternion = function () {
  var lightPositionVector = new THREE.Vector3();
  var forward = new THREE.Vector3();

  return function (light) {
    light.updateMatrixWorld();

    lightPositionVector.setFromMatrixPosition(light.matrixWorld);

    // rotate forward to match the rotation
    // then set the target position
    light.target.position.copy(forward.set(0, 0, 1).applyQuaternion(light.quaternion).add(lightPositionVector));

    light.target.updateMatrixWorld();
  };
}();

var LightDescriptorBase = (_temp = _class = function (_Object3DDescriptor) {
  _inherits(LightDescriptorBase, _Object3DDescriptor);

  function LightDescriptorBase(react3Instance) {
    _classCallCheck(this, LightDescriptorBase);

    var _this = _possibleConstructorReturn(this, (LightDescriptorBase.__proto__ || Object.getPrototypeOf(LightDescriptorBase)).call(this, react3Instance));

    _this.removeProp('receiveShadow');

    _this._hasDirection = false;

    if (process.env.NODE_ENV !== 'production') {
      _this._warnedAboutLightMaterialUpdate = false;
    }

    _this.hasProp('updatesRefreshAllMaterials', {
      type: _propTypes2.default.bool,
      updateInitial: true,
      update: function update(threeObject, updatesRefreshAllMaterials) {
        threeObject.userData._updatesRefreshAllMaterials = updatesRefreshAllMaterials;
      },

      default: false
    });

    _this.hasProp('shadowBias', {
      type: _propTypes2.default.number,
      updateInitial: true,
      update: function update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.bias = value;
        }
      },

      default: LightDescriptorBase.defaultShadowBias
    });

    _this.hasProp('shadowDarkness', {
      type: _propTypes2.default.number,
      simple: true,
      default: 0.5
    });

    _this.hasProp('shadowMapWidth', {
      type: _propTypes2.default.number,
      updateInitial: true,
      update: function update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.mapSize.x = value;
        }
      },

      default: 512
    });

    _this.hasProp('shadowMapHeight', {
      type: _propTypes2.default.number,
      updateInitial: true,
      update: function update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.mapSize.y = value;
        }
      },

      default: 512
    });

    _this.hasProp('shadowCameraNear', {
      type: _propTypes2.default.number,
      updateInitial: true,
      update: function update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.near = value;
        }
      },

      default: LightDescriptorBase.defaultShadowCameraNear
    });

    _this.hasProp('shadowCameraFar', {
      type: _propTypes2.default.number,
      updateInitial: true,
      update: function update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.far = value;
        }
      },

      default: LightDescriptorBase.defaultShadowCameraFar
    });

    _this.hasProp('castShadow', {
      override: true,
      type: _propTypes2.default.bool,
      update: _this.triggerRemount,
      default: false
    });
    return _this;
  }

  _createClass(LightDescriptorBase, [{
    key: 'hasDirection',
    value: function hasDirection() {
      this._hasDirection = true;

      // recreate the props to use target
      this.removeProp('position');
      this.removeProp('rotation');
      this.removeProp('quaternion');
      this.removeProp('lookAt');
      this.removeProp('matrix');

      this.hasProp('position', {
        type: (0, _propTypeInstanceOf2.default)(THREE.Vector3),
        update: function update(threeObject, position) {
          threeObject.position.copy(position);

          if (threeObject.userData._lookAt) {
            threeObject.lookAt(threeObject.userData._lookAt);
          }

          threeObject.userData._needsDirectionUpdate = true;
        },

        default: new THREE.Vector3()
      });

      this.hasProp('rotation', {
        type: (0, _propTypeInstanceOf2.default)(THREE.Euler),
        update: function update(light, rotation) {
          light.rotation.copy(rotation);

          light.userData._needsDirectionUpdate = true;
        },

        default: new THREE.Euler()
      });

      this.hasProp('quaternion', {
        type: (0, _propTypeInstanceOf2.default)(THREE.Quaternion),
        update: function update(light, quaternion) {
          light.quaternion.copy(quaternion);

          light.userData._needsDirectionUpdate = true;
        },

        default: new THREE.Quaternion()
      });

      this.hasProp('matrix', {
        type: (0, _propTypeInstanceOf2.default)(THREE.Matrix4),
        update: function update(light, matrix) {
          light.matrix.copy(matrix);

          light.matrix.decompose(light.position, light.quaternion, light.scale);

          light.userData._needsDirectionUpdate = true;
        },

        default: new THREE.Matrix4()
      });

      this.hasProp('lookAt', {
        type: (0, _propTypeInstanceOf2.default)(THREE.Vector3),
        update: function update(threeObject, lookAt) {
          threeObject.userData._lookAt = lookAt;

          if (lookAt) {
            threeObject.lookAt(lookAt);

            threeObject.userData._needsDirectionUpdate = true;
          }
        },

        default: undefined
      });
    }
  }, {
    key: 'completePropertyUpdates',
    value: function completePropertyUpdates(threeObject) {
      _get(LightDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(LightDescriptorBase.prototype), 'completePropertyUpdates', this).call(this, threeObject);

      if (threeObject.userData._needsDirectionUpdate) {
        threeObject.userData._needsDirectionUpdate = false;
        updateLightTargetFromQuaternion(threeObject);
      }
    }
  }, {
    key: 'hasColor',
    value: function hasColor() {
      var colorType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'color';
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0xffffff;

      this.hasProp(colorType, {
        type: _propTypes2.default.oneOfType([(0, _propTypeInstanceOf2.default)(THREE.Color), _propTypes2.default.number, _propTypes2.default.string]),
        update: function update(threeObject, newColor) {
          threeObject.color.set(newColor);
        },

        default: defaultValue
      });
    }
  }, {
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      _get(LightDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(LightDescriptorBase.prototype), 'applyInitialProps', this).call(this, threeObject, props);

      if (props.hasOwnProperty('castShadow')) {
        threeObject.castShadow = props.castShadow;
      }

      if (this._hasDirection) {
        threeObject.userData._needsDirectionUpdate = false;

        if (props.position || props.lookAt || props.rotation || props.quaternion) {
          updateLightTargetFromQuaternion(threeObject);
        }
      }
    }
  }, {
    key: 'unmount',
    value: function unmount(threeObject) {
      this.updateAllMaterials(threeObject);

      _get(LightDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(LightDescriptorBase.prototype), 'unmount', this).call(this, threeObject);
    }
  }, {
    key: 'setParent',
    value: function setParent(threeObject, parentObject3d) {
      _get(LightDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(LightDescriptorBase.prototype), 'setParent', this).call(this, threeObject, parentObject3d);

      this.updateAllMaterials(threeObject);
    }
  }, {
    key: 'updateAllMaterials',
    value: function updateAllMaterials(threeObject) {
      var rootInstance = threeObject.userData.markup._rootInstance;
      if (rootInstance && !rootInstance._willUnmount) {
        if (process.env.NODE_ENV !== 'production') {
          if (!this._warnedAboutLightMaterialUpdate && !threeObject.userData._updatesRefreshAllMaterials) {
            var owner = threeObject.userData.react3internalComponent._currentElement._owner;

            var elementType = threeObject.userData.react3internalComponent._elementType;

            (0, _warning2.default)(this._warnedAboutLightMaterialUpdate, LightDescriptorBase.getDynamicWarningMessage(elementType, owner));
            this._warnedAboutLightMaterialUpdate = true;
          }
        }

        rootInstance.allMaterialsNeedUpdate();
      }
    }
  }]);

  return LightDescriptorBase;
}(_Object3DDescriptor3.default), _class.defaultShadowCameraNear = 0.5, _class.defaultShadowCameraFar = 500, _class.defaultShadowBias = 0, _temp);


if (process.env.NODE_ENV !== 'production') {
  LightDescriptorBase.getDynamicWarningMessage = function (elementType, owner) {
    return '<' + elementType + '/> has been updated which triggered a refresh of all materials.\nThis is a potentially expensive operation.\nThis can happen when you add or remove a light, or add or remove any component\nbefore any lights without keys e.g.\n<object3d>\n  {/* new or removed component here */}\n  <ambientLight/>\n</object3d>, or update some properties of lights.\n\nIf you would like to add components, you should either add the components\nafter the lights (recommended), e.g.\n<object3d>\n  <ambientLight/>\n  {/* new or removed component here */}\n</object3d>, or add a \'key\' property to the lights e.g.\n<object3d>\n  {/* new or removed component here */}\n  <ambientLight key="light"/>\n</object3d>.\n\nIf you have modified a light\'s properties e.g. toggled castShadow,\nthe materials need to be rebuilt as well.\n\nTo acknowledge and remove this message, please add the property \'updatesRefreshAllMaterials\'\n  to <' + elementType + '/> inside the render() of ' + (owner && owner.getName() || 'a component') + '.\n\nFor more information, visit https://github.com/mrdoob/threejs/wiki/Updates .';
  };
}

module.exports = LightDescriptorBase;