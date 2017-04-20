'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

var _Uniform = require('../../Uniform');

var _Uniform2 = _interopRequireDefault(_Uniform);

var _UniformContainer = require('../../UniformContainer');

var _UniformContainer2 = _interopRequireDefault(_UniformContainer);

var _ResourceReference = require('../../Resources/ResourceReference');

var _ResourceReference2 = _interopRequireDefault(_ResourceReference);

var _THREEElementDescriptor = require('../THREEElementDescriptor');

var _THREEElementDescriptor2 = _interopRequireDefault(_THREEElementDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UniformDescriptor = function (_THREEElementDescript) {
  _inherits(UniformDescriptor, _THREEElementDescript);

  function UniformDescriptor(react3Instance) {
    _classCallCheck(this, UniformDescriptor);

    var _this = _possibleConstructorReturn(this, (UniformDescriptor.__proto__ || Object.getPrototypeOf(UniformDescriptor)).call(this, react3Instance));

    _this._invalidChild = function (child) {
      return _this.invalidChildInternal(child);
    };

    _this.hasProp('type', {
      type: _ReactPropTypes2.default.string.isRequired,
      simple: true
    });

    _this.hasProp('value', {
      type: _ReactPropTypes2.default.any,
      update: function update(threeObject, value) {
        threeObject.setValue(value);
      },

      default: null
    });

    _this.hasProp('name', {
      type: _ReactPropTypes2.default.string.isRequired,
      update: _this.triggerRemount
    });
    return _this;
  }

  _createClass(UniformDescriptor, [{
    key: 'construct',
    value: function construct() {
      return new _Uniform2.default();
    }
  }, {
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      _get(UniformDescriptor.prototype.__proto__ || Object.getPrototypeOf(UniformDescriptor.prototype), 'applyInitialProps', this).call(this, threeObject, props);

      (0, _invariant2.default)(props.hasOwnProperty('name'), 'The <uniform/> should have a \'name\' property');
      threeObject.name = props.name;
      threeObject.value = props.value;
    }
  }, {
    key: 'setParent',
    value: function setParent(threeObject, parentObject3D) {
      (0, _invariant2.default)(parentObject3D instanceof _UniformContainer2.default, 'Parent is not a Uniform Container (<uniforms/>)');

      var name = threeObject.name;

      _get(UniformDescriptor.prototype.__proto__ || Object.getPrototypeOf(UniformDescriptor.prototype), 'setParent', this).call(this, threeObject, parentObject3D);

      parentObject3D.uniforms[name] = {
        type: threeObject.type,
        value: threeObject.value
      };

      threeObject.userData._onValueChanged = function (newValue) {
        parentObject3D.uniforms[name].value = newValue;
      };

      threeObject.userData.events.on('valueChanged', threeObject.userData._onValueChanged);
    }
  }, {
    key: 'addChildren',
    value: function addChildren(threeObject, children) {
      (0, _invariant2.default)(children.filter(this._invalidChild).length === 0, 'Uniform children can only be textures or resource references');
    }
  }, {
    key: 'addChild',
    value: function addChild(threeObject, child) {
      this.addChildren(threeObject, [child]);
    }
  }, {
    key: 'removeChild',
    value: function removeChild() {
      // do nothing
    }
  }, {
    key: 'invalidChildInternal',
    value: function invalidChildInternal(child) {
      var invalid = !(child instanceof THREE.Texture || child instanceof _ResourceReference2.default);

      return invalid;
    }
  }, {
    key: 'unmount',
    value: function unmount(threeObject) {
      threeObject.userData.events.removeListener('valueChanged', threeObject.userData._onValueChanged);

      delete threeObject.userData._onValueChanged;

      _get(UniformDescriptor.prototype.__proto__ || Object.getPrototypeOf(UniformDescriptor.prototype), 'unmount', this).call(this, threeObject);
    }
  }, {
    key: 'highlight',
    value: function highlight(threeObject) {
      var parent = threeObject.userData.markup.parentMarkup.threeObject;
      parent.userData._descriptor.highlight(parent);
    }
  }, {
    key: 'getBoundingBoxes',
    value: function getBoundingBoxes(threeObject) {
      var parent = threeObject.userData.markup.parentMarkup.threeObject;
      return parent.userData._descriptor.getBoundingBoxes(parent);
    }
  }, {
    key: 'hideHighlight',
    value: function hideHighlight(threeObject) {
      var parent = threeObject.userData.markup.parentMarkup.threeObject;
      parent.userData._descriptor.hideHighlight(parent);
    }
  }]);

  return UniformDescriptor;
}(_THREEElementDescriptor2.default);

module.exports = UniformDescriptor;