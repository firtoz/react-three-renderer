'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _warning = require('fbjs/lib/warning');

var _warning2 = _interopRequireDefault(_warning);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

var _checkReactTypeSpec = require('react/lib/checkReactTypeSpec');

var _checkReactTypeSpec2 = _interopRequireDefault(_checkReactTypeSpec);

var _React3Instance = require('../React3Instance');

var _React3Instance2 = _interopRequireDefault(_React3Instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = _events2.default.EventEmitter;

/**
 * @abstract
 */

var THREEElementDescriptor = function () {
  function THREEElementDescriptor(react3RendererInstance) {
    _classCallCheck(this, THREEElementDescriptor);

    this.react3RendererInstance = react3RendererInstance;
    this.propUpdates = {};
    this.propDeletes = {};
    this.propDefaults = {};
    this._initialOnly = {};
    this._updateInitial = [];
    this._simpleProperties = [];

    this.propTypes = {};

    this._hasName = false;
  }

  _createClass(THREEElementDescriptor, [{
    key: 'hasEvent',
    value: function hasEvent(name) {
      this._hasEvents = true;

      this.hasProp(name, {
        type: _ReactPropTypes2.default.func,
        updateInitial: true,
        update: function update(threeObject, callback) {
          threeObject.userData._eventCallbacks[name] = callback;
        },

        default: null
      });
    }
  }, {
    key: 'removeProp',
    value: function removeProp(name) {
      (0, _invariant2.default)(this.propTypes.hasOwnProperty(name), 'The property %s has not been defined', name);

      var simpleIndex = this._simpleProperties.indexOf(name);
      if (simpleIndex !== -1) {
        this._simpleProperties.splice(simpleIndex, 1);
      }

      delete this.propTypes[name];
      delete this.propDeletes[name];
      delete this.propUpdates[name];
      delete this.propDefaults[name];

      var updateInitialIndex = this._updateInitial.indexOf(name);
      if (updateInitialIndex !== -1) {
        this._updateInitial.splice(updateInitialIndex, 1);
      }

      delete this._initialOnly[name];
    }
  }, {
    key: 'hasProp',
    value: function hasProp(name, info) {
      var _this = this;

      (0, _invariant2.default)(info.hasOwnProperty('type'), 'The information should include a `type` property');
      (0, _invariant2.default)(!this.propTypes.hasOwnProperty(name) || info.override, 'The property %s has already been defined', name);

      if (info.override) {
        // clean up simple prop
        var simpleIndex = this._simpleProperties.indexOf(name);
        if (simpleIndex !== -1) {
          this._simpleProperties.splice(simpleIndex, 1);
        }
      }

      this.propTypes[name] = info.type;

      if (info.hasOwnProperty('simple')) {
        this.registerSimpleProperties([name]);

        if (info.hasOwnProperty('default')) {
          this.propDeletes[name] = function (threeObject) {
            _this.propUpdates[name](threeObject, info.default, true);
          };

          this.propDefaults[name] = info.default;
        }
      } else {
        if (info.hasOwnProperty('update')) {
          this.propUpdates[name] = info.update;
        }

        if (info.hasOwnProperty('default')) {
          (0, _invariant2.default)(info.hasOwnProperty('update'), 'The information should include a `update` property ' + 'if it has a `default` property');

          this.propDeletes[name] = function (threeObject) {
            info.update(threeObject, info.default, true);
          };

          this.propDefaults[name] = info.default;
        } else {
          (0, _invariant2.default)(info.update === this.triggerRemount, 'The type information for ' + this.constructor.name + '.' + name + ' ' + 'should include a `default` property if it\'s not going to trigger remount');
        }

        if (info.hasOwnProperty('remove')) {
          (0, _invariant2.default)(false, 'Bad \'remove\' info for ' + this.constructor.name + '.' + name);
        }

        if (info.hasOwnProperty('updateInitial')) {
          (0, _invariant2.default)(info.hasOwnProperty('update'), 'The information should include a ' + '`update` property if it has a`updateInitial` property');

          if (process.env.NODE_ENV !== 'production') {
            (0, _invariant2.default)(info.hasOwnProperty('default') || this.propUpdates[name].length === 3 || this.propUpdates[name] === this.triggerRemount, 'Prop info for ' + this.constructor.name + '.' + name + ' has \'updateInitial\', ' + 'but no \'default\', and ' + ('the update function accepts ' + this.propUpdates[name].length) + ' parameters instead of 3.');
          }

          if (this._updateInitial.indexOf(name) === -1) {
            this._updateInitial.push(name);
          }
        }

        if (info.initialOnly) {
          (0, _invariant2.default)(info.hasOwnProperty('updateInitial'), 'The information should include a ' + '`updateInitial` property if it has an `initialOnly` property');
        }

        this._initialOnly[name] = info.initialOnly;
      }
    }
  }, {
    key: 'hasName',
    value: function hasName() {
      var _this2 = this;

      this._hasName = true;

      this.hasProp('name', {
        type: _ReactPropTypes2.default.string,
        update: function update(threeObject, name) {
          _this2._updateName(threeObject, name);
        },
        default: ''
      });
    }
  }, {
    key: '_updateName',
    value: function _updateName(threeObject, nextName) {
      var oldName = threeObject.name;

      threeObject.name = nextName;

      threeObject.userData.events.emit('rename', {
        oldName: oldName,
        nextName: nextName
      });

      var markup = threeObject.userData.markup;

      if (markup._rootInstance) {
        markup._rootInstance.objectRenamed(threeObject, oldName, nextName);
      }
    }
  }, {
    key: 'placeRemountTrigger',
    value: function placeRemountTrigger(threeObject, triggerRemount) {
      threeObject.userData._triggerRemount = triggerRemount;
    }
  }, {
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      var _this3 = this;

      // do nothing for now

      var eventsForObject = new EventEmitter();

      if (this._hasName && props.name) {
        threeObject.name = props.name;
      }

      if (this._hasEvents) {
        threeObject.userData._eventCallbacks = {};
      }

      // pass down resources

      eventsForObject.on('resource.added', function (data) {
        var childrenMarkup = threeObject.userData.markup.childrenMarkup;

        var increasedDistance = _extends({}, data, {
          distance: data.distance + 1
        });

        childrenMarkup.forEach(function (childMarkup) {
          return childMarkup.threeObject.userData.events.emit('resource.added', increasedDistance);
        });
      });

      eventsForObject.on('resource.removed', function (data) {
        var childrenMarkup = threeObject.userData.markup.childrenMarkup;

        var increasedDistance = _extends({}, data, {
          distance: data.distance + 1
        });

        childrenMarkup.forEach(function (childMarkup) {
          return childMarkup.threeObject.userData.events.emit('resource.removed', increasedDistance);
        });
      });

      threeObject.userData.events = eventsForObject;
      threeObject.userData._descriptor = this;

      this._updateInitial.forEach(function (propertyName) {
        if (props.hasOwnProperty(propertyName)) {
          _this3.propUpdates[propertyName](threeObject, props[propertyName], true);
        } else {
          var originalValue = void 0;

          if (_this3.propDefaults.hasOwnProperty(propertyName)) {
            originalValue = _this3.propDefaults[propertyName];
          }

          _this3.propUpdates[propertyName](threeObject, originalValue, false);
        }
      });

      this._simpleProperties.forEach(function (propertyName) {
        if (props.hasOwnProperty(propertyName)) {
          threeObject[propertyName] = props[propertyName];
        }
      });
    }
  }, {
    key: 'construct',
    value: function construct(props) {
      // eslint-disable-line no-unused-vars
      (0, _invariant2.default)(false, 'Missing constructor!');
    }

    // noinspection JSUnusedLocalSymbols

  }, {
    key: 'addChildren',
    value: function addChildren(threeObject, children) {
      // eslint-disable-line no-unused-vars
      (0, _invariant2.default)(false, 'Cannot add children to ' + this.constructor.name + '!');
    }

    // noinspection JSUnusedLocalSymbols

  }, {
    key: 'addChild',
    value: function addChild(threeObject, child, mountIndex) {
      // eslint-disable-line no-unused-vars
      (0, _invariant2.default)(false, 'Cannot add child to ' + this.constructor.name + '!');
    }
  }, {
    key: 'moveChild',
    value: function moveChild() {
      (0, _invariant2.default)(false, 'Cannot move children in ' + this.constructor.name + '!');
    }
  }, {
    key: 'removeChild',
    value: function removeChild(threeObject, child) {
      // eslint-disable-line no-unused-vars
      (0, _invariant2.default)(false, 'Cannot remove children in ' + this.constructor.name + '!');
    }
  }, {
    key: 'setParent',
    value: function setParent(threeObject, parentObject3D) {
      var parentMarkup = parentObject3D.userData.markup;

      if (parentMarkup && parentMarkup._rootInstance) {
        parentMarkup._rootInstance.objectMounted(threeObject);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount(threeObject) {// eslint-disable-line no-unused-vars

    }
  }, {
    key: 'unmount',
    value: function unmount(threeObject) {
      var markup = threeObject.userData.markup;

      if (markup._rootInstance) {
        markup._rootInstance.objectRemoved(threeObject);
      }

      if (this._hasEvents) {
        delete threeObject.userData._eventCallbacks;
      }

      threeObject.userData.events.emit('dispose', {
        object: threeObject
      });

      threeObject.userData.events.removeAllListeners();
    }
  }, {
    key: 'removedFromParent',
    value: function removedFromParent(threeObject) {
      delete threeObject.userData.events;
    }

    // noinspection JSUnusedLocalSymbols

  }, {
    key: 'deleteProperty',
    value: function deleteProperty(threeObject, propKey) {
      // eslint-disable-line no-unused-vars
      if (this.propDeletes[propKey]) {
        this.propDeletes[propKey](threeObject);
      } else if (process.env.NODE_ENV !== 'production') {
        (0, _warning2.default)(false, 'Cannot delete property %s from ' + this.constructor.name, propKey);
      }
    }
  }, {
    key: 'updateProperty',
    value: function updateProperty(threeObject, propKey, nextProp) {
      if (!this._initialOnly[propKey]) {
        if (this.propUpdates[propKey]) {
          this.propUpdates[propKey](threeObject, nextProp, true);
        } else {
          (0, _warning2.default)(false, 'updating prop ' + propKey + ' ( ' + nextProp + ' ) for ' + this.constructor.name);
          this.triggerRemount(threeObject);
        }
      } else {
        this.triggerRemount(threeObject);
      }
    }
  }, {
    key: 'highlight',
    value: function highlight(threeObject) {// eslint-disable-line no-unused-vars
      // no highlighting by default!
    }
  }, {
    key: 'hideHighlight',
    value: function hideHighlight(threeObject) {} // eslint-disable-line no-unused-vars
    // no highlighting by default!


    /**
     * @protected
     * @param names
     */

  }, {
    key: 'useSimpleUpdates',
    value: function useSimpleUpdates(names) {
      for (var index = 0; index < names.length; ++index) {
        var propName = names[index];
        this.propUpdates[propName] = this._updateSimple.bind(this, propName);
      }
    }
  }, {
    key: '_updateSimple',
    value: function _updateSimple(propName, threeObject, propValue) {
      threeObject[propName] = propValue;
    }
  }, {
    key: 'registerSimpleProperties',
    value: function registerSimpleProperties(propertyNames) {
      var _this4 = this;

      propertyNames.forEach(function (propName) {
        if (_this4._simpleProperties.indexOf(propName) === -1) {
          _this4._simpleProperties.push(propName);
        }
      });

      this.useSimpleUpdates(propertyNames);
    }
  }, {
    key: 'getBoundingBoxes',
    value: function getBoundingBoxes(threeObject) {
      // eslint-disable-line no-unused-vars
      return [];
    }
  }, {
    key: 'triggerRemount',
    value: function triggerRemount(threeObject) {
      if (threeObject.userData._triggerRemount) {
        threeObject.userData._triggerRemount();

        delete threeObject.userData._triggerRemount;
      }
    }
  }, {
    key: 'beginPropertyUpdates',
    value: function beginPropertyUpdates(threeObject) {// eslint-disable-line no-unused-vars
    }
  }, {
    key: 'completePropertyUpdates',
    value: function completePropertyUpdates(threeObject) {// eslint-disable-line no-unused-vars
    }
  }, {
    key: 'beginChildUpdates',
    value: function beginChildUpdates(threeObject) {// eslint-disable-line no-unused-vars
    }
  }, {
    key: 'completeChildUpdates',
    value: function completeChildUpdates(threeObject) {// eslint-disable-line no-unused-vars
    }
  }]);

  return THREEElementDescriptor;
}();

if (process.env.NODE_ENV !== 'production') {
  // @see ReactElementValidator

  var loggedTypeFailures = {};

  var getDeclarationErrorAddendum = function getDeclarationErrorAddendum(owner) {
    if (owner) {
      var name = owner.getName();
      if (name) {
        return ' Check the render method of `' + name + '`.';
      }
    }
    return '';
  };

  /**
   * Assert that the props are valid
   * @private
   */
  var _checkPropTypes = function _checkPropTypes(componentName, propTypes, props, location, owner, element, debugID) {
    var propNames = Object.keys(props);
    for (var i = 0; i < propNames.length; ++i) {
      var propName = propNames[i];

      if (propName === 'children') {
        continue;
      }

      if (!propTypes.hasOwnProperty(propName)) {
        var errorMessage = 'Foreign prop ' + propName + ' found in ' + componentName + '.';

        if (!(errorMessage in loggedTypeFailures)) {
          var addendum = getDeclarationErrorAddendum(owner);

          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[errorMessage] = true;

          (0, _warning2.default)(false, '' + errorMessage + addendum);
        }
      }
    }

    (0, _checkReactTypeSpec2.default)(propTypes, props, location, componentName, element, debugID);
  };

  THREEElementDescriptor.prototype.checkPropTypes = function checkPropTypes(element, owner, debugID, props) {
    _checkPropTypes(element.type, this.propTypes, props, 'prop', owner, element, debugID);
  };
}

module.exports = THREEElementDescriptor;