'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class;

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _THREEElementDescriptor = require('../THREEElementDescriptor');

var _THREEElementDescriptor2 = _interopRequireDefault(_THREEElementDescriptor);

var _resource = require('../decorators/resource');

var _resource2 = _interopRequireDefault(_resource);

var _propTypeInstanceOf = require('../../utils/propTypeInstanceOf');

var _propTypeInstanceOf2 = _interopRequireDefault(_propTypeInstanceOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeometryDescriptorBase = (0, _resource2.default)(_class = function (_THREEElementDescript) {
  _inherits(GeometryDescriptorBase, _THREEElementDescript);

  function GeometryDescriptorBase(react3RendererInstance) {
    _classCallCheck(this, GeometryDescriptorBase);

    var _this = _possibleConstructorReturn(this, (GeometryDescriptorBase.__proto__ || Object.getPrototypeOf(GeometryDescriptorBase)).call(this, react3RendererInstance));

    _this.hasName();

    _this.hasProp('vertices', {
      type: _propTypes2.default.arrayOf((0, _propTypeInstanceOf2.default)(THREE.Vector3)),
      update: function update(threeObject, vertices, hasProp) {
        if (hasProp) {
          if (threeObject.vertices !== vertices) {
            threeObject.vertices = vertices;

            threeObject.verticesNeedUpdate = true;
          }
        }
      },

      updateInitial: true,
      default: []
    });

    _this.hasProp('colors', {
      type: _propTypes2.default.arrayOf((0, _propTypeInstanceOf2.default)(THREE.Color)),
      update: function update(threeObject, colors, hasProp) {
        if (hasProp) {
          if (threeObject.colors !== colors) {
            threeObject.colors = colors;

            threeObject.colorsNeedUpdate = true;
          }
        }
      },

      updateInitial: true,
      default: []
    });

    _this.hasProp('faceVertexUvs', {
      type: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.arrayOf((0, _propTypeInstanceOf2.default)(THREE.Vector2)))), // [materialIndex][faceIndex][vertexIndex]
      update: function update(threeObject, faceVertexUvs, hasProp) {
        if (hasProp) {
          if (threeObject.faceVertexUvs !== faceVertexUvs) {
            threeObject.faceVertexUvs = faceVertexUvs;

            threeObject.uvsNeedUpdate = true;
          }
        }
      },

      updateInitial: true,
      default: []
    });

    _this.hasProp('faces', {
      type: _propTypes2.default.arrayOf((0, _propTypeInstanceOf2.default)(THREE.Face3)),
      update: function update(threeObject, faces, hasProp) {
        if (hasProp) {
          if (threeObject.faces !== faces) {
            threeObject.faces = faces;

            threeObject.verticesNeedUpdate = true;
            threeObject.elementsNeedUpdate = true;
          }
        }
      },

      updateInitial: true,
      default: []
    });

    _this.hasProp('dynamic', {
      type: _propTypes2.default.bool,
      update: function update(threeObject, dynamic) {
        threeObject.dynamic = !!dynamic;
      },

      default: false
    });
    return _this;
  }

  _createClass(GeometryDescriptorBase, [{
    key: 'setParent',
    value: function setParent(geometry, parentObject3D) {
      (0, _invariant2.default)(parentObject3D instanceof THREE.Mesh || parentObject3D instanceof THREE.Points || parentObject3D instanceof THREE.Line, 'Parent is not a mesh');
      (0, _invariant2.default)(parentObject3D.geometry === undefined, 'Parent already has a geometry');

      _get(GeometryDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(GeometryDescriptorBase.prototype), 'setParent', this).call(this, geometry, parentObject3D);

      parentObject3D.geometry = geometry;
    }
  }, {
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      // ensure the userData is created
      threeObject.userData = _extends({}, threeObject.userData);

      if (props.hasOwnProperty('dynamic')) {
        threeObject.dynamic = !!props.dynamic;
      }

      threeObject.userData._remountAfterPropsUpdate = false;

      _get(GeometryDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(GeometryDescriptorBase.prototype), 'applyInitialProps', this).call(this, threeObject, props);
    }
  }, {
    key: 'unmount',
    value: function unmount(geometry) {
      var parent = geometry.userData.markup.parentMarkup.threeObject;

      // could either be a resource description or an actual geometry
      if (parent instanceof THREE.Mesh || parent instanceof THREE.Points) {
        if (parent.geometry === geometry) {
          parent.geometry = undefined;
        }
      }

      geometry.dispose();

      _get(GeometryDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(GeometryDescriptorBase.prototype), 'unmount', this).call(this, geometry);
    }
  }, {
    key: 'highlight',
    value: function highlight(threeObject) {
      var ownerMesh = threeObject.userData.markup.parentMarkup.threeObject;
      threeObject.userData.events.emit('highlight', {
        uuid: threeObject.uuid,
        boundingBoxFunc: function boundingBoxFunc() {
          var boundingBox = new THREE.Box3();

          boundingBox.setFromObject(ownerMesh);

          return [boundingBox];
        }
      });
    }
  }, {
    key: 'getBoundingBoxes',
    value: function getBoundingBoxes(threeObject) {
      var ownerMesh = threeObject.userData.markup.parentMarkup.threeObject;

      var boundingBox = new THREE.Box3();

      boundingBox.setFromObject(ownerMesh);

      return [boundingBox];
    }
  }, {
    key: 'hideHighlight',
    value: function hideHighlight(threeObject) {
      threeObject.userData.events.emit('hideHighlight');
    }
  }]);

  return GeometryDescriptorBase;
}(_THREEElementDescriptor2.default)) || _class;

module.exports = GeometryDescriptorBase;