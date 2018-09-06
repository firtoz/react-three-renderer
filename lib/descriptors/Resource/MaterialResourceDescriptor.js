'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ResourceDescriptorBase = require('./ResourceDescriptorBase');

var _ResourceDescriptorBase2 = _interopRequireDefault(_ResourceDescriptorBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MaterialResourceDescriptor = function (_ResourceDescriptorBa) {
  _inherits(MaterialResourceDescriptor, _ResourceDescriptorBa);

  function MaterialResourceDescriptor() {
    _classCallCheck(this, MaterialResourceDescriptor);

    return _possibleConstructorReturn(this, (MaterialResourceDescriptor.__proto__ || Object.getPrototypeOf(MaterialResourceDescriptor)).apply(this, arguments));
  }

  _createClass(MaterialResourceDescriptor, [{
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      _get(MaterialResourceDescriptor.prototype.__proto__ || Object.getPrototypeOf(MaterialResourceDescriptor.prototype), 'applyInitialProps', this).call(this, threeObject, props);

      if (props.hasOwnProperty('slot')) {
        threeObject.userData._propertySlot = props.slot;
      } else {
        threeObject.userData._propertySlot = 'material';
      }
    }
  }, {
    key: 'setParent',
    value: function setParent(threeObject, parentObject3D) {
      (0, _invariant2.default)(parentObject3D instanceof THREE.Mesh || parentObject3D instanceof THREE.Points || parentObject3D instanceof THREE.Line, 'Parent is not a mesh');

      _get(MaterialResourceDescriptor.prototype.__proto__ || Object.getPrototypeOf(MaterialResourceDescriptor.prototype), 'setParent', this).call(this, threeObject, parentObject3D);
    }
  }]);

  return MaterialResourceDescriptor;
}(_ResourceDescriptorBase2.default);

module.exports = MaterialResourceDescriptor;