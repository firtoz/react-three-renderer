'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _emptyFunction = require('fbjs/lib/emptyFunction');

var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

var _flattenChildren = require('react/lib/flattenChildren');

var _flattenChildren2 = _interopRequireDefault(_flattenChildren);

var _ReactCurrentOwner = require('react/lib/ReactCurrentOwner');

var _ReactCurrentOwner2 = _interopRequireDefault(_ReactCurrentOwner);

var _ReactElement = require('react/lib/ReactElement');

var _ReactElement2 = _interopRequireDefault(_ReactElement);

var _ReactInstrumentation = require('react-dom/lib/ReactInstrumentation');

var _ReactInstrumentation2 = _interopRequireDefault(_ReactInstrumentation);

var _ReactReconciler = require('react-dom/lib/ReactReconciler');

var _ReactReconciler2 = _interopRequireDefault(_ReactReconciler);

var _ReactMultiChild = require('react-dom/lib/ReactMultiChild');

var _ReactMultiChild2 = _interopRequireDefault(_ReactMultiChild);

var _ReactRef = require('react-dom/lib/ReactRef');

var _ReactRef2 = _interopRequireDefault(_ReactRef);

var _React3ComponentFlags = require('./React3ComponentFlags');

var _React3ComponentFlags2 = _interopRequireDefault(_React3ComponentFlags);

var _idPropertyName = require('./utils/idPropertyName');

var _idPropertyName2 = _interopRequireDefault(_idPropertyName);

var _React3CompositeComponentWrapper = require('./React3CompositeComponentWrapper');

var _React3CompositeComponentWrapper2 = _interopRequireDefault(_React3CompositeComponentWrapper);

var _React3ComponentTree = require('./React3ComponentTree');

var _React3ComponentTree2 = _interopRequireDefault(_React3ComponentTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function processChildContext(context) {
  return context;
}

var RemountTrigger = function RemountTrigger() {
  var _this = this;

  _classCallCheck(this, RemountTrigger);

  this.wantRemount = false;
  this.onTrigger = function onTrigger() {};

  this.trigger = function () {
    _this.wantRemount = true;

    _this.onTrigger();
  };
};

var registrationNameModules = {};

function deleteListener(rootNodeID, propKey) {
  console.log('deleteListener', rootNodeID, propKey); // eslint-disable-line
  debugger; // eslint-disable-line
}

function enqueuePutListener(rootNodeID, propKey, nextProp, transaction) {
  console.log('enqueuePutListener', rootNodeID, propKey, nextProp, transaction); // eslint-disable-line
  debugger; // eslint-disable-line
}

function _arrayMove(array, oldIndex, newIndex) {
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
}

var setChildrenForInstrumentation = _emptyFunction2.default;
var setContentChildForInstrumentation = _emptyFunction2.default;
var getDebugID = void 0;

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */

  var ReactInstanceMap = require('react-dom/lib/ReactInstanceMap');

  /* eslint-enable global-require */

  getDebugID = function _(inst) {
    if (!inst._debugID) {
      // Check for ART-like instances. TODO: This is silly/gross.
      var internal = ReactInstanceMap.get(inst);
      if (internal) {
        return internal._debugID;
      }
    }
    return inst._debugID;
  };

  setChildrenForInstrumentation = function _(children) {
    _ReactInstrumentation2.default.debugTool.onSetChildren(this._debugID, children ? Object.keys(children).map(function (key) {
      return children[key]._debugID;
    }) : []);
  };

  setContentChildForInstrumentation = function _(content) {
    var hasExistingContent = this._contentDebugID !== null && this._contentDebugID !== undefined;
    var debugID = this._debugID;
    // This ID represents the inlined child that has no backing instance:
    var contentDebugID = 'CDID-' + debugID;

    if (content == null) {
      if (hasExistingContent) {
        _ReactInstrumentation2.default.debugTool.onUnmountComponent(this._contentDebugID);
      }
      this._contentDebugID = null;
      return;
    }

    this._contentDebugID = contentDebugID;
    if (hasExistingContent) {
      _ReactInstrumentation2.default.debugTool.onBeforeUpdateComponent(contentDebugID, content);
      _ReactInstrumentation2.default.debugTool.onUpdateComponent(contentDebugID);
    } else {
      _ReactInstrumentation2.default.debugTool.onBeforeMountComponent(contentDebugID, content, debugID);
      _ReactInstrumentation2.default.debugTool.onMountComponent(contentDebugID);
      _ReactInstrumentation2.default.debugTool.onSetChildren(debugID, [contentDebugID]);
    }
  };
}

