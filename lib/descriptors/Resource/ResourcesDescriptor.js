'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _THREEElementDescriptor = require('../THREEElementDescriptor');

var _THREEElementDescriptor2 = _interopRequireDefault(_THREEElementDescriptor);

var _ResourceContainer = require('../../Resources/ResourceContainer');

var _ResourceContainer2 = _interopRequireDefault(_ResourceContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResourcesDescriptor = function (_THREEElementDescript) {
  _inherits(ResourcesDescriptor, _THREEElementDescript);

  function ResourcesDescriptor() {
    _classCallCheck(this, ResourcesDescriptor);

    return _possibleConstructorReturn(this, (ResourcesDescriptor.__proto__ || Object.getPrototypeOf(ResourcesDescriptor)).apply(this, arguments));
  }

  _createClass(ResourcesDescriptor, [{
    key: 'construct',
    value: function construct() {
      return new _ResourceContainer2.default();
    }
  }, {
    key: 'unmount',
    value: function unmount(threeObject) {
      var parentMarkup = threeObject.userData.markup.parentMarkup;
      var parentEvents = parentMarkup.threeObject.userData.events;

      threeObject.resourceIds.forEach(function (id) {
        parentEvents.emit('resource.removed', {
          id: id,
          distance: 0,
          resource: threeObject.resourceMap[id]
        });
      });

      _get(ResourcesDescriptor.prototype.__proto__ || Object.getPrototypeOf(ResourcesDescriptor.prototype), 'unmount', this).call(this, threeObject);
    }
  }, {
    key: 'addChildren',
    value: function addChildren(threeObject, children) {
      children.forEach(function (child) {
        var resourceId = child.userData._resourceId;

        if (process.env.NODE_ENV !== 'production') {
          (0, _invariant2.default)(!!resourceId, 'Resource container can only hold resources. ' + 'Found children without `resourceId` properties:' + (' ' + children.filter(function (currentChild) {
            return !currentChild.userData._resourceId;
          }).map(function (currentChild) {
            return '<' + currentChild.userData.react3internalComponent._elementType + '/>';
          }).join(', ') + '.'));
        } else {
          (0, _invariant2.default)(!!resourceId);
        }

        threeObject.resourceIds.push(resourceId);

        threeObject.resourceMap[resourceId] = child;

        var parentMarkup = threeObject.userData.markup.parentMarkup;
        if (parentMarkup) {
          parentMarkup.threeObject.userData.events.emit('resource.added', {
            id: resourceId,
            distance: 0,
            resource: child
          });
        }
      });
    }
  }, {
    key: 'addChild',
    value: function addChild(threeObject, child) {
      this.addChildren(threeObject, [child]);
    }
  }, {
    key: 'removeChild',
    value: function removeChild(threeObject, child) {
      var resourceId = child.userData._resourceId;

      delete threeObject.resourceIds[resourceId];

      var parentMarkup = threeObject.userData.markup.parentMarkup;
      if (parentMarkup) {
        parentMarkup.threeObject.userData.events.emit('resource.removed', {
          id: resourceId,
          distance: 0,
          resource: child
        });
      }
    }
  }, {
    key: 'setParent',
    value: function setParent(threeObject, parentObject) {
      _get(ResourcesDescriptor.prototype.__proto__ || Object.getPrototypeOf(ResourcesDescriptor.prototype), 'setParent', this).call(this, threeObject, parentObject);

      var parentEvents = parentObject.userData.events;

      parentObject.userData._resources = threeObject;

      threeObject.resourceIds.forEach(function (id) {
        parentEvents.emit('resource.added', {
          id: id,
          distance: 0,
          resource: threeObject.resourceMap[id]
        });
      });
    }
  }, {
    key: 'highlight',
    value: function highlight(threeObject) {
      var ownerObject = threeObject.userData.markup.parentMarkup.threeObject;

      if (!(ownerObject.updateMatrixWorld && ownerObject.traverse)) {
        return;
      }

      threeObject.userData.events.emit('highlight', {
        uuid: threeObject.uuid,
        boundingBoxFunc: function boundingBoxFunc() {
          var boundingBox = new THREE.Box3();

          boundingBox.setFromObject(ownerObject);

          return [boundingBox];
        }
      });
    }
  }, {
    key: 'hideHighlight',
    value: function hideHighlight(threeObject) {
      threeObject.userData.events.emit('hideHighlight');
    }
  }, {
    key: 'moveChild',
    value: function moveChild() {
      // child order doesn't matter
    }
  }]);

  return ResourcesDescriptor;
}(_THREEElementDescriptor2.default);

module.exports = ResourcesDescriptor;