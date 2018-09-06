'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = require('fbjs/lib/warning');

var _warning2 = _interopRequireDefault(_warning);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _THREEElementDescriptor = require('./THREEElementDescriptor');

var _THREEElementDescriptor2 = _interopRequireDefault(_THREEElementDescriptor);

var _React3Instance = require('../React3Instance');

var _React3Instance2 = _interopRequireDefault(_React3Instance);

var _propTypeInstanceOf = require('../utils/propTypeInstanceOf');

var _propTypeInstanceOf2 = _interopRequireDefault(_propTypeInstanceOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propProxy = {
  gammaInput: {
    type: _propTypes2.default.bool,
    default: false
  },
  gammaOutput: {
    type: _propTypes2.default.bool,
    default: false
  },
  sortObjects: {
    type: _propTypes2.default.bool,
    default: true
  },
  context: {
    type: _propTypes2.default.oneOf(['2d', '3d']).isRequired,
    default: '3d'
  },
  mainCamera: {
    type: _propTypes2.default.string,
    default: undefined
  },
  onAnimate: {
    type: _propTypes2.default.func,
    default: undefined
  },
  clearColor: {
    type: _propTypes2.default.oneOfType([(0, _propTypeInstanceOf2.default)(THREE.Color), _propTypes2.default.number, _propTypes2.default.string]),
    default: 0x000000
  },
  clearAlpha: {
    type: _propTypes2.default.number,
    default: undefined
  },
  alpha: {
    type: _propTypes2.default.bool,
    default: false
  },
  shadowMapEnabled: {
    type: _propTypes2.default.bool,
    default: false
  },
  shadowMapType: {
    type: _propTypes2.default.oneOf([THREE.BasicShadowMap, THREE.PCFShadowMap, THREE.PCFSoftShadowMap]),
    default: THREE.PCFShadowMap
  },
  shadowMapCullFace: {
    type: _propTypes2.default.oneOf([THREE.CullFaceNone, THREE.CullFaceBack, THREE.CullFaceFront, THREE.CullFaceFrontBack]),
    default: THREE.CullFaceFront
  },
  shadowMapDebug: {
    type: _propTypes2.default.bool,
    default: false
  },
  onRecreateCanvas: {
    type: _propTypes2.default.func.isRequired,
    default: undefined
  },
  pixelRatio: {
    type: _propTypes2.default.number,
    default: 1
  },
  width: {
    type: _propTypes2.default.number.isRequired,
    default: 1
  },
  height: {
    type: _propTypes2.default.number.isRequired,
    default: 1
  },
  precision: {
    type: _propTypes2.default.oneOf(['highp', 'mediump', 'lowp']),
    default: 'highp'
  },
  premultipliedAlpha: {
    type: _propTypes2.default.bool,
    default: true
  },
  antialias: {
    type: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number]),
    default: false
  },
  stencil: {
    type: _propTypes2.default.bool,
    default: true
  },
  preserveDrawingBuffer: {
    type: _propTypes2.default.bool,
    default: false
  },
  depth: {
    type: _propTypes2.default.bool,
    default: true
  },
  logarithmicDepthBuffer: {
    type: _propTypes2.default.bool,
    default: false
  },
  onRendererUpdated: {
    type: _propTypes2.default.func,
    default: undefined
  },
  forceManualRender: {
    type: _propTypes2.default.bool,
    default: false
  },
  onManualRenderTriggerCreated: {
    type: _propTypes2.default.func,
    default: undefined
  },
  customRenderer: {
    type: _propTypes2.default.func,
    default: undefined
  },
  customRender: {
    type: _propTypes2.default.func,
    default: undefined
  }
};

