'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _ReactPropTypeLocationNames = require('react/lib/ReactPropTypeLocationNames');

var _ReactPropTypeLocationNames2 = _interopRequireDefault(_ReactPropTypeLocationNames);

var _THREEElementDescriptor = require('./THREEElementDescriptor');

var _THREEElementDescriptor2 = _interopRequireDefault(_THREEElementDescriptor);

var _Module = require('../Module');

var _Module2 = _interopRequireDefault(_Module);

var _PropTypeError = require('../utils/PropTypeError');

var _PropTypeError2 = _interopRequireDefault(_PropTypeError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Returns class name of the object, if any.
// Used for the subclass proptype checker
function getClassName(propValue) {
  if (!propValue.constructor || !propValue.constructor.name) {
    return '<<anonymous>>';
  }
  return propValue.constructor.name;
}

var ModuleDescriptor = function (_THREEElementDescript) {
  _inherits(ModuleDescriptor, _THREEElementDescript);

  function ModuleDescriptor(react3RendererInstance) {
    _classCallCheck(this, ModuleDescriptor);

    var _this = _possibleConstructorReturn(this, (ModuleDescriptor.__proto__ || Object.getPrototypeOf(ModuleDescriptor)).call(this, react3RendererInstance));

    var moduleSubclassValidator = function moduleSubclassValidator(props, propName, componentName, location, propFullName) {
      var locationName = _ReactPropTypeLocationNames2.default[location];

      if (!props[propName]) {
        return new _PropTypeError2.default('The ' + locationName + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
      }

      if (!(props[propName].prototype instanceof _Module2.default)) {
        var actualClassName = getClassName(props[propName]);

        return new _PropTypeError2.default('Invalid ' + locationName + ' `' + propFullName + '` ' + ('of type `' + actualClassName + '` supplied to `' + componentName + '`, ') + 'expected subclass of `Module`.');
      }

      // success returns undefined
      return undefined;
    };

    moduleSubclassValidator.toString = function () {
      return '```' + ' subclass of ReactThreeRenderer.Module ' + '```' + ' *' + '```' + ' required ' + '```' + '*';
    };

    _this.hasProp('descriptor', {
      type: moduleSubclassValidator,
      update: _this.triggerRemount,
      default: undefined
    });
    return _this;
  }

  _createClass(ModuleDescriptor, [{
    key: 'construct',
    value: function construct(props) {
      // going insane here but... let's... just do this.
      var ModuleClass = props.descriptor;
      return new ModuleClass();
    }
  }, {
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      _get(ModuleDescriptor.prototype.__proto__ || Object.getPrototypeOf(ModuleDescriptor.prototype), 'applyInitialProps', this).call(this, threeObject, props);

      threeObject.setup(this.react3RendererInstance);
    }
  }, {
    key: 'unmount',
    value: function unmount(threeObject) {
      threeObject.dispose();

      _get(ModuleDescriptor.prototype.__proto__ || Object.getPrototypeOf(ModuleDescriptor.prototype), 'unmount', this).call(this, threeObject);
    }
  }]);

  return ModuleDescriptor;
}(_THREEElementDescriptor2.default);

module.exports = ModuleDescriptor;