'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

var _MaterialDescriptorBase = require('./MaterialDescriptorBase');

var _MaterialDescriptorBase2 = _interopRequireDefault(_MaterialDescriptorBase);

var _UniformContainer = require('../../UniformContainer');

var _UniformContainer2 = _interopRequireDefault(_UniformContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShaderMaterialDescriptor = function (_MaterialDescriptorBa) {
  _inherits(ShaderMaterialDescriptor, _MaterialDescriptorBa);

  function ShaderMaterialDescriptor(react3RendererInstance) {
    _classCallCheck(this, ShaderMaterialDescriptor);

    var _this = _possibleConstructorReturn(this, (ShaderMaterialDescriptor.__proto__ || Object.getPrototypeOf(ShaderMaterialDescriptor)).call(this, react3RendererInstance));

    ['vertexShader', 'fragmentShader'].forEach(function (propName) {
      _this.hasProp(propName, {
        type: _ReactPropTypes2.default.string,
        update: _this.triggerRemount
      });
    });

    _this.hasProp('uniforms', {
      type: _ReactPropTypes2.default.any,
      simple: true,
      default: undefined
    });

    _this.hasWireframe();
    return _this;
  }

  _createClass(ShaderMaterialDescriptor, [{
    key: 'getMaterialDescription',
    value: function getMaterialDescription(props) {
      var materialDescription = _get(ShaderMaterialDescriptor.prototype.__proto__ || Object.getPrototypeOf(ShaderMaterialDescriptor.prototype), 'getMaterialDescription', this).call(this, props);

      if (props.hasOwnProperty('uniforms')) {
        materialDescription.uniforms = props.uniforms;
      }

      if (props.hasOwnProperty('vertexShader')) {
        materialDescription.vertexShader = props.vertexShader;
      }

      if (props.hasOwnProperty('fragmentShader')) {
        materialDescription.fragmentShader = props.fragmentShader;
      }

      return materialDescription;
    }
  }, {
    key: 'construct',
    value: function construct(props) {
      var materialDescription = this.getMaterialDescription(props);

      return new THREE.ShaderMaterial(materialDescription);
    }
  }, {
    key: 'invalidChildInternal',
    value: function invalidChildInternal(child) {
      return !(child instanceof _UniformContainer2.default || _get(ShaderMaterialDescriptor.prototype.__proto__ || Object.getPrototypeOf(ShaderMaterialDescriptor.prototype), 'invalidChildInternal', this).call(this, child));
    }
  }, {
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      _get(ShaderMaterialDescriptor.prototype.__proto__ || Object.getPrototypeOf(ShaderMaterialDescriptor.prototype), 'applyInitialProps', this).call(this, threeObject, props);

      if (!props.hasOwnProperty('uniforms')) {
        threeObject.uniforms = {};
      }
    }
  }]);

  return ShaderMaterialDescriptor;
}(_MaterialDescriptorBase2.default);

module.exports = ShaderMaterialDescriptor;