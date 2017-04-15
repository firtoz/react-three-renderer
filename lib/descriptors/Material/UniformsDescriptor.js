'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _THREEElementDescriptor = require('../THREEElementDescriptor');

var _THREEElementDescriptor2 = _interopRequireDefault(_THREEElementDescriptor);

var _UniformContainer = require('../../UniformContainer');

var _UniformContainer2 = _interopRequireDefault(_UniformContainer);

var _Uniform = require('../../Uniform');

var _Uniform2 = _interopRequireDefault(_Uniform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UniformsDescriptor = function (_THREEElementDescript) {
  _inherits(UniformsDescriptor, _THREEElementDescript);

  function UniformsDescriptor() {
    _classCallCheck(this, UniformsDescriptor);

    return _possibleConstructorReturn(this, (UniformsDescriptor.__proto__ || Object.getPrototypeOf(UniformsDescriptor)).apply(this, arguments));
  }

  _createClass(UniformsDescriptor, [{
    key: 'construct',
    value: function construct() {
      return new _UniformContainer2.default();
    }
  }, {
    key: 'setParent',
    value: function setParent(threeObject, parentObject3D) {
      (0, _invariant2.default)(parentObject3D instanceof THREE.ShaderMaterial, 'Parent of <uniforms/> is not a shader material');

      _get(UniformsDescriptor.prototype.__proto__ || Object.getPrototypeOf(UniformsDescriptor.prototype), 'setParent', this).call(this, threeObject, parentObject3D);

      parentObject3D.uniforms = threeObject.uniforms;
    }
  }, {
    key: 'addChildren',
    value: function addChildren(threeObject, children) {
      children.forEach(function (child) {
        (0, _invariant2.default)(child instanceof _Uniform2.default, 'The <uniforms/> component can only have <uniform/> elements as children.');
      });
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

  return UniformsDescriptor;
}(_THREEElementDescriptor2.default);

module.exports = UniformsDescriptor;