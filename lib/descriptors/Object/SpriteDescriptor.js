'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Object3DDescriptor2 = require('./Object3DDescriptor');

var _Object3DDescriptor3 = _interopRequireDefault(_Object3DDescriptor2);

var _ResourceReference = require('../../Resources/ResourceReference');

var _ResourceReference2 = _interopRequireDefault(_ResourceReference);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpriteDescriptor = function (_Object3DDescriptor) {
  _inherits(SpriteDescriptor, _Object3DDescriptor);

  function SpriteDescriptor() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SpriteDescriptor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SpriteDescriptor.__proto__ || Object.getPrototypeOf(SpriteDescriptor)).call.apply(_ref, [this].concat(args))), _this), _this._invalidChild = function (child) {
      var invalid = !(child instanceof THREE.SpriteMaterial || child instanceof _ResourceReference2.default);

      return invalid;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SpriteDescriptor, [{
    key: 'construct',
    value: function construct(props) {
      var material = props.hasOwnProperty('material') ? props.material : undefined;
      var sprite = new THREE.Sprite(material);

      if (!material) {
        sprite.material.dispose();
        sprite.material = undefined;
      }

      return sprite;
    }
  }, {
    key: 'addChildren',
    value: function addChildren(threeObject, children) {
      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(children.filter(this._invalidChild).length === 0, 'Sprite children can only be materials!');
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
  }]);

  return SpriteDescriptor;
}(_Object3DDescriptor3.default);

module.exports = SpriteDescriptor;