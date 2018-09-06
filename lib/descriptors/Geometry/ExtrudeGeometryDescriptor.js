'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GeometryWithShapesDescriptor = require('./GeometryWithShapesDescriptor');

var _GeometryWithShapesDescriptor2 = _interopRequireDefault(_GeometryWithShapesDescriptor);

var _propTypeInstanceOf = require('../../utils/propTypeInstanceOf');

var _propTypeInstanceOf2 = _interopRequireDefault(_propTypeInstanceOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExtrudeGeometryDescriptor = function (_GeometryWithShapesDe) {
  _inherits(ExtrudeGeometryDescriptor, _GeometryWithShapesDe);

  function ExtrudeGeometryDescriptor(react3RendererInstance) {
    _classCallCheck(this, ExtrudeGeometryDescriptor);

    var _this = _possibleConstructorReturn(this, (ExtrudeGeometryDescriptor.__proto__ || Object.getPrototypeOf(ExtrudeGeometryDescriptor)).call(this, react3RendererInstance));

    _this.hasProp('settings', {
      type: _propTypes2.default.any,
      update: function update(threeObject, settings) {
        threeObject.userData._settings = settings;
      },

      updateInitial: true,
      default: undefined
    });

    _this.hasProp('UVGenerator', {
      type: _propTypes2.default.shape({
        generateTopUV: _propTypes2.default.func,
        generateSideWallUV: _propTypes2.default.func
      }),
      update: function update(threeObject, value) {
        if (value === undefined) {
          delete threeObject.userData._options.UVGenerator;
        } else {
          threeObject.userData._options.UVGenerator = value;
        }

        threeObject.userData._needsToRefreshGeometry = true;
      },
      default: undefined
    });

    ['steps', 'amount', 'bevelThickness', 'bevelSize', 'bevelSegments', 'extrudeMaterial'].forEach(function (propName) {
      _this.hasProp(propName, {
        type: _propTypes2.default.number,
        update: function update(threeObject, value) {
          if (value === undefined) {
            delete threeObject.userData._options[propName];
          } else {
            threeObject.userData._options[propName] = value;
          }

          threeObject.userData._needsToRefreshGeometry = true;
        },
        default: undefined
      });
    });

    var extraNames = ['bevelEnabled', 'extrudePath', 'frames'];

    var extraTypes = [_propTypes2.default.bool, // bevelEnabled
    (0, _propTypeInstanceOf2.default)(THREE.CurvePath), // extrudePath
    _propTypes2.default.shape({
      tangents: _propTypes2.default.arrayOf((0, _propTypeInstanceOf2.default)(THREE.Vector3)),
      normals: _propTypes2.default.arrayOf((0, _propTypeInstanceOf2.default)(THREE.Vector3)),
      binormals: _propTypes2.default.arrayOf((0, _propTypeInstanceOf2.default)(THREE.Vector3))
    })];

    extraNames.forEach(function (propName, i) {
      _this.hasProp(propName, {
        type: extraTypes[i],
        update: function update(threeObject, value) {
          if (value === undefined) {
            delete threeObject.userData._options[propName];
          } else {
            threeObject.userData._options[propName] = value;
          }

          threeObject.userData._needsToRefreshGeometry = true;
        },
        default: undefined
      });
    });
    return _this;
  }

  // noinspection JSMethodCanBeStatic


  _createClass(ExtrudeGeometryDescriptor, [{
    key: 'refreshGeometry',
    value: function refreshGeometry(threeObject) {
      var shapes = threeObject.userData._shapeCache.filter(function (shape) {
        return !!shape;
      }).concat(threeObject.userData._shapesFromProps);

      threeObject.fromGeometry(new THREE.ExtrudeGeometry(shapes, _extends({}, threeObject.userData._options, threeObject.userData._settings)));
    }
  }, {
    key: 'getOptions',
    value: function getOptions(props) {
      var options = _get(ExtrudeGeometryDescriptor.prototype.__proto__ || Object.getPrototypeOf(ExtrudeGeometryDescriptor.prototype), 'getOptions', this).call(this, props);

      ['steps', 'amount', 'bevelEnabled', 'bevelThickness', 'bevelSize', 'bevelSegments', 'extrudePath', 'frames', 'extrudeMaterial'].forEach(function (propName) {
        if (props.hasOwnProperty(propName)) {
          options[propName] = props[propName];
        }
      });

      return options;
    }
  }]);

  return ExtrudeGeometryDescriptor;
}(_GeometryWithShapesDescriptor2.default);

module.exports = ExtrudeGeometryDescriptor;