var React3Descriptor = function (_THREEElementDescript) {
  _inherits(React3Descriptor, _THREEElementDescript);

  function React3Descriptor(react3RendererInstance) {
    _classCallCheck(this, React3Descriptor);

    var _this = _possibleConstructorReturn(this, (React3Descriptor.__proto__ || Object.getPrototypeOf(React3Descriptor)).call(this, react3RendererInstance));

    Object.keys(propProxy).forEach(function (propName) {
      var info = propProxy[propName];
      var propNameFirstLetterCapital = propName[0].toUpperCase() + propName.substr(1);

      var updateFunctionName = 'update' + propNameFirstLetterCapital;

      if (process.env.NODE_ENV !== 'production') {
        (0, _warning2.default)(_React3Instance2.default.prototype.hasOwnProperty(updateFunctionName), 'Missing function %s in React3DInstance class.', updateFunctionName);
      }

      var propInfo = {
        type: info.type,
        update: function update(threeObject, newValue) {
          threeObject[updateFunctionName](newValue);
        }
      };

      if (info.hasOwnProperty('default')) {
        propInfo.default = info.default;
      }

      _this.hasProp(propName, propInfo);
    });
    return _this;
  }

  _createClass(React3Descriptor, [{
    key: 'completePropertyUpdates',
    value: function completePropertyUpdates(threeObject) {
      if (process.env.NODE_ENV !== 'production') {
        if (!threeObject._warnedAboutManualRendering) {
          if (threeObject._forceManualRender && !threeObject._manualRenderTriggerCallback) {
            threeObject._warnedAboutManualRendering = true;
            (0, _warning2.default)(false, 'The `React3` component has `forceManualRender` property set, but not' + ' `onManualRenderTriggerCreated`. You will not be able to update the view.');
          }
        }
      }
    }
  }, {
    key: 'setParent',
    value: function setParent(threeObject, parentObject3D) {
      (0, _invariant2.default)(parentObject3D instanceof HTMLCanvasElement, 'The `react3` element can only be rendered into a canvas.');

      _get(React3Descriptor.prototype.__proto__ || Object.getPrototypeOf(React3Descriptor.prototype), 'setParent', this).call(this, threeObject, parentObject3D);

      threeObject.updateCanvas(parentObject3D);
    }
  }, {
    key: 'construct',
    value: function construct(props) {
      return new _React3Instance2.default(props, this.react3RendererInstance);
    }
  }, {
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      _get(React3Descriptor.prototype.__proto__ || Object.getPrototypeOf(React3Descriptor.prototype), 'applyInitialProps', this).call(this, threeObject, props);

      threeObject.initialize();
    }

    // gets called every time there are children to be added
    // this can be called multiple times as more children are added.

  }, {
    key: 'addChildren',
    value: function addChildren(threeObject, children) {
      threeObject.addChildren(children);
    }
  }, {
    key: 'addChild',
    value: function addChild(threeObject, child) {
      threeObject.addChildren([child]);
    }
  }, {
    key: 'moveChild',
    value: function moveChild() {
      // do nothing
    }
  }, {
    key: 'removeChild',
    value: function removeChild(threeObject, child) {
      threeObject.removeChild(child);
    }
  }, {
    key: '_updateOnRecreateCanvas',
    value: function _updateOnRecreateCanvas(threeObject, callback) {
      threeObject.updateOnRecreateCanvas(callback);
    }
  }, {
    key: '_updateHeight',
    value: function _updateHeight(threeObject, newHeight) {
      threeObject.updateHeight(newHeight);
    }
  }, {
    key: 'unmount',
    value: function unmount(threeObject) {
      // call super unmount first so react3instance can clean itself up
      _get(React3Descriptor.prototype.__proto__ || Object.getPrototypeOf(React3Descriptor.prototype), 'unmount', this).call(this, threeObject);

      threeObject.unmount();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount(threeObject) {
      threeObject.willUnmount();

      return _get(React3Descriptor.prototype.__proto__ || Object.getPrototypeOf(React3Descriptor.prototype), 'componentWillUnmount', this).call(this, threeObject);
    }
  }]);

  return React3Descriptor;
}(_THREEElementDescriptor2.default);

module.exports = React3Descriptor;