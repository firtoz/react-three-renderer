'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class;

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _warning = require('fbjs/lib/warning');

var _warning2 = _interopRequireDefault(_warning);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _resource = require('../decorators/resource');

var _resource2 = _interopRequireDefault(_resource);

var _THREEElementDescriptor = require('../THREEElementDescriptor');

var _THREEElementDescriptor2 = _interopRequireDefault(_THREEElementDescriptor);

var _Uniform = require('../../Uniform');

var _Uniform2 = _interopRequireDefault(_Uniform);

var _React3Renderer = require('../../React3Renderer');

var _React3Renderer2 = _interopRequireDefault(_React3Renderer);

var _propTypeInstanceOf = require('../../utils/propTypeInstanceOf');

var _propTypeInstanceOf2 = _interopRequireDefault(_propTypeInstanceOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextureDescriptor = (0, _resource2.default)(_class = function (_THREEElementDescript) {
  _inherits(TextureDescriptor, _THREEElementDescript);

  function TextureDescriptor(react3RendererInstance) {
    _classCallCheck(this, TextureDescriptor);

    var _this = _possibleConstructorReturn(this, (TextureDescriptor.__proto__ || Object.getPrototypeOf(TextureDescriptor)).call(this, react3RendererInstance));

    _this.hasProp('slot', {
      type: _propTypes2.default.oneOf(['map', 'specularMap', 'lightMap', 'aoMap', 'emissiveMap', 'bumpMap', 'normalMap', 'displacementMap', 'roughnessMap', 'metalnessMap', 'alphaMap', 'envMap']),
      updateInitial: true,
      update: function update(texture, slot) {
        var lastSlot = texture.userData._materialSlot;
        texture.userData._materialSlot = slot;

        if (texture.userData.markup) {
          var parentMarkup = texture.userData.markup.parentMarkup;
          if (parentMarkup) {
            var parent = parentMarkup.threeObject;

            if (parent instanceof THREE.Material) {
              if (process.env.NODE_ENV !== 'production') {
                _this.validateParentSlot(parent, slot);
              }

              // remove from previous slot and assign to new slot
              // TODO add test for this
              _this.removeFromSlotOfMaterial(parent, lastSlot, texture);
              _this.addToSlotOfMaterial(parent, slot, texture);
            }
          }
        }
      },
      default: 'map'
    });

    _this.hasProp('repeat', {
      type: (0, _propTypeInstanceOf2.default)(THREE.Vector2),
      updateInitial: true,
      update: function update(threeObject, repeat) {
        if (repeat) {
          threeObject.repeat.copy(repeat);
        } else {
          threeObject.repeat.set(1, 1);
        }
      },

      default: new THREE.Vector2(1, 1)
    });

    _this.hasProp('offset', {
      type: (0, _propTypeInstanceOf2.default)(THREE.Vector2),
      updateInitial: true,
      update: function update(threeObject, offset) {
        if (offset) {
          threeObject.offset.copy(offset);
        } else {
          threeObject.offset.set(0, 0);
        }
      },

      default: new THREE.Vector2(0, 0)
    });

    ['wrapS', 'wrapT'].forEach(function (propName) {
      _this.hasProp(propName, {
        type: _propTypes2.default.oneOf([THREE.RepeatWrapping, THREE.ClampToEdgeWrapping, THREE.MirroredRepeatWrapping]),
        updateInitial: true,
        update: function update(threeObject, value) {
          threeObject[propName] = value;
          if (threeObject.image) {
            threeObject.needsUpdate = true;
          }
        },

        default: THREE.ClampToEdgeWrapping
      });
    });

    _this.hasProp('anisotropy', {
      type: _propTypes2.default.number,
      updateInitial: true,
      update: function update(threeObject, value) {
        threeObject.anisotropy = value;
        if (threeObject.image) {
          threeObject.needsUpdate = true;
        }
      },

      default: 1
    });

    _this.hasProp('url', {
      type: _propTypes2.default.string.isRequired,
      update: _this.triggerRemount,
      default: ''
    });

    _this.hasProp('crossOrigin', {
      type: _propTypes2.default.string,
      update: _this.triggerRemount,
      default: undefined
    });

    ['onLoad', 'onProgress', 'onError'].forEach(function (eventName) {
      _this.hasProp(eventName, {
        type: _propTypes2.default.func,
        update: function update() {
          // do nothing because these props are only used for initial loading callbacks
        },

        default: undefined
      });
    });

    _this.hasProp('magFilter', {
      type: _propTypes2.default.oneOf([THREE.LinearFilter, THREE.NearestFilter]),
      update: function update(texture, magFilter) {
        texture.magFilter = magFilter;
        if (texture.image) {
          texture.needsUpdate = true;
        }
      },

      default: THREE.LinearFilter
    });

    _this.hasProp('minFilter', {
      type: _propTypes2.default.oneOf([THREE.LinearMipMapLinearFilter, THREE.NearestFilter, THREE.NearestMipMapNearestFilter, THREE.NearestMipMapLinearFilter, THREE.LinearFilter, THREE.LinearMipMapNearestFilter]),
      update: function update(texture, minFilter) {
        texture.minFilter = minFilter;
        if (texture.image) {
          texture.needsUpdate = true;
        }
      },

      default: THREE.LinearMipMapLinearFilter
    });
    return _this;
  }

  _createClass(TextureDescriptor, [{
    key: 'construct',
    value: function construct(props) {
      var result = void 0;

      if (props.hasOwnProperty('url')) {
        var textureLoader = new THREE.TextureLoader();

        if (props.hasOwnProperty('crossOrigin')) {
          textureLoader.crossOrigin = props.crossOrigin;
        }

        var onLoad = void 0;
        var onProgress = void 0;
        var onError = void 0;

        if (props.hasOwnProperty('onLoad')) {
          onLoad = props.onLoad;
        }

        if (props.hasOwnProperty('onProgress')) {
          onProgress = props.onProgress;
        }

        if (props.hasOwnProperty('onError')) {
          onError = props.onError;
        }

        result = textureLoader.load(props.url, onLoad, onProgress, onError);
        if (props.hasOwnProperty('minFilter')) {
          result.minFilter = props.minFilter;
        }
      } else {
        (0, _invariant2.default)(false, 'The texture needs a url property.');
      }

      return result;
    }
  }, {
    key: 'setParent',
    value: function setParent(texture, parent) {
      if (parent instanceof THREE.Material) {
        var slot = texture.userData._materialSlot;


        if (process.env.NODE_ENV !== 'production') {
          this.validateParentSlot(parent, slot);
        }

        this.addToSlotOfMaterial(parent, slot, texture);
      } else if (parent instanceof _Uniform2.default) {
        // Uniform as per the assert above
        parent.setValue(texture);
      } else {
        (0, _invariant2.default)(false, 'Parent of a texture is not a material nor a uniform, it needs to be one of them.');
      }

      _get(TextureDescriptor.prototype.__proto__ || Object.getPrototypeOf(TextureDescriptor.prototype), 'setParent', this).call(this, texture, parent);
    }
  }, {
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      threeObject.userData = _extends({}, threeObject.userData);

      _get(TextureDescriptor.prototype.__proto__ || Object.getPrototypeOf(TextureDescriptor.prototype), 'applyInitialProps', this).call(this, threeObject, props);
    }
  }, {
    key: 'unmount',
    value: function unmount(texture) {
      var parent = texture.userData.markup.parentMarkup.threeObject;

      var slot = texture.userData._materialSlot;

      // could either be a resource description or an actual texture

      if (parent instanceof THREE.Material) {
        this.removeFromSlotOfMaterial(parent, slot, texture);
      } else if (parent instanceof _Uniform2.default) {
        if (parent.value === texture) {
          parent.setValue(null);
        }
      }

      texture.dispose();

      _get(TextureDescriptor.prototype.__proto__ || Object.getPrototypeOf(TextureDescriptor.prototype), 'unmount', this).call(this, texture);
    }
  }, {
    key: 'removeFromSlotOfMaterial',
    value: function removeFromSlotOfMaterial(material, slot, texture) {
      if (material[slot] === texture) {
        material.userData['_has' + slot + '}TextureChild'] = false;

        if (material.userData['_' + slot + '}Property']) {
          // restore the map property
          material[slot] = material.userData['_' + slot + '}Property'];
        } else {
          material[slot] = null;
        }

        material.needsUpdate = true;
      }
    }
  }, {
    key: 'addToSlotOfMaterial',
    value: function addToSlotOfMaterial(material, slot, texture) {
      material.userData['_has' + slot + '}TextureChild'] = true;

      if (material.userData['_' + slot + '}Property']) {
        var slotInfo = 'texture';

        if (slot !== 'map') {
          slotInfo += 'with a \'' + slot + '\' slot';
        }

        (0, _warning2.default)(false, 'The material already has a' + (' \'' + slot + '\' property but a ' + slotInfo + ' is being added as a child.') + ' The child will override the property.');
      } else {
        // removing invariant to enable slot swapping
      }

      if (material[slot] !== texture) {
        material[slot] = texture;
      }
    }
  }, {
    key: 'validateParentSlot',
    value: function validateParentSlot(parent, slot) {
      var react3internalComponent = parent.userData.react3internalComponent;
      if (react3internalComponent) {
        var descriptor = react3internalComponent.threeElementDescriptor;
        if (descriptor && !descriptor._supportedMaps[slot]) {
          // TODO add test for this
          (0, _warning2.default)(false, 'A texture cannot be assigned as a \'' + slot + '\' to \'' + parent.type + '\'');
        }
      }
    }
  }, {
    key: 'highlight',
    value: function highlight(threeObject) {
      var parent = threeObject.userData.markup.parentMarkup.threeObject;
      parent.userData._descriptor.highlight(parent);
    }
  }, {
    key: 'hideHighlight',
    value: function hideHighlight(threeObject) {
      var parent = threeObject.userData.markup.parentMarkup.threeObject;
      parent.userData._descriptor.hideHighlight(parent);
    }
  }]);

  return TextureDescriptor;
}(_THREEElementDescriptor2.default)) || _class;

module.exports = TextureDescriptor;