var getThreeObjectFromMountImage = function getThreeObjectFromMountImage(img) {
  return img.threeObject;
};

var ReactMultiChildMixin = _ReactMultiChild2.default.Mixin;

// TODO sync ReactDOMComponent
var InternalComponent = (_temp = _class = function () {
  function InternalComponent(element, react3RendererInstance) {
    var _this2 = this;

    _classCallCheck(this, InternalComponent);

    this.updateChildren = ReactMultiChildMixin.updateChildren.bind(this);
    this._mountChildAtIndex = ReactMultiChildMixin._mountChildAtIndex.bind(this);
    this._unmountChild = ReactMultiChildMixin._unmountChild.bind(this);
    this.unmountChildren = ReactMultiChildMixin.unmountChildren.bind(this);

    this._currentElement = element;
    /**
     * @type React3Renderer
     */
    this._react3RendererInstance = react3RendererInstance;

    this._elementType = element.type; // _tag
    this._renderedChildren = [];
    this._hostMarkup = null; // _hostNode
    this._hostParent = null;
    this._rootNodeID = 0;
    this._hostID = 0; // _domID
    this._hostContainerInfo = null;
    this._threeObject = null;
    this._topLevelWrapper = null;
    this._markup = null;
    this._nodeWithLegacyProperties = null;
    this._forceRemountOfComponent = false;
    this._flags = 0;

    if (process.env.NODE_ENV !== 'production') {
      this._ancestorInfo = null;

      setContentChildForInstrumentation.call(this, null);
    }

    this.threeElementDescriptor = react3RendererInstance.threeElementDescriptors[element.type];
    if (!this.threeElementDescriptor) {
      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(false, 'No constructor for ' + element.type);
      } else {
        (0, _invariant2.default)(false);
      }
    }

    if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_REACT_ADDON_HOOKS === 'true') {
      this.highlightComponent = function () {
        _this2.threeElementDescriptor.highlight(_this2._threeObject);
      };

      this.hideHighlight = function () {
        _this2.threeElementDescriptor.hideHighlight(_this2._threeObject);
      };
    }

    this.remountTrigger = new RemountTrigger();

    this.remountTrigger.onTrigger = function () {
      _this2._forceRemountOfComponent = true;
    };
  }

  _createClass(InternalComponent, [{
    key: 'getHostMarkup',
    value: function getHostMarkup() {
      return this._markup;
    }
  }, {
    key: 'getHostNode',
    value: function getHostNode() {
      // console.warn('host node?'); // eslint-disable-line no-console
      return this._markup;
    }

    /**
     * Generates root tag markup then recurses. This method has side effects and
     * is not idempotent.
     *
     * @internal
     * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
     * @param {?InternalComponent} hostParent the containing DOM component instance
     * @param {?React3ContainerInfo} hostContainerInfo info about the host container
     * @param {object} context
     * @return {object} The computed markup.
     */

  }, {
    key: 'mountComponent',
    value: function mountComponent(transaction, hostParent, hostContainerInfo, context) {
      var _markup;

      this._rootNodeID = this._react3RendererInstance.globalIdCounter++;
      this._hostID = hostContainerInfo._idCounter++;
      this._hostParent = hostParent;
      this._hostContainerInfo = hostContainerInfo;

      var element = this._currentElement;

      if (process.env.NODE_ENV !== 'production') {
        this.threeElementDescriptor.checkPropTypes(element, this._currentElement._owner, this._debugID, element.props);
      }

      this._threeObject = this.threeElementDescriptor.construct(element.props);
      this.threeElementDescriptor.applyInitialProps(this._threeObject, element.props);

      this.threeElementDescriptor.placeRemountTrigger(this._threeObject, this.remountTrigger.trigger);

      // create initial children
      var childrenToUse = element.props.children;

      var mountImages = void 0;
      if (childrenToUse) {
        mountImages = this.mountChildren(childrenToUse, transaction, context);
      } else {
        mountImages = [];
      }

      var markup = (_markup = {}, _defineProperty(_markup, _idPropertyName2.default, this._hostID), _defineProperty(_markup, '_rootInstance', null), _defineProperty(_markup, 'elementType', element.type), _defineProperty(_markup, 'threeObject', this._threeObject), _defineProperty(_markup, 'parentMarkup', null), _defineProperty(_markup, 'childrenMarkup', mountImages), _defineProperty(_markup, 'toJSON', function toJSON() {
        return '---MARKUP---';
      }), _markup);

      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(!!this._threeObject.userData, 'No userdata present in threeobject for %s', element.type);
      } else {
        (0, _invariant2.default)(!!this._threeObject.userData);
      }

      Object.assign(this._threeObject.userData, {
        object3D: this._threeObject,
        react3internalComponent: this, // used for highlighting etc
        toJSON: function toJSON() {
          return '---USERDATA---';
        },
        markup: markup
      });

      var threeElementDescriptors = this._react3RendererInstance.threeElementDescriptors;

      if (mountImages && mountImages.length > 0) {
        this.threeElementDescriptor.addChildren(this._threeObject, mountImages.map(getThreeObjectFromMountImage));

        for (var i = 0; i < mountImages.length; ++i) {
          var mountImage = mountImages[i];

          var descriptorForChild = threeElementDescriptors[mountImage.elementType];

          mountImage.parentMarkup = markup;

          descriptorForChild.setParent(mountImage.threeObject, this._threeObject);
        }
      }

      this._markup = markup;

      _React3ComponentTree2.default.precacheMarkup(this, this._markup);
      this._flags |= _React3ComponentFlags2.default.hasCachedChildMarkups;

      return markup;
    }

    /**
     * @see ReactMultiChild._reconcilerInstantiateChildren
     * Cloned because it uses
     * @see React3Renderer.instantiateChildren
     *
     * @param nestedChildren
     * @param transaction
     * @param context
     * @returns {*}
     * @private
     */

  }, {
    key: '_reconcilerInstantiateChildren',
    value: function _reconcilerInstantiateChildren(nestedChildren, transaction, context) {
      if (process.env.NODE_ENV !== 'production') {
        var selfDebugID = getDebugID(this);

        if (this._currentElement) {
          var previousCurrent = _ReactCurrentOwner2.default.current;

          try {
            _ReactCurrentOwner2.default.current = this._currentElement._owner;
            return this._react3RendererInstance.instantiateChildren(nestedChildren, transaction, context, selfDebugID);
          } finally {
            _ReactCurrentOwner2.default.current = previousCurrent;
          }
        }
      }
      return this._react3RendererInstance.instantiateChildren(nestedChildren, transaction, context, 0);
    }

    /**
     * @see ReactMultiChild._reconcilerUpdateChildren
     * Cloned because it uses
     * @see React3Renderer.updateChildren
     *
     * @param prevChildren
     * @param nextNestedChildrenElements
     * @param mountImages
     * @param removedMarkups
     * @param transaction
     * @param context
     * @returns {?Object}
     * @private
     */

  }, {
    key: '_reconcilerUpdateChildren',
    value: function _reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements, mountImages, removedMarkups, transaction, context) {
      var nextChildren = void 0;
      var selfDebugID = 0;

      if (process.env.NODE_ENV !== 'production') {
        selfDebugID = getDebugID(this);

        if (this._currentElement) {
          var previousCurrent = _ReactCurrentOwner2.default.current;

          try {
            _ReactCurrentOwner2.default.current = this._currentElement._owner;
            nextChildren = (0, _flattenChildren2.default)(nextNestedChildrenElements, selfDebugID);
          } finally {
            _ReactCurrentOwner2.default.current = previousCurrent;
          }

          this._react3RendererInstance.updateChildren(prevChildren, nextChildren, mountImages, removedMarkups, transaction, this, this._hostContainerInfo, context, selfDebugID);

          return nextChildren;
        }
      }

      nextChildren = (0, _flattenChildren2.default)(nextNestedChildrenElements, selfDebugID);

      this._react3RendererInstance.updateChildren(prevChildren, nextChildren, mountImages, removedMarkups, transaction, this, this._hostContainerInfo, context, selfDebugID);

      return nextChildren;
    }

    /**
     * @see ReactMultiChild.mountChildren
     *
     * Generates a "mount image" for each of the supplied children. In the case
     * of `ReactDOMComponent`, a mount image is a string of markup.
     *
     * @param {?object} nestedChildren Nested child maps.
     * @param transaction
     * @param context
     * @return {array} An array of mounted representations.
     * @internal
     */

  }, {
    key: 'mountChildren',
    value: function mountChildren(nestedChildren, transaction, context) {
      var children = this._reconcilerInstantiateChildren(nestedChildren, transaction, context);
      this._renderedChildren = children;

      var mountImages = [];
      var index = 0;

      if (children) {
        var childrenNames = Object.keys(children);
        for (var i = 0; i < childrenNames.length; ++i) {
          var name = childrenNames[i];
          var child = children[name];
          var selfDebugID = 0;

          if (process.env.NODE_ENV !== 'production') {
            selfDebugID = getDebugID(this);
          }

          var mountImage = _ReactReconciler2.default.mountComponent(child, transaction, this, this._hostContainerInfo, context, selfDebugID);

          // const mountImage = ReactReconciler.mountComponent(child, rootID, transaction, context);
          child._mountIndex = index;
          mountImages.push(mountImage);
          index++;
        }
      }

      if (process.env.NODE_ENV !== 'production') {
        setChildrenForInstrumentation.call(this, children);
      }

      return mountImages;
    }
  }, {
    key: 'moveChild',
    value: function moveChild(child, toIndex, lastIndex) {
      if (child._mountIndex === toIndex) {
        return;
      }

      this.threeElementDescriptor.moveChild(this._threeObject, child._threeObject, toIndex, child._mountIndex);

      var markup = this._markup;

      _arrayMove(markup.childrenMarkup, lastIndex, toIndex);
    }
  }, {
    key: 'receiveComponent',
    value: function receiveComponent(nextElement, transaction, context) {
      // console.log('receive component');

      var prevElement = this._currentElement;
      this._currentElement = nextElement;

      this.updateComponent(transaction, prevElement, nextElement, context);

      if (this._forceRemountOfComponent) {
        this._currentElement = null;
      }
    }

    /**
     * @see ReactDOMComponent.updateComponent
     *
     * Updates a DOM component after it has already been allocated and
     * attached to the DOM. Reconciles the root DOM node, then recurses.
     *
     * @param {ReactReconcileTransaction} transaction
     * @param {ReactElement} prevElement
     * @param {ReactElement} nextElement
     * @param context
     * @internal
     * @overridable
     */

  }, {
    key: 'updateComponent',
    value: function updateComponent(transaction, prevElement, nextElement, context) {
      var lastProps = prevElement.props;
      var nextProps = this._currentElement.props;

      if (prevElement.type !== nextElement.type) {
        if (process.env.NODE_ENV !== 'production') {
          (0, _invariant2.default)(false, 'The component type changed unexpectedly');
        } else {
          (0, _invariant2.default)(false);
        }
      }

      this._updateObjectProperties(lastProps, nextProps, transaction, context);
      if (!this._forceRemountOfComponent) {
        this._updateChildrenObjects(nextProps, transaction, processChildContext(context, this));
      }
    }

    // see _updateDOMChildren

  }, {
    key: '_updateChildrenObjects',
    value: function _updateChildrenObjects(nextProps, transaction, context) {
      var nextChildren = nextProps.children || null;

      if (process.env.NODE_ENV !== 'production') {
        setContentChildForInstrumentation.call(this, null);
      }

      this.updateChildren(nextChildren, transaction, context);
    }

    // original: _updateDOMProperties

  }, {
    key: '_updateObjectProperties',
    value: function _updateObjectProperties(lastProps, nextProps, transaction) {
      var remountTrigger = this.remountTrigger;

      remountTrigger.wantRemount = false;

      this.threeElementDescriptor.beginPropertyUpdates(this._threeObject, nextProps);

      if (process.env.NODE_ENV !== 'production') {
        this.threeElementDescriptor.checkPropTypes(this._currentElement, this._currentElement._owner, this._debugID, nextProps);
      }

      var lastPropKeys = Object.keys(lastProps);

      // https://jsperf.com/object-keys-vs-for-in-with-closure/3
      for (var i = 0; i < lastPropKeys.length; ++i) {
        var propKey = lastPropKeys[i];

        if (nextProps.hasOwnProperty(propKey)) {
          continue;
        }

        if (propKey === 'children') {
          continue;
        }

        if (remountTrigger.wantRemount) {
          break;
        }

        if (registrationNameModules.hasOwnProperty(propKey)) {
          if (lastProps[propKey]) {
            // Only call deleteListener if there was a listener previously or
            // else willDeleteListener gets called when there wasn't actually a
            // listener (e.g., onClick={null})
            deleteListener(this._rootNodeID, propKey);
          }
        } else {
          this.threeElementDescriptor.deleteProperty(this._threeObject, propKey);
        }
      }

      var nextPropKeys = Object.keys(nextProps);

      for (var _i = 0; _i < nextPropKeys.length; ++_i) {
        var _propKey = nextPropKeys[_i];

        if (_propKey === 'children') {
          continue;
        }

        if (remountTrigger.wantRemount) {
          break;
        }

        var nextProp = nextProps[_propKey];
        var lastProp = lastProps[_propKey];

        if (nextProp === lastProp) {
          continue;
        }

        if (registrationNameModules.hasOwnProperty(_propKey)) {
          if (nextProp) {
            enqueuePutListener(this._rootNodeID, _propKey, nextProp, transaction);
          } else if (lastProp) {
            deleteListener(this._rootNodeID, _propKey);
          }
        } else {
          this.threeElementDescriptor.updateProperty(this._threeObject, _propKey, nextProp);
        }
      }

      this.threeElementDescriptor.completePropertyUpdates(this._threeObject);
    }
  }, {
    key: '_removeAllChildRefs',
    value: function _removeAllChildRefs() {
      var renderedChildren = this._renderedChildren;

      if (renderedChildren) {
        var renderedChildrenKeys = Object.keys(renderedChildren);

        for (var i = 0; i < renderedChildrenKeys.length; ++i) {
          var name = renderedChildrenKeys[i];

          var renderedChild = renderedChildren[name];

          if (renderedChild && renderedChild._currentElement && renderedChild._currentElement.ref) {
            _ReactRef2.default.detachRefs(renderedChild, renderedChild._currentElement);

            renderedChild._currentElement = _ReactElement2.default.cloneElement(renderedChild._currentElement, {
              ref: null
            });
          }

          renderedChild._removeAllChildRefs();
        }
      }
    }

    /**
     * @see ReactDOMComponent.Mixin.unmountComponent
     */

  }, {
    key: 'unmountComponent',
    value: function unmountComponent(safely) {
      if (this._threeObject !== null) {
        this.threeElementDescriptor.componentWillUnmount(this._threeObject);
      }

      if (this._forceRemountOfComponent) {
        this._removeAllChildRefs(); // prevent attaching of refs to children
      }

      this.unmountChildren(safely);
      _React3ComponentTree2.default.uncacheMarkup(this);

      if (this._threeObject !== null) {
        this.threeElementDescriptor.unmount(this._threeObject);
        // delete this._threeObject.userData.markup;
      }

      this._markup = null;
      this._rootNodeID = 0;

      if (this._nodeWithLegacyProperties) {
        var node = this._nodeWithLegacyProperties;
        node._reactInternalComponent = null;
        this._nodeWithLegacyProperties = null;
      }

      if (process.env.NODE_ENV !== 'production') {
        setContentChildForInstrumentation.call(this, null);
      }
    }
  }, {
    key: 'emptyJson',
    value: function emptyJson() {
      debugger; // eslint-disable-line
      return '...';
    }
  }, {
    key: 'getPublicInstance',
    value: function getPublicInstance() {
      return this._markup.threeObject;
    }

    /**
     * @see ReactMultiChildMixin._updateChildren
     *
     * Improve performance by isolating this hot code path from the try/catch
     * block in `updateChildren`.
     *
     * @param {?object} nextNestedChildrenElements Nested child maps.
     * @param {ReactReconcileTransaction} transaction
     * @param {any} context
     * @final
     * @protected
     */

  }, {
    key: '_updateChildren',
    value: function _updateChildren(nextNestedChildrenElements, transaction, context) {
      var prevChildren = this._renderedChildren;
      var removedMarkups = {};
      var mountImages = [];
      var nextChildren = this._reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements, mountImages, removedMarkups, transaction, context);

      if (!nextChildren && !prevChildren) {
        return;
      }

      var remountTrigger = this.remountTrigger;

      remountTrigger.wantRemount = false;

      this.threeElementDescriptor.beginChildUpdates(this._threeObject);

      // `nextIndex` will increment for each child in `nextChildren`, but
      // `lastIndex` will be the last index visited in `prevChildren`.
      var nextIndex = 0;
      var lastIndex = 0;
      // `nextMountIndex` will increment for each newly mounted child.
      var nextMountIndex = 0;

      if (nextChildren) {
        var nextChildrenNames = Object.keys(nextChildren);

        for (var i = 0; i < nextChildrenNames.length; ++i) {
          var childName = nextChildrenNames[i];

          if (remountTrigger.wantRemount) {
            // This component will be remounted, (see extrude geometry)
            // No need to update children any more as they will also be remounted!
            continue;
          }

          var prevChild = prevChildren && prevChildren[childName];
          var nextChild = nextChildren[childName];

          if (prevChild === nextChild) {
            this.moveChild(prevChild, nextIndex, lastIndex);
            lastIndex = Math.max(prevChild._mountIndex, lastIndex);
            prevChild._mountIndex = nextIndex;
          } else {
            if (prevChild) {
              // Update `lastIndex` before `_mountIndex` gets unset by unmounting.
              lastIndex = Math.max(prevChild._mountIndex, lastIndex);

              var removedChildMarkup = removedMarkups[childName];

              // handle removal here to allow replacing of components that are expected to be present
              // only once in the parent
              (0, _invariant2.default)(!!removedChildMarkup, 'Removed markup map should contain this child');

              delete removedMarkups[childName];

              this._unmountChild(prevChild, removedChildMarkup);
            }

            if (!remountTrigger.wantRemount) {
              // The remount can be triggered by unmountChild as well (see extrude geometry)

              // The child must be instantiated before it's mounted.
              this._mountChildAtIndex(nextChild, mountImages[nextMountIndex], null, nextIndex, transaction, context);

              nextMountIndex++;
            }
          }

          nextIndex++;
        }
      }

      var removedMarkupNames = Object.keys(removedMarkups);

      for (var _i2 = 0; _i2 < removedMarkupNames.length; ++_i2) {
        var removedMarkupName = removedMarkupNames[_i2];

        this._unmountChild(prevChildren[removedMarkupName], removedMarkups[removedMarkupName]);
      }

      this._renderedChildren = nextChildren;

      if (process.env.NODE_ENV !== 'production') {
        setChildrenForInstrumentation.call(this, nextChildren);
      }

      this.threeElementDescriptor.completeChildUpdates(this._threeObject);
    }

    // afterNode unused

  }, {
    key: 'createChild',
    value: function createChild(child, afterNode, mountImage) {
      var mountIndex = child._mountIndex;

      this._markup.childrenMarkup.splice(mountIndex, 0, mountImage);
      mountImage.parentMarkup = this._markup;

      this.threeElementDescriptor.addChild(this._threeObject, mountImage.threeObject, mountIndex);

      var descriptorForChild = this._react3RendererInstance.threeElementDescriptors[mountImage.elementType];

      descriptorForChild.setParent(mountImage.threeObject, this._threeObject);
    }

    /**
     * Removes a child component.
     *
     * @param {ReactComponent} child Child to remove.
     * @param {*} markup The markup for the child.
     * @protected
     */

  }, {
    key: 'removeChild',
    value: function removeChild(child, markup) {
      // eslint-disable-line no-unused-vars
      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(!!markup && !!markup.threeObject, 'The child markup to replace has no threeObject');
      }

      this.threeElementDescriptor.removeChild(this._threeObject, markup.threeObject);

      if (child instanceof InternalComponent) {
        child.threeElementDescriptor.removedFromParent(markup.threeObject);
      } else if (child instanceof _React3CompositeComponentWrapper2.default) {
        markup.threeObject.userData.react3internalComponent.threeElementDescriptor.removedFromParent(markup.threeObject);
      } else if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(false, 'Cannot remove child because it is not a known component type');
      } else {
        (0, _invariant2.default)(false);
      }

      var childrenMarkup = this._markup.childrenMarkup;

      for (var i = 0; i < childrenMarkup.length; i++) {
        var childMarkup = childrenMarkup[i];

        if (childMarkup.threeObject === markup.threeObject) {
          childrenMarkup.splice(i, 1);

          delete childMarkup.parentMarkup;
          return;
        }
      }

      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(false, 'Trying to remove a child that is not mounted');
      } else {
        (0, _invariant2.default)(false);
      }
    }
  }]);

  return InternalComponent;
}(), _class.displayName = 'React3Component', _temp);


module.exports = InternalComponent;