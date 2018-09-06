'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _GeometryDescriptorBase = require('./GeometryDescriptorBase');

var _GeometryDescriptorBase2 = _interopRequireDefault(_GeometryDescriptorBase);

var _ShapeResourceReference = require('../../Resources/ShapeResourceReference');

var _ShapeResourceReference2 = _interopRequireDefault(_ShapeResourceReference);

var _propTypeInstanceOf = require('../../utils/propTypeInstanceOf');

var _propTypeInstanceOf2 = _interopRequireDefault(_propTypeInstanceOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeometryWithShapesDescriptor = function (_GeometryDescriptorBa) {
  _inherits(GeometryWithShapesDescriptor, _GeometryDescriptorBa);

  function GeometryWithShapesDescriptor(react3RendererInstance) {
    _classCallCheck(this, GeometryWithShapesDescriptor);

    var _this = _possibleConstructorReturn(this, (GeometryWithShapesDescriptor.__proto__ || Object.getPrototypeOf(GeometryWithShapesDescriptor)).call(this, react3RendererInstance));

    _this._invalidChild = function (child) {
      return !(child instanceof THREE.Shape || child instanceof _ShapeResourceReference2.default);
    };

    _this.hasProp('shapes', {
      type: _propTypes2.default.arrayOf((0, _propTypeInstanceOf2.default)(THREE.Shape)),
      updateInitial: true,
      update: function update(threeObject, shapes) {
        threeObject.userData._shapesFromProps = shapes || [];

        threeObject.userData._needsToRefreshGeometry = true;
      },
      default: []
    });

    var optionNames = ['curveSegments'];

    var optionTypes = [_propTypes2.default.number, _propTypes2.default.number, _propTypes2.default.shape({
      generateTopUV: _propTypes2.default.func,
      generateSideWallUV: _propTypes2.default.func
    })];

    optionNames.forEach(function (propName, i) {
      _this.hasProp(propName, {
        type: optionTypes[i],
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

  _createClass(GeometryWithShapesDescriptor, [{
    key: 'completePropertyUpdates',
    value: function completePropertyUpdates(threeObject) {
      if (threeObject.userData._needsToRefreshGeometry) {
        this.refreshGeometry(threeObject);

        threeObject.userData._needsToRefreshGeometry = false;
      }
    }
  }, {
    key: 'construct',
    value: function construct() {
      return new THREE.BufferGeometry();
    }
  }, {
    key: 'getOptions',
    value: function getOptions(props) {
      var options = {};

      ['curveSegments'].forEach(function (propName) {
        if (props.hasOwnProperty(propName)) {
          options[propName] = props[propName];
        }
      });

      return options;
    }
  }, {
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      _get(GeometryWithShapesDescriptor.prototype.__proto__ || Object.getPrototypeOf(GeometryWithShapesDescriptor.prototype), 'applyInitialProps', this).call(this, threeObject, props);

      threeObject.userData._shapeCache = [];
      threeObject.userData._options = this.getOptions(props);
      threeObject.userData._resourceListenerCleanupFunctions = [];
      threeObject.userData._needsToRefreshGeometry = false;

      if (!props.children) {
        // will use shapes only from props
        this.refreshGeometry(threeObject);
      }
    }
  }, {
    key: 'addChildren',
    value: function addChildren(threeObject, children) {
      var _this2 = this;

      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(children.filter(this._invalidChild).length === 0, 'shape-based geometry children' + ' can only be shapes!');
      } else {
        (0, _invariant2.default)(children.filter(this._invalidChild).length === 0, false);
      }

      var shapeCache = [];

      children.forEach(function (child) {
        if (child instanceof _ShapeResourceReference2.default) {
          var shapeIndex = shapeCache.length;

          var resourceListener = function resourceListener(shape) {
            threeObject.userData._shapeCache[shapeIndex] = shape;

            _this2.refreshGeometry(threeObject);
          };

          resourceListener.target = child;

          var cleanupFunction = function cleanupFunction() {
            child.userData.events.removeListener('resource.set', resourceListener);

            threeObject.userData._resourceListenerCleanupFunctions.splice(threeObject.userData._resourceListenerCleanupFunctions.indexOf(cleanupFunction), 1);
          };

          threeObject.userData._resourceListenerCleanupFunctions.push(cleanupFunction);

          child.userData.events.on('resource.set', resourceListener);
          child.userData.events.once('dispose', function () {
            cleanupFunction();
          });

          shapeCache.push(null);
        } else {
          shapeCache.push(child);
        }
      });

      threeObject.userData._shapeCache = shapeCache;

      this.refreshGeometry(threeObject);
    }
  }, {
    key: 'addChild',
    value: function addChild(threeObject) {
      // new shape was added
      // TODO optimize

      this.triggerRemount(threeObject);
    }
  }, {
    key: 'moveChild',
    value: function moveChild(threeObject) {
      // a shape was moved
      // TODO optimize

      this.triggerRemount(threeObject);
    }
  }, {
    key: 'removeChild',
    value: function removeChild(threeObject) {
      // shape was removed
      // TODO optimize

      this.triggerRemount(threeObject);
    }
  }, {
    key: 'unmount',
    value: function unmount(geometry) {
      geometry.userData._resourceListenerCleanupFunctions.forEach(function (listener) {
        listener();
      });

      delete geometry.userData._options;
      delete geometry.userData._resourceListenerCleanupFunctions;
      delete geometry.userData._shapesFromProps;

      return _get(GeometryWithShapesDescriptor.prototype.__proto__ || Object.getPrototypeOf(GeometryWithShapesDescriptor.prototype), 'unmount', this).call(this, geometry);
    }
  }]);

  return GeometryWithShapesDescriptor;
}(_GeometryDescriptorBase2.default);

module.exports = GeometryWithShapesDescriptor;