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

var _THREEElementDescriptor = require('../THREEElementDescriptor');

var _THREEElementDescriptor2 = _interopRequireDefault(_THREEElementDescriptor);

var _resource = require('../decorators/resource');

var _resource2 = _interopRequireDefault(_resource);

var _ResourceReference = require('../../Resources/ResourceReference');

var _ResourceReference2 = _interopRequireDefault(_ResourceReference);

var _propTypeInstanceOf = require('../../utils/propTypeInstanceOf');

var _propTypeInstanceOf2 = _interopRequireDefault(_propTypeInstanceOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MaterialDescriptorBase = (0, _resource2.default)(_class = function (_THREEElementDescript) {
  _inherits(MaterialDescriptorBase, _THREEElementDescript);

  function MaterialDescriptorBase(react3Instance) {
    _classCallCheck(this, MaterialDescriptorBase);

    var _this = _possibleConstructorReturn(this, (MaterialDescriptorBase.__proto__ || Object.getPrototypeOf(MaterialDescriptorBase)).call(this, react3Instance));

    _this._invalidChild = function (child) {
      return _this.invalidChildInternal(child);
    };

    _this.hasProp('slot', {
      type: _propTypes2.default.string,
      updateInitial: true,
      update: function update(threeObject, slot, hasProperty) {
        if (hasProperty) {
          threeObject.userData._materialSlot = slot;
        } else {
          threeObject.userData._materialSlot = 'material';
        }
      },
      default: 'material'
    });

    _this.hasProp('transparent', {
      type: _propTypes2.default.bool,
      simple: true
    });

    _this.hasProp('alphaTest', {
      type: _propTypes2.default.number,
      updateInitial: true,
      update: function update(threeObject, alphaTest) {
        threeObject.alphaTest = alphaTest;
        threeObject.needsUpdate = true;
      },
      default: 0
    });

    _this.hasProp('side', {
      type: _propTypes2.default.oneOf([THREE.FrontSide, THREE.BackSide, THREE.DoubleSide]),
      updateInitial: true,
      update: function update(threeObject, side) {
        threeObject.side = side;
      },
      default: THREE.FrontSide
    });

    _this.hasProp('depthTest', {
      type: _propTypes2.default.bool,
      simple: true,
      default: true
    });

    _this.hasProp('depthWrite', {
      type: _propTypes2.default.bool,
      simple: true,
      default: true
    });

    _this.hasProp('blending', {
      type: _propTypes2.default.oneOf([THREE.NoBlending, THREE.NormalBlending, THREE.AdditiveBlending, THREE.SubtractiveBlending, THREE.MultiplyBlending, THREE.CustomBlending]),
      simple: true,
      default: THREE.NormalBlending
    });

    _this.hasProp('depthFunc', {
      type: _propTypes2.default.oneOf([THREE.NeverDepth, THREE.AlwaysDepth, THREE.LessDepth, THREE.LessEqualDepth, THREE.EqualDepth, THREE.GreaterEqualDepth, THREE.GreaterDepth, THREE.NotEqualDepth]),
      simple: true,
      default: THREE.LessEqualDepth
    });

    _this.hasProp('opacity', {
      type: _propTypes2.default.number,
      simple: true
    });

    _this.hasProp('visible', {
      type: _propTypes2.default.bool,
      simple: true,
      default: true
    });

    _this.hasProp('vertexColors', {
      type: _propTypes2.default.oneOf([THREE.NoColors, THREE.FaceColors, THREE.VertexColors]),
      simple: true,
      default: THREE.NoColors
    });

    _this._colors = [];
    _this._supportedMaps = {};
    return _this;
  }

  _createClass(MaterialDescriptorBase, [{
    key: 'hasMap',
    value: function hasMap() {
      var mapPropertyName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'map';

      this._supportedMaps[mapPropertyName] = true;

      this.hasProp(mapPropertyName, {
        type: (0, _propTypeInstanceOf2.default)(THREE.Texture),
        update: function update(threeObject, value) {
          threeObject.userData['_' + mapPropertyName + '}Property'] = value;

          if (!threeObject.userData['_has' + mapPropertyName + '}TextureChild']) {
            if (threeObject[mapPropertyName] !== value) {
              threeObject.needsUpdate = true;
            }
            threeObject[mapPropertyName] = value;
          } else {
            var slotInfo = 'texture';

            if (mapPropertyName !== 'map') {
              slotInfo += 'with a \'' + mapPropertyName + '\' slot';
            }

            (0, _warning2.default)(value === null, 'The material already has a' + (' ' + slotInfo + ' assigned to it as a child;') + (' therefore the \'' + mapPropertyName + '\' property will have no effect'));
          }
        },

        updateInitial: true,
        default: null
      });
    }
  }, {
    key: 'getMaterialDescription',
    value: function getMaterialDescription(props) {
      var materialDescription = {};

      this._colors.forEach(function (colorPropName) {
        if (props.hasOwnProperty(colorPropName)) {
          materialDescription[colorPropName] = props[colorPropName];
        }
      });

      if (props.hasOwnProperty('side')) {
        materialDescription.side = props.side;
      }

      return materialDescription;
    }
  }, {
    key: 'hasColor',
    value: function hasColor() {
      var propName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'color';
      var defaultVal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0xffffff;

      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(this._colors.indexOf(propName) === -1, 'This color is already defined for %s.', this.constructor.name);
      }

      this._colors.push(propName);

      this.hasProp(propName, {
        type: _propTypes2.default.oneOfType([(0, _propTypeInstanceOf2.default)(THREE.Color), _propTypes2.default.number, _propTypes2.default.string]),
        update: function update(threeObject, value) {
          threeObject[propName].set(value);
        },
        default: defaultVal
      });
    }
  }, {
    key: 'hasWireframe',
    value: function hasWireframe() {
      this.hasProp('wireframe', {
        type: _propTypes2.default.bool,
        simple: true,
        default: false
      });

      this.hasProp('wireframeLinewidth', {
        type: _propTypes2.default.number,
        simple: true,
        default: 1
      });
    }
  }, {
    key: 'construct',
    value: function construct() {
      return new THREE.Material({});
    }
  }, {
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      threeObject.userData = _extends({}, threeObject.userData, {
        _hasTextureChild: false
      });

      _get(MaterialDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(MaterialDescriptorBase.prototype), 'applyInitialProps', this).call(this, threeObject, props);
    }
  }, {
    key: 'setParent',
    value: function setParent(material, parentObject3D) {
      (0, _invariant2.default)(parentObject3D instanceof THREE.Mesh || parentObject3D instanceof THREE.Points || parentObject3D instanceof THREE.Sprite || parentObject3D instanceof THREE.Line, 'Parent is not a mesh');
      (0, _invariant2.default)(parentObject3D[material.userData._materialSlot] === undefined || parentObject3D[material.userData._materialSlot] === null, 'Parent already has a ' + material.userData._materialSlot + ' defined');
      _get(MaterialDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(MaterialDescriptorBase.prototype), 'setParent', this).call(this, material, parentObject3D);

      parentObject3D[material.userData._materialSlot] = material;
    }
  }, {
    key: 'unmount',
    value: function unmount(material) {
      var parent = material.userData.markup.parentMarkup.threeObject;

      // could either be a resource description or an actual material
      if (parent instanceof THREE.Mesh || parent instanceof THREE.Sprite || parent instanceof THREE.Line || parent instanceof THREE.Points) {
        var slot = material.userData._materialSlot;

        if (parent[slot] === material) {
          // TODO: set material slot to null rather than undefined

          parent[slot] = undefined;
        }
      }

      material.dispose();

      _get(MaterialDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(MaterialDescriptorBase.prototype), 'unmount', this).call(this, material);
    }
  }, {
    key: 'highlight',
    value: function highlight(threeObject) {
      var ownerMesh = threeObject.userData.markup.parentMarkup.threeObject;

      threeObject.userData.events.emit('highlight', {
        uuid: threeObject.uuid,
        boundingBoxFunc: function boundingBoxFunc() {
          var boundingBox = new THREE.Box3();

          if (ownerMesh && ownerMesh.geometry && ownerMesh.geometry.computeBoundingBox) {
            ownerMesh.geometry.computeBoundingBox();
          }

          boundingBox.setFromObject(ownerMesh);

          return [boundingBox];
        }
      });
    }
  }, {
    key: 'getBoundingBoxes',
    value: function getBoundingBoxes(threeObject) {
      var boundingBox = new THREE.Box3();

      var ownerMesh = threeObject.userData.markup.parentMarkup.threeObject;

      if (ownerMesh && ownerMesh.geometry && ownerMesh.geometry.computeBoundingBox) {
        ownerMesh.geometry.computeBoundingBox();
      }

      boundingBox.setFromObject(ownerMesh);

      return [boundingBox];
    }
  }, {
    key: 'hideHighlight',
    value: function hideHighlight(threeObject) {
      threeObject.userData.events.emit('hideHighlight');
    }
  }, {
    key: 'addChildren',
    value: function addChildren(threeObject, children) {
      (0, _invariant2.default)(children.filter(this._invalidChild).length === 0, 'Material children can only be textures or texture resource references!');
    }
  }, {
    key: 'addChild',
    value: function addChild(threeObject, child) {
      this.addChildren(threeObject, [child]);
    }
  }, {
    key: 'moveChild',
    value: function moveChild() {
      // doesn't matter
    }
  }, {
    key: 'removeChild',
    value: function removeChild() {
      // doesn't matter since the texture will take care of things on unmount
    }
  }, {
    key: 'invalidChildInternal',
    value: function invalidChildInternal(child) {
      return !(child instanceof THREE.Texture || child instanceof _ResourceReference2.default);
    }
  }]);

  return MaterialDescriptorBase;
}(_THREEElementDescriptor2.default)) || _class;

module.exports = MaterialDescriptorBase;