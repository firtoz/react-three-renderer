'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _warning = require('fbjs/lib/warning');

var _warning2 = _interopRequireDefault(_warning);

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

var _ResourceContainer = require('../../Resources/ResourceContainer');

var _ResourceContainer2 = _interopRequireDefault(_ResourceContainer);

var _THREEElementDescriptor = require('../THREEElementDescriptor');

var _THREEElementDescriptor2 = _interopRequireDefault(_THREEElementDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Resource decorator.
 * Allows descriptors to be slotted into the <resources/> component.
 *
 * @param descriptor The descriptor to be patched
 * @returns {ResourceDescriptor} the modified descriptor class
 */
function resource(descriptor) {
  var _class, _temp;

  var ResourceDescriptor = (_temp = _class = function (_descriptor) {
    _inherits(ResourceDescriptor, _descriptor);

    function ResourceDescriptor(react3RendererInstance) {
      _classCallCheck(this, ResourceDescriptor);

      var _this = _possibleConstructorReturn(this, (ResourceDescriptor.__proto__ || Object.getPrototypeOf(ResourceDescriptor)).call(this, react3RendererInstance));

      _this.isResource = true;


      _this.hasProp('resourceId', {
        type: _ReactPropTypes2.default.string,
        updateInitial: true,
        initialOnly: true,
        update: function update(threeObject, resourceId, hasProp) {
          if (hasProp) {
            threeObject.userData._resourceId = resourceId;

            if (!threeObject.userData._hasReferences) {
              threeObject.userData._hasReferences = true;
              threeObject.userData._references = [];
            }
          }
        },
        default: ''
      });
      return _this;
    }

    // used for docs


    _createClass(ResourceDescriptor, [{
      key: 'applyInitialProps',
      value: function applyInitialProps(threeObject, props) {
        _get(ResourceDescriptor.prototype.__proto__ || Object.getPrototypeOf(ResourceDescriptor.prototype), 'applyInitialProps', this).call(this, threeObject, props);
      }
    }, {
      key: 'setParent',
      value: function setParent(threeObject, parentObject3D) {
        if (parentObject3D instanceof _ResourceContainer2.default) {
          if (process.env.NODE_ENV !== 'production') {
            (0, _invariant2.default)(!!threeObject.userData._resourceId, 'All resources inside <resources> should have the "resourceId" property. ' + ('Current resource: <' + threeObject.userData.react3internalComponent._elementType + '>'));
          } else {
            (0, _invariant2.default)(!!threeObject.userData._resourceId);
          }

          // still let it be mounted to root
          _THREEElementDescriptor2.default.prototype.setParent.call(this, threeObject, parentObject3D);
        } else {
          if (process.env.NODE_ENV !== 'production') {
            (0, _warning2.default)(!threeObject.userData._resourceId, 'Found <' + threeObject.userData.react3internalComponent._elementType + '> ' + 'with a resourceId property, ' + 'but it was not placed within a <resources/> element.');
          }
          _get(ResourceDescriptor.prototype.__proto__ || Object.getPrototypeOf(ResourceDescriptor.prototype), 'setParent', this).call(this, threeObject, parentObject3D);
        }
      }
    }, {
      key: 'highlight',
      value: function highlight(threeObject) {
        var result = void 0;

        if (threeObject.userData._resourceId) {
          // it's a resource. Let's highlight all references.
          threeObject.userData.events.emit('highlight', {
            uuid: threeObject.uuid,
            boundingBoxFunc: function boundingBoxFunc() {
              return threeObject.userData._references.reduce(function (boxes, objectWithReference) {
                var boxesForReference = objectWithReference.userData._descriptor.getBoundingBoxes(objectWithReference);
                if (process.env.NODE_ENV !== 'production') {
                  (0, _invariant2.default)(boxesForReference.length > 0, 'No boxes found for resource.');
                } else {
                  (0, _invariant2.default)(boxesForReference.length > 0);
                }
                return boxes.concat(boxesForReference);
              }, []);
            }
          });
        } else {
          result = _get(ResourceDescriptor.prototype.__proto__ || Object.getPrototypeOf(ResourceDescriptor.prototype), 'highlight', this).call(this, threeObject);
        }

        return result;
      }
    }, {
      key: 'hideHighlight',
      value: function hideHighlight(threeObject) {
        var result = void 0;

        if (threeObject.userData._resourceId) {
          threeObject.userData.events.emit('hideHighlight');
        } else {
          result = _get(ResourceDescriptor.prototype.__proto__ || Object.getPrototypeOf(ResourceDescriptor.prototype), 'hideHighlight', this).call(this, threeObject);
        }

        return result;
      }
    }]);

    return ResourceDescriptor;
  }(descriptor), _class.displayName = '' + (descriptor.displayName || descriptor.name), _temp);


  return ResourceDescriptor;
}

module.exports = resource;