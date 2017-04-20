'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ResourceReference = require('../../Resources/ResourceReference');

var _ResourceReference2 = _interopRequireDefault(_ResourceReference);

var _Object3DDescriptor2 = require('./Object3DDescriptor');

var _Object3DDescriptor3 = _interopRequireDefault(_Object3DDescriptor2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MeshDescriptor = function (_Object3DDescriptor) {
  _inherits(MeshDescriptor, _Object3DDescriptor);

  function MeshDescriptor() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MeshDescriptor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MeshDescriptor.__proto__ || Object.getPrototypeOf(MeshDescriptor)).call.apply(_ref, [this].concat(args))), _this), _this._invalidChild = function (child) {
      var invalid = !(child instanceof THREE.Material || child instanceof _ResourceReference2.default || child instanceof THREE.Geometry || child instanceof THREE.BufferGeometry);

      return invalid;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MeshDescriptor, [{
    key: 'construct',
    value: function construct(props) {
      var geometry = props.hasOwnProperty('geometry') ? props.geometry : undefined;
      var material = props.hasOwnProperty('material') ? props.material : undefined;

      var mesh = new THREE.Mesh(geometry, material);

      if (!geometry) {
        mesh.geometry.dispose();
        mesh.geometry = undefined;
      }

      if (!material) {
        mesh.material.dispose();
        mesh.material = undefined;
      }

      return mesh;
    }
  }, {
    key: 'addChildren',
    value: function addChildren(threeObject, children) {
      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(children.filter(this._invalidChild).length === 0, 'Mesh children can only be materials or geometries!');
      } else {
        (0, _invariant2.default)(children.filter(this._invalidChild).length === 0, false);
      }
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
    key: 'getBoundingBoxes',
    value: function getBoundingBoxes(threeObject) {
      // recompute bounding box for highlighting from a fresh update
      if (threeObject.geometry && threeObject.geometry.computeBoundingBox) {
        threeObject.geometry.computeBoundingBox();
      }

      return _get(MeshDescriptor.prototype.__proto__ || Object.getPrototypeOf(MeshDescriptor.prototype), 'getBoundingBoxes', this).call(this, threeObject);
    }
  }]);

  return MeshDescriptor;
}(_Object3DDescriptor3.default);

module.exports = MeshDescriptor;