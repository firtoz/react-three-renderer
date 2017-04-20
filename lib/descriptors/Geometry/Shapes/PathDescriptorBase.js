'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

var _THREEElementDescriptor = require('../../THREEElementDescriptor');

var _THREEElementDescriptor2 = _interopRequireDefault(_THREEElementDescriptor);

var _ShapeAction = require('../../../Shapes/ShapeAction');

var _ShapeAction2 = _interopRequireDefault(_ShapeAction);

var _propTypeInstanceOf = require('../../../utils/propTypeInstanceOf');

var _propTypeInstanceOf2 = _interopRequireDefault(_propTypeInstanceOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PathDescriptorBase = function (_THREEElementDescript) {
  _inherits(PathDescriptorBase, _THREEElementDescript);

  function PathDescriptorBase(react3RendererInstance) {
    _classCallCheck(this, PathDescriptorBase);

    var _this = _possibleConstructorReturn(this, (PathDescriptorBase.__proto__ || Object.getPrototypeOf(PathDescriptorBase)).call(this, react3RendererInstance));

    _this._invalidChild = function (child) {
      var invalid = !(child instanceof _ShapeAction2.default);

      return invalid;
    };

    _this.hasProp('points', {
      type: _ReactPropTypes2.default.arrayOf((0, _propTypeInstanceOf2.default)(THREE.Vector2)),
      update: _this.triggerRemount,
      default: []
    });
    return _this;
  }

  _createClass(PathDescriptorBase, [{
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      threeObject.userData = _extends({}, threeObject.userData);

      // paths don't have uuids
      threeObject.uuid = THREE.Math.generateUUID();

      return _get(PathDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(PathDescriptorBase.prototype), 'applyInitialProps', this).call(this, threeObject, props);
    }
  }, {
    key: 'addChildren',
    value: function addChildren(threeObject, children) {
      var _this2 = this;

      // TODO: create paths here

      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(children.filter(this._invalidChild).length === 0, 'Shape children can only be shape actions!');
      } else {
        (0, _invariant2.default)(children.filter(this._invalidChild).length === 0, false);
      }

      // apply all actions in order
      children.forEach(function (child) {
        _this2.performChildAction(threeObject, child);
      });
    }
  }, {
    key: 'performChildAction',
    value: function performChildAction(threeObject, child) {
      child.performAction(threeObject);
    }
  }, {
    key: 'addChild',
    value: function addChild(threeObject) {
      this.triggerRemount(threeObject);
    }
  }, {
    key: 'moveChild',
    value: function moveChild(threeObject) {
      this.triggerRemount(threeObject);
    }
  }, {
    key: 'removeChild',
    value: function removeChild(threeObject) {
      this.triggerRemount(threeObject);
    }
  }, {
    key: 'highlight',
    value: function highlight(threeObject) {
      var parentObject = threeObject.userData.markup.parentMarkup.threeObject;

      parentObject.userData._descriptor.highlight(parentObject);
    }
  }, {
    key: 'getBoundingBoxes',
    value: function getBoundingBoxes(threeObject) {
      var parentObject = threeObject.userData.markup.parentMarkup.threeObject;

      return parentObject.userData._descriptor.getBoundingBoxes(parentObject);
    }
  }]);

  return PathDescriptorBase;
}(_THREEElementDescriptor2.default);

module.exports = PathDescriptorBase;