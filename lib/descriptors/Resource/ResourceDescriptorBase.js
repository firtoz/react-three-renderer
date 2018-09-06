'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _THREEElementDescriptor = require('../THREEElementDescriptor');

var _THREEElementDescriptor2 = _interopRequireDefault(_THREEElementDescriptor);

var _ResourceReference = require('../../Resources/ResourceReference');

var _ResourceReference2 = _interopRequireDefault(_ResourceReference);

var _React3Renderer = require('../../React3Renderer');

var _React3Renderer2 = _interopRequireDefault(_React3Renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResourceDescriptorBase = function (_THREEElementDescript) {
  _inherits(ResourceDescriptorBase, _THREEElementDescript);

  function ResourceDescriptorBase(react3RendererInstance) {
    _classCallCheck(this, ResourceDescriptorBase);

    var _this = _possibleConstructorReturn(this, (ResourceDescriptorBase.__proto__ || Object.getPrototypeOf(ResourceDescriptorBase)).call(this, react3RendererInstance));

    _this._addedIntoRoot = function (threeObject) {
      var currentParentMarkup = threeObject.userData.markup.parentMarkup;

      var distance = 0;

      while (currentParentMarkup) {
        var parentResources = currentParentMarkup.threeObject.userData._resources;

        if (parentResources) {
          var resourceId = threeObject.resourceId;
          var resourceInParent = parentResources.resourceMap[resourceId];

          if (resourceInParent) {
            _this._addResource(threeObject, {
              id: resourceId,
              distance: distance,
              resource: resourceInParent
            });
          }
        }

        distance++;
        currentParentMarkup = currentParentMarkup.threeObject.userData.markup.parentMarkup;
      }

      _this._updateResource(threeObject);
    };

    _this.hasProp('resourceId', {
      type: _propTypes2.default.string.isRequired,
      update: _this.triggerRemount,
      default: ''
    });
    return _this;
  }

  _createClass(ResourceDescriptorBase, [{
    key: 'construct',
    value: function construct(props) {
      (0, _invariant2.default)(props.hasOwnProperty('resourceId'), 'A resource type must have a property named "resourceId"!');

      return new _ResourceReference2.default(props.resourceId);
    }
  }, {
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      _get(ResourceDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(ResourceDescriptorBase.prototype), 'applyInitialProps', this).call(this, threeObject, props);

      threeObject.userData.resourceMap = [];
      threeObject.userData._eventCleanupQueue = [];
      threeObject.userData._chosenResource = undefined;
      threeObject.userData._debug = props.debug || false;

      threeObject.userData.events.once('addedIntoRoot', this._addedIntoRoot);
    }
  }, {
    key: 'unmount',
    value: function unmount(threeObject) {
      threeObject.userData._eventCleanupQueue.forEach(function (cleanup) {
        cleanup();
      });

      delete threeObject.userData._eventCleanupQueue;
      delete threeObject.userData.resourceMap;

      this.updateChosenResource(threeObject, null);

      _get(ResourceDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(ResourceDescriptorBase.prototype), 'unmount', this).call(this, threeObject);
    }
  }, {
    key: 'updateChosenResource',
    value: function updateChosenResource(threeObject, chosenResource) {
      var oldResource = threeObject.userData._chosenResource;
      if (oldResource !== chosenResource) {
        threeObject.userData._chosenResource = chosenResource;

        this.resourceUpdated(threeObject, chosenResource, oldResource);
      }
    }
  }, {
    key: 'setParent',
    value: function setParent(threeObject, parentObject3D) {
      var existingValueInSlot = parentObject3D[threeObject.userData._propertySlot];
      (0, _invariant2.default)(existingValueInSlot === undefined || existingValueInSlot === null, 'Parent already has a ' + threeObject.userData._propertySlot + ' defined');
      (0, _invariant2.default)(threeObject.userData._eventCleanupQueue.length === 0, 'Changing parents?');

      _get(ResourceDescriptorBase.prototype.__proto__ || Object.getPrototypeOf(ResourceDescriptorBase.prototype), 'setParent', this).call(this, threeObject, parentObject3D);

      var currentParentMarkup = parentObject3D.userData.markup;

      var onResourceAdded = this._onResourceAdded.bind(this, threeObject);
      var onResourceRemoved = this._onResourceRemoved.bind(this, threeObject);

      var parentEvents = currentParentMarkup.threeObject.userData.events;
      parentEvents.on('resource.added', onResourceAdded);
      parentEvents.on('resource.removed', onResourceRemoved);

      threeObject.userData._eventCleanupQueue.push(function () {
        parentEvents.removeListener('resource.added', onResourceAdded);
        parentEvents.removeListener('resource.removed', onResourceRemoved);
      });
    }
  }, {
    key: '_onResourceAdded',
    value: function _onResourceAdded(threeObject, resourceInfo) {
      if (threeObject.resourceId !== resourceInfo.id) {
        return;
      }

      this._addResource(threeObject, resourceInfo);

      this._updateResource(threeObject);
    }
  }, {
    key: '_addResource',
    value: function _addResource(threeObject, resourceInfo) {
      var resourceMap = threeObject.userData.resourceMap;

      var i = void 0;

      for (i = 0; i < resourceMap.length; ++i) {
        if (resourceMap[i].distance === resourceInfo.distance) {
          if (resourceMap[i].resource !== resourceInfo.resource) {
            resourceMap[i].resource = resourceInfo.resource;
          }

          return;
        }

        if (resourceMap[i].distance > resourceInfo.distance) {
          break;
        }
      }

      resourceMap.splice(i, 0, {
        distance: resourceInfo.distance,
        resource: resourceInfo.resource
      });
    }
  }, {
    key: '_onResourceRemoved',
    value: function _onResourceRemoved(threeObject, resourceInfo) {
      if (threeObject.resourceId !== resourceInfo.id) {
        return;
      }

      var resourceMap = threeObject.userData.resourceMap;

      for (var i = 0; i < resourceMap.length; ++i) {
        if (resourceMap[i].distance === resourceInfo.distance) {
          if (resourceMap[i].resource === resourceInfo.resource) {
            resourceMap.splice(i, 1);

            this._updateResource(threeObject);
          }
          return;
        }
      }

      (0, _invariant2.default)(false, 'This resource was not in this map?');
    }
  }, {
    key: 'applyToSlot',
    value: function applyToSlot(threeObject, parentObject, newResource) {
      var propertySlot = threeObject.userData._propertySlot;
      parentObject[propertySlot] = newResource;
    }
  }, {
    key: 'resourceUpdated',
    value: function resourceUpdated(threeObject, newResource, oldResource) {
      var parentObject = threeObject.userData.markup.parentMarkup && threeObject.userData.markup.parentMarkup.threeObject || undefined;

      if (parentObject) {
        this.applyToSlot(threeObject, parentObject, newResource);

        if (newResource === null) {
          // invariant(false, 'Could not find resource named ' + threeObject.resourceId);
        } else {
          newResource.userData._references.push(parentObject);
        }

        if (oldResource) {
          var removalIndex = oldResource.userData._references.indexOf(parentObject);

          (0, _invariant2.default)(removalIndex !== -1, 'Bad reference count for resource');

          oldResource.userData._references.splice(removalIndex, 1);
        }
      }
    }
  }, {
    key: '_updateResource',
    value: function _updateResource(threeObject) {
      var resourceMap = threeObject.userData.resourceMap;

      var chosenResource = null;

      if (resourceMap.length > 0) {
        chosenResource = resourceMap[0].resource;
      }

      this.updateChosenResource(threeObject, chosenResource);
    }
  }, {
    key: 'highlight',
    value: function highlight(threeObject) {
      var ownerObject = threeObject.userData.markup.parentMarkup.threeObject;
      ownerObject.userData._descriptor.highlight(ownerObject);
    }
  }, {
    key: 'hideHighlight',
    value: function hideHighlight(threeObject) {
      var ownerObject = threeObject.userData.markup.parentMarkup.threeObject;
      ownerObject.userData._descriptor.hideHighlight(ownerObject);
    }
  }]);

  return ResourceDescriptorBase;
}(_THREEElementDescriptor2.default);

module.exports = ResourceDescriptorBase;