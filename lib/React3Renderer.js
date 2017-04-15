'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _class2, _temp2;

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _ReactElement = require('react/lib/ReactElement');

var _ReactElement2 = _interopRequireDefault(_ReactElement);

var _ReactCurrentOwner = require('react/lib/ReactCurrentOwner');

var _ReactCurrentOwner2 = _interopRequireDefault(_ReactCurrentOwner);

var _ReactComponent2 = require('react/lib/ReactComponent');

var _ReactComponent3 = _interopRequireDefault(_ReactComponent2);

var _KeyEscapeUtils = require('react/lib/KeyEscapeUtils');

var _KeyEscapeUtils2 = _interopRequireDefault(_KeyEscapeUtils);

var _emptyObject = require('fbjs/lib/emptyObject');

var _emptyObject2 = _interopRequireDefault(_emptyObject);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _warning = require('fbjs/lib/warning');

var _warning2 = _interopRequireDefault(_warning);

var _ReactInstanceMap = require('react-dom/lib/ReactInstanceMap');

var _ReactInstanceMap2 = _interopRequireDefault(_ReactInstanceMap);

var _ReactReconciler = require('react-dom/lib/ReactReconciler');

var _ReactReconciler2 = _interopRequireDefault(_ReactReconciler);

var _ReactUpdates = require('react-dom/lib/ReactUpdates');

var _ReactUpdates2 = _interopRequireDefault(_ReactUpdates);

var _ReactUpdateQueue = require('react-dom/lib/ReactUpdateQueue');

var _ReactUpdateQueue2 = _interopRequireDefault(_ReactUpdateQueue);

var _ReactInjection = require('react-dom/lib/ReactInjection');

var _ReactInjection2 = _interopRequireDefault(_ReactInjection);

var _ReactReconcileTransaction = require('react-dom/lib/ReactReconcileTransaction');

var _ReactReconcileTransaction2 = _interopRequireDefault(_ReactReconcileTransaction);

var _ReactDefaultBatchingStrategy = require('react-dom/lib/ReactDefaultBatchingStrategy');

var _ReactDefaultBatchingStrategy2 = _interopRequireDefault(_ReactDefaultBatchingStrategy);

var _traverseAllChildren = require('react-dom/lib/traverseAllChildren');

var _traverseAllChildren2 = _interopRequireDefault(_traverseAllChildren);

var _getHostComponentFromComposite = require('react-dom/lib/getHostComponentFromComposite');

var _getHostComponentFromComposite2 = _interopRequireDefault(_getHostComponentFromComposite);

var _shouldUpdateReactComponent = require('react-dom/lib/shouldUpdateReactComponent');

var _shouldUpdateReactComponent2 = _interopRequireDefault(_shouldUpdateReactComponent);

var _ReactInstrumentation = require('react-dom/lib/ReactInstrumentation');

var _ReactInstrumentation2 = _interopRequireDefault(_ReactInstrumentation);

var _React3ContainerInfo = require('./React3ContainerInfo');

var _React3ContainerInfo2 = _interopRequireDefault(_React3ContainerInfo);

var _EventDispatcher = require('./utils/EventDispatcher');

var _EventDispatcher2 = _interopRequireDefault(_EventDispatcher);

var _InternalComponent = require('./InternalComponent');

var _InternalComponent2 = _interopRequireDefault(_InternalComponent);

var _React3ComponentTree = require('./React3ComponentTree');

var _React3ComponentTree2 = _interopRequireDefault(_React3ComponentTree);

var _ElementDescriptorContainer = require('./ElementDescriptorContainer');

var _ElementDescriptorContainer2 = _interopRequireDefault(_ElementDescriptorContainer);

var _React3CompositeComponentWrapper = require('./React3CompositeComponentWrapper');

var _React3CompositeComponentWrapper2 = _interopRequireDefault(_React3CompositeComponentWrapper);

var _idPropertyName = require('./utils/idPropertyName');

var _idPropertyName2 = _interopRequireDefault(_idPropertyName);

var _removeDevTool = require('./utils/removeDevTool');

var _removeDevTool2 = _interopRequireDefault(_removeDevTool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getDeclarationErrorAddendum = void 0;
var staticDebugIdHack = void 0;
var ReactComponentTreeHook = void 0;

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */

  if (!ReactComponentTreeHook) {
    ReactComponentTreeHook = require('react/lib/ReactComponentTreeHook');
  }

  /* eslint-enable global-require */
}

if (process.env.NODE_ENV !== 'production') {
  staticDebugIdHack = 0;
  // prop type helpers
  // the warnings for propTypes will not say <anonymous>.
  // Some performance is sacrificed for this.

  // TODO: could have an env variable to disable this?
  if (!THREE._renamed) {
    THREE._renamed = true;

    THREE.Vector2.displayName = 'THREE.Vector2';
    THREE.Vector3.displayName = 'THREE.Vector3';
    THREE.Quaternion.displayName = 'THREE.Quaternion';
    THREE.Color.displayName = 'THREE.Color';
    THREE.Shape.displayName = 'THREE.Shape';
    THREE.Euler.displayName = 'THREE.Euler';
    THREE.Fog.displayName = 'THREE.Fog';
  }

  getDeclarationErrorAddendum = function getDeclarationErrorAddendum(owner) {
    if (owner) {
      var name = owner.getName();
      if (name) {
        return ' Check the render method of `' + name + '`.';
      }
    }
    return '';
  };
}

/**
 * Unmounts a component and removes it from the DOM.
 *
 * @param {ReactComponent} instance React component instance.
 * @param {*} container DOM element to unmount from.
 * @param {bool} safely
 * @final
 * @internal
 * @see {ReactMount.unmountComponentAtNode}
 */
function unmountComponentFromNode(instance, container, safely) {
  if (process.env.NODE_ENV !== 'production') {
    _ReactInstrumentation2.default.debugTool.onBeginFlush();
  }

  _ReactReconciler2.default.unmountComponent(instance, safely);

  if (process.env.NODE_ENV !== 'production') {
    _ReactInstrumentation2.default.debugTool.onEndFlush();
  }
}

/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */

var TopLevelWrapper = (_temp = _class = function (_ReactComponent) {
  _inherits(TopLevelWrapper, _ReactComponent);

  function TopLevelWrapper() {
    _classCallCheck(this, TopLevelWrapper);

    return _possibleConstructorReturn(this, (TopLevelWrapper.__proto__ || Object.getPrototypeOf(TopLevelWrapper)).apply(this, arguments));
  }

  _createClass(TopLevelWrapper, [{
    key: 'render',
    value: function render() {
      return this.props.child;
    }
  }]);

  return TopLevelWrapper;
}(_ReactComponent3.default), _class.isReactComponent = {}, _class.isReactTopLevelWrapper = true, _temp);


if (process.env.NODE_ENV !== 'production') {
  TopLevelWrapper.displayName = 'TopLevelWrapper';
}

function internalGetID(markup) {
  return markup && markup[_idPropertyName2.default] || '';
}

// see ReactMount.js:getReactRootElementInContainer
/**
 * @param {THREE.Object3D|HTMLCanvasElement} container That may contain
 * a React component
 * @return {?*} The markup that may have the reactRoot ID, or null.
 */
function getReactRootMarkupInContainer(container) {
  if (!container) {
    return null;
  }

  // in ReactMount this is container.firstChild.

  return container.userData && container.userData.markup && container.userData.markup.childrenMarkup[0] || null;
}

/**
 * Check if the type reference is a known internal type. I.e. not a user
 * provided composite type.
 *
 * @param {function} type
 * @return {boolean} Returns true if this is a valid internal type.
 */
function isInternalComponentType(type) {
  return typeof type === 'function' && typeof type.prototype !== 'undefined' && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function';
}

var React3Renderer = (_temp2 = _class2 = function () {
  _createClass(React3Renderer, [{
    key: 'updateChildren',


    /**
     * @see ReactChildReconciler.updateChildren
     *
     * Cloned because it uses
     * @see React3Renderer.instantiateReactComponent
     *
     * Updates the rendered children and returns a new set of children.
     *
     * @param {?object} prevChildren Previously initialized set of children.
     * @param {?object} nextChildren Flat child element maps.
     * @param mountImages
     * @param {?object} removedMarkups The map for removed nodes.
     * @param {ReactReconcileTransaction} transaction
     * @param hostParent
     * @param hostContainerInfo
     * @param {object} context
     * @param selfDebugID
     * @return {?object} A new set of child instances.
     * @internal
     */
    value: function updateChildren(prevChildren, nextChildren, mountImages, removedMarkups, transaction, hostParent, hostContainerInfo, context, selfDebugID // 0 in production and for roots
    ) {
      // We currently don't have a way to track moves here but if we use iterators
      // instead of for..in we can zip the iterators and check if an item has
      // moved.
      // TODO: If nothing has changed, return the prevChildren object so that we
      // can quickly bailout.
      if (!nextChildren && !prevChildren) {
        return null;
      }

      if (nextChildren) {
        var nextChildrenKeys = Object.keys(nextChildren);

        for (var i = 0; i < nextChildrenKeys.length; ++i) {
          var childName = nextChildrenKeys[i];

          var prevChild = prevChildren && prevChildren[childName];
          var prevElement = prevChild && prevChild._currentElement;
          var nextElement = nextChildren[childName];
          if (prevChild !== null && prevChild !== undefined && (0, _shouldUpdateReactComponent2.default)(prevElement, nextElement)) {
            _ReactReconciler2.default.receiveComponent(prevChild, nextElement, transaction, context);

            if (prevChild._forceRemountOfComponent) {
              removedMarkups[childName] = prevChild.getHostMarkup();

              _ReactReconciler2.default.unmountComponent(prevChild, false);
              var nextChildInstance = this.instantiateReactComponent(nextElement, true);
              nextChildren[childName] = nextChildInstance;

              // Creating mount image now ensures refs are resolved in right order
              // (see https://github.com/facebook/react/pull/7101 for explanation).
              var nextChildMountImage = _ReactReconciler2.default.mountComponent(nextChildInstance, transaction, hostParent, hostContainerInfo, context, selfDebugID);

              mountImages.push(nextChildMountImage);
            } else {
              nextChildren[childName] = prevChild;
            }
          } else {
            if (prevChild) {
              removedMarkups[childName] = prevChild.getHostMarkup();

              _ReactReconciler2.default.unmountComponent(prevChild, false);
            }
            // The child must be instantiated before it's mounted.
            var _nextChildInstance = this.instantiateReactComponent(nextElement, true);

            nextChildren[childName] = _nextChildInstance;

            // Creating mount image now ensures refs are resolved in right order
            // (see https://github.com/facebook/react/pull/7101 for explanation).
            var _nextChildMountImage = _ReactReconciler2.default.mountComponent(_nextChildInstance, transaction, hostParent, hostContainerInfo, context, selfDebugID /* parentDebugID */
            );

            mountImages.push(_nextChildMountImage);
          }
        }
      }

      if (prevChildren) {
        // Unmount children that are no longer present.
        var prevChildrenKeys = Object.keys(prevChildren);
        for (var _i = 0; _i < prevChildrenKeys.length; ++_i) {
          var _childName = prevChildrenKeys[_i];

          if (!(nextChildren && nextChildren.hasOwnProperty(_childName))) {
            var _prevChild = prevChildren[_childName];

            removedMarkups[_childName] = _prevChild.getHostMarkup();

            _ReactReconciler2.default.unmountComponent(_prevChild, false);
          }
        }
      }

      return nextChildren;
    }
  }, {
    key: 'getElementDescriptor',
    value: function getElementDescriptor(name) {
      return this.threeElementDescriptors[name];
    }
  }], [{
    key: 'findTHREEObject',


    /**
     * Returns the THREE.js object rendered by this element.
     *
     * @param {React.Component|THREE.Object3D|HTMLCanvasElement} componentOrElement
     * @return {?THREE.Object3D} The root node of this element.
     */
    value: function findTHREEObject(componentOrElement) {
      if (process.env.NODE_ENV !== 'production') {
        var owner = _ReactCurrentOwner2.default.current;
        if (owner !== null) {
          if (process.env.NODE_ENV !== 'production') {
            (0, _warning2.default)(owner._warnedAboutRefsInRender, '%s is accessing findDOMNode inside its render(). ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', owner.getName() || 'A component');
          }
          owner._warnedAboutRefsInRender = true;
        }
      }

      if (componentOrElement === null) {
        return null;
      }

      if (componentOrElement instanceof THREE.Object3D || componentOrElement instanceof HTMLCanvasElement) {
        return componentOrElement;
      }

      if (_ReactInstanceMap2.default.has(componentOrElement)) {
        var instance = _ReactInstanceMap2.default.get(componentOrElement);

        instance = (0, _getHostComponentFromComposite2.default)(instance);

        return instance ? _React3ComponentTree2.default.getMarkupFromInstance(instance).threeObject : null;
      }

      if (!(componentOrElement.render === null || typeof componentOrElement.render !== 'function')) {
        if (process.env.NODE_ENV !== 'production') {
          (0, _invariant2.default)(false, 'Component (with keys: %s) contains `render` method ' + 'but is not mounted', Object.keys(componentOrElement));
        } else {
          (0, _invariant2.default)(false);
        }
      }

      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(false, 'Element appears to be neither ReactComponent, ' + 'a THREE.js object, nor a HTMLCanvasElement (keys: %s)', Object.keys(componentOrElement));
      } else {
        (0, _invariant2.default)(false);
      }

      return null;
    }
    // to be used by modules e.g. mouse input ( see examples )

  }]);

  function React3Renderer() {
    var _this2 = this;

    _classCallCheck(this, React3Renderer);

    this.instantiateChild = function (childInstances, child, name, selfDebugID) {
      // We found a component instance.
      var keyUnique = childInstances[name] === undefined;
      if (process.env.NODE_ENV !== 'production') {
        if (!keyUnique) {
          (0, _warning2.default)(false, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.%s', _KeyEscapeUtils2.default.unescape(name), ReactComponentTreeHook.getStackAddendumByID(selfDebugID));
        }
      }

      if (child !== null && keyUnique) {
        childInstances[name] = _this2.instantiateReactComponent(child, true);
      }
    };

    this.findNodeHandle = function (instance) {
      var inst = _React3ComponentTree2.default.getRenderedHostOrTextFromComponent(instance);

      if (!inst || !inst._threeObject) {
        return null;
      }

      var markup = _React3ComponentTree2.default.getMarkupFromInstance(inst);

      _this2._highlightCache = markup;
      return _this2._highlightElement;
    };

    this.nativeTagToRootNodeID = function () {
      return 0;
    };

    this.hostTagToRootNodeID = function () {
      return 0;
    };

    this.batchedMountComponentIntoNode = function (componentInstance, container, shouldReuseMarkup, context) {
      var transaction = _ReactUpdates2.default.ReactReconcileTransaction.getPooled(!shouldReuseMarkup);
      transaction.perform(_this2.mountComponentIntoNode, null, componentInstance, container, transaction, shouldReuseMarkup, context);
      _ReactUpdates2.default.ReactReconcileTransaction.release(transaction);
    };

    this.mountComponentIntoNode = function (wrapperInstance, container, transaction, shouldReuseMarkup, context) {
      var markup = _ReactReconciler2.default.mountComponent(wrapperInstance, transaction, null, (0, _React3ContainerInfo2.default)(wrapperInstance, container), context, 0 /* parentDebugID */
      );

      wrapperInstance._renderedComponent._topLevelWrapper = wrapperInstance;
      _this2._mountImageIntoNode(markup, container, wrapperInstance, shouldReuseMarkup, transaction);
    };

    this._instancesByReactRootID = {};
    if (process.env.NODE_ENV !== 'production') {
      this.rootMarkupsByReactRootID = {};
    }
    this.nextMountID = 1;
    this.globalIdCounter = 1;
    this.nextReactRootIndex = 0;

    this.threeElementDescriptors = new _ElementDescriptorContainer2.default(this).descriptors;

    this._highlightElement = document.createElement('div');
    this._highlightCache = null;

    if (process.env.NODE_ENV !== 'production') {
      this._nextDebugID = 1;
      this._debugIdPrefix = staticDebugIdHack++;
    }

    if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_REACT_ADDON_HOOKS === 'true') {
      this._agent = null;

      this._onHideHighlightFromInspector = function () {
        if (_this2._highlightCache && _this2._highlightCache.threeObject.userData.react3internalComponent) {
          var internalComponent = _this2._highlightCache.threeObject.userData.react3internalComponent;

          internalComponent.hideHighlight();

          _this2._highlightCache = null;
        }
      };

      this._onHighlightFromInspector = function (highlightInfo) {
        if (highlightInfo.node === _this2._highlightElement) {
          if (_this2._highlightCache && _this2._highlightCache.threeObject.userData.react3internalComponent) {
            var internalComponent = _this2._highlightCache.threeObject.userData.react3internalComponent;

            internalComponent.highlightComponent();
          }
        }
      };

      this._hookAgent = function (agent) {
        _this2._agent = agent;

        // agent.on('startInspecting', (...args) => {
        //   console.log('start inspecting?', args);
        // });
        // agent.on('setSelection', (...args) => {
        //   console.log('set selection?', args);
        // });
        // agent.on('selected', (...args) => {
        //   console.log('selected?', args);
        // });
        agent.on('highlight', _this2._onHighlightFromInspector);
        agent.on('hideHighlight', _this2._onHideHighlightFromInspector);
        // agent.on('highlightMany', (...args) => {
        //   console.log('highlightMany?', args);
        // });
      };

      // Inject the runtime into a devtools global hook regardless of browser.
      // Allows for debugging when the hook is injected on the page.
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
        this._devToolsRendererDefinition = {
          ComponentTree: {
            getClosestInstanceFromNode: function getClosestInstanceFromNode(node) {
              return _React3ComponentTree2.default.getClosestInstanceFromMarkup(node);
            },
            getNodeFromInstance: function getNodeFromInstance(instInput) {
              var inst = instInput;
              // inst is an internal instance (but could be a composite)
              while (inst._renderedComponent) {
                inst = inst._renderedComponent;
              }
              if (inst) {
                return _React3ComponentTree2.default.getMarkupFromInstance(inst);
              }

              return null;
            }
          },
          Mount: this,
          Reconciler: _ReactReconciler2.default,
          TextComponent: _InternalComponent2.default
        };

        var rendererListener = function rendererListener(info) {
          _this2._reactDevtoolsRendererId = info.id;
          _this2._rendererListenerCleanup();

          delete _this2._rendererListenerCleanup;
        };

        this._rendererListenerCleanup = __REACT_DEVTOOLS_GLOBAL_HOOK__.sub('renderer', rendererListener);
        __REACT_DEVTOOLS_GLOBAL_HOOK__.inject(this._devToolsRendererDefinition);

        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent !== 'undefined' && __REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent) {
          var agent = __REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent;
          this._hookAgent(agent);
        } else {
          this._devtoolsCallbackCleanup = __REACT_DEVTOOLS_GLOBAL_HOOK__.sub('react-devtools', function (agent) {
            _this2._devtoolsCallbackCleanup();

            _this2._hookAgent(agent);
          });
        }
      }
    }
  }

  /**
   * @see ReactChildReconciler.instantiateChild
   * Cloned because it uses
   * @see React3Renderer.instantiateReactComponent
   *
   * @param childInstances
   * @param child
   * @param name
   * @param selfDebugID
   */


  _createClass(React3Renderer, [{
    key: 'instantiateChildren',


    /**
     * @see ReactChildReconciler.instantiateChildren
     * Cloned because it uses
     * @see React3Renderer.instantiateChild
     *
     * Generates a "mount image" for each of the supplied children. In the case
     * of `ReactDOMComponent`, a mount image is a string of markup.
     *
     * @param {?object} nestedChildNodes Nested child maps.
     * @param transaction
     * @param context
     * @param selfDebugID
     * @return {?object} A set of child instances.
     * @internal
     */
    value: function instantiateChildren(nestedChildNodes, transaction, context, selfDebugID // 0 in production and for roots
    ) {
      var _this3 = this;

      if (nestedChildNodes === null) {
        return null;
      }

      var childInstances = {};

      if (process.env.NODE_ENV !== 'production') {
        (0, _traverseAllChildren2.default)(nestedChildNodes, function (childInsts, child, name) {
          return _this3.instantiateChild(childInsts, child, name, selfDebugID);
        }, childInstances);
      } else {
        (0, _traverseAllChildren2.default)(nestedChildNodes, this.instantiateChild, childInstances);
      }

      return childInstances;
    }
  }, {
    key: 'containsChild',
    value: function containsChild(container, markup) {
      var childrenMarkup = container.userData.markup.childrenMarkup;
      for (var i = 0; i < childrenMarkup.length; i++) {
        if (childrenMarkup[i] === markup) {
          return true;
        }
      }

      return false;
    }

    // DO NOT RENAME
    // used by react devtools!


    // used by react devtools

  }, {
    key: '_mountImageIntoNode',
    value: function _mountImageIntoNode(markup, container, instance, shouldReuseMarkup, transaction) {
      // eslint-disable-line no-unused-vars
      // TODO try to do server-side rendering for THREE

      if (!container.userData) {
        // it has to be a HTMLCanvasElement I guess?
        (0, _invariant2.default)(container instanceof HTMLCanvasElement, 'The root container can only be a THREE.js object ' + '(with an userData property) or HTMLCanvasElement.');
        container.userData = {
          _createdByReact3: true
        };
      }

      var rootImage = markup;

      var rootMarkup = {
        threeObject: container,
        parentMarkup: null,
        childrenMarkup: [rootImage],
        toJSON: function toJSON() {
          return '---MARKUP---';
        }
      };

      Object.assign(container.userData, {
        object3D: container,
        toJSON: function toJSON() {
          return '---USERDATA---';
        },
        markup: rootMarkup
      });

      rootImage.parentMarkup = rootMarkup;

      var descriptorForChild = this.threeElementDescriptors[rootImage.elementType];
      descriptorForChild.setParent(rootImage.threeObject, rootMarkup.threeObject);

      // all objects now added can be marked as added to scene now!

      rootImage.threeObject.mountedIntoRoot();

      var firstChild = container.userData.markup.childrenMarkup[0];
      _React3ComponentTree2.default.precacheMarkup(instance, firstChild);

      if (process.env.NODE_ENV !== 'production') {
        var hostInstance = _React3ComponentTree2.default.getInstanceFromMarkup(firstChild);
        if (hostInstance._debugID !== 0) {
          _ReactInstrumentation2.default.debugTool.onHostOperation({
            instanceID: hostInstance._debugID,
            type: 'mount',
            payload: markup.toString()
          });
        }
      }
    }

    /**
     *
     * @param nextElement A react element
     * @param container A canvas or a THREE.js object
     * @param callback The callback function
     * @returns {*}
     */

  }, {
    key: 'render',
    value: function render(nextElement, container, callback) {
      return this._renderSubtreeIntoContainer(null, nextElement, container, callback);
    }
  }, {
    key: 'getHostRootInstanceInContainer',
    value: function getHostRootInstanceInContainer(container) {
      var rootMarkup = getReactRootMarkupInContainer(container);
      var prevHostInstance = rootMarkup && _React3ComponentTree2.default.getInstanceFromMarkup(rootMarkup);
      return prevHostInstance && !prevHostInstance._hostParent ? prevHostInstance : null;
    }
  }, {
    key: 'getTopLevelWrapperInContainer',
    value: function getTopLevelWrapperInContainer(container) {
      var root = this.getHostRootInstanceInContainer(container);
      if (root) {
        (0, _invariant2.default)(!!root._hostContainerInfo, 'Root should have native container info %s', ' but it does not');
      }
      return root ? root._hostContainerInfo._topLevelWrapper : null;
    }
  }, {
    key: '_renderSubtreeIntoContainer',
    value: function _renderSubtreeIntoContainer(parentComponent, nextElement, container, callback) {
      if (!_ReactElement2.default.isValidElement(nextElement)) {
        if (process.env.NODE_ENV !== 'production') {
          if (typeof nextElement === 'string') {
            (0, _invariant2.default)(false, 'React3Renderer.render(): Invalid component element.%s', ' Instead of passing an element string, make sure to instantiate ' + 'it by passing it to React.createElement.');
          } else if (typeof nextElement === 'function') {
            (0, _invariant2.default)(false, 'React3Renderer.render(): Invalid component element.%s', ' Instead of passing a component class, make sure to instantiate ' + 'it by passing it to React.createElement.');
          } else if (nextElement !== null && nextElement.props !== undefined) {
            (0, _invariant2.default)(false, 'React3Renderer.render(): Invalid component element.%s', ' This may be caused by unintentionally loading two independent ' + 'copies of React.');
          } else {
            (0, _invariant2.default)(false, 'React3Renderer.render(): Invalid component element.');
          }
        } else {
          (0, _invariant2.default)(false);
        }
      }

      var nextWrappedElement = _ReactElement2.default.createElement(TopLevelWrapper, { child: nextElement });

      var nextContext = void 0;
      if (parentComponent) {
        var parentInst = _ReactInstanceMap2.default.get(parentComponent);
        nextContext = parentInst._processChildContext(parentInst._context);
      } else {
        nextContext = _emptyObject2.default;
      }

      var prevComponent = this.getTopLevelWrapperInContainer(container);

      if (prevComponent) {
        var prevWrappedElement = prevComponent._currentElement;
        var prevElement = prevWrappedElement.props.child;
        if ((0, _shouldUpdateReactComponent2.default)(prevElement, nextElement)) {
          var publicInst = prevComponent._renderedComponent.getPublicInstance();
          var updatedCallback = callback && function () {
            callback.call(publicInst);
          };

          this._updateRootComponent(prevComponent, nextWrappedElement, nextContext, container, updatedCallback);

          return publicInst;
        }

        this.unmountComponentAtNode(container);
      }

      // aka first child
      var reactRootMarkup = getReactRootMarkupInContainer(container);
      var containerHasReactMarkup = reactRootMarkup && !!internalGetID(reactRootMarkup);

      // containerHasNonRootReactChild not implemented

      var shouldReuseMarkup = containerHasReactMarkup && !prevComponent;

      var component = this._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, nextContext)._renderedComponent.getPublicInstance();

      if (callback) {
        callback.call(component);
      }

      return component;
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      var rootIds = Object.keys(this._instancesByReactRootID);

      for (var i = 0; i < rootIds.length; ++i) {
        this.unmountComponentAtNode(this._instancesByReactRootID[rootIds[i]].getHostMarkup().parentMarkup.threeObject);
      }

      delete this._instancesByReactRootID;
      if (process.env.NODE_ENV !== 'production') {
        delete this.rootMarkupsByReactRootID;
      }
      delete this._highlightElement;
      this.nextMountID = 1;
      this.nextReactRootIndex = 0;

      if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_REACT_ADDON_HOOKS === 'true') {
        if (this._devtoolsCallbackCleanup) {
          this._devtoolsCallbackCleanup();

          delete this._devtoolsCallbackCleanup;
        }

        if (this._rendererListenerCleanup) {
          this._rendererListenerCleanup();

          delete this._rendererListenerCleanup;
        }

        if (this._devToolsRendererDefinition) {
          if (this._agent) {
            this._agent.onUnmounted(this._devToolsRendererDefinition);
            this._agent.removeListener('highlight', this._onHighlightFromInspector);
            this._agent.removeListener('hideHighlight', this._onHideHighlightFromInspector);
          }

          if (this._reactDevtoolsRendererId) {
            delete __REACT_DEVTOOLS_GLOBAL_HOOK__._renderers[this._reactDevtoolsRendererId];
            delete this._reactDevtoolsRendererId;
          }

          delete this._devToolsRendererDefinition;
          delete this._agent;
        }

        delete this._onHighlightFromInspector;
        delete this._onHideHighlightFromInspector;
        delete this._hookAgent;
      }
    }
  }, {
    key: '_updateRootComponent',
    value: function _updateRootComponent(prevComponent, nextElement, nextContext, container, callback) {
      _ReactUpdateQueue2.default.enqueueElementInternal(prevComponent, nextElement, nextContext);
      if (callback) {
        _ReactUpdateQueue2.default.enqueueCallbackInternal(prevComponent, callback);
      }

      return prevComponent;
    }

    /**
     * True if the supplied DOM node has a direct React-rendered child that is
     * not a React root element. Useful for warning in `render`,
     * `unmountComponentAtNode`, etc.
     *
     * @param {?*} container The container.
     * @return {boolean} True if the DOM element contains a direct child that was
     * rendered by React but is not a root element.
     * @internal
     */

  }, {
    key: 'hasNonRootReactChild',
    value: function hasNonRootReactChild(container) {
      var rootMarkup = getReactRootMarkupInContainer(container);
      if (rootMarkup) {
        var inst = _React3ComponentTree2.default.getInstanceFromMarkup(rootMarkup);
        return !!(inst && inst._hostParent);
      }

      return false;
    }
  }, {
    key: 'unmountComponentAtNode',
    value: function unmountComponentAtNode(container) {
      // Various parts of our code (such as ReactCompositeComponent's
      // _renderValidatedComponent) assume that calls to render aren't nested;
      // verify that that's the case. (Strictly speaking, unmounting won't cause a
      // render but we still don't expect to be in a render call here.)

      if (process.env.NODE_ENV !== 'production') {
        (0, _warning2.default)(_ReactCurrentOwner2.default.current === null, 'unmountComponentAtNode(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from render ' + 'is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', _ReactCurrentOwner2.default.current && _ReactCurrentOwner2.default.current.getName() || 'ReactCompositeComponent');
      }

      var prevComponent = this.getTopLevelWrapperInContainer(container);
      if (!prevComponent) {
        // Check if the node being unmounted was rendered by React, but isn't a
        // root node.
        var containerHasNonRootReactChild = this.hasNonRootReactChild(container);

        // Check if the container itself is a React root node.
        var isContainerReactRoot = !!(container && container.userData && container.userData.markup && container.userData.markup[_idPropertyName2.default]);

        if (process.env.NODE_ENV !== 'production') {
          (0, _warning2.default)(!containerHasNonRootReactChild, 'unmountComponentAtNode(): The node you\'re attempting to unmount ' + 'was rendered by React and is not a top-level container. %s', isContainerReactRoot ? 'You may have accidentally passed in a React root node instead ' + 'of its container.' : 'Instead, have the parent component update its state and ' + 'rerender in order to remove this component.');
        }

        return false;
      }

      delete this._instancesByReactRootID[prevComponent._instance.rootID];

      _ReactUpdates2.default.batchedUpdates(unmountComponentFromNode, prevComponent, container, false);

      if (container && container.userData && container.userData._createdByReact3) {
        delete container.userData;
      }

      return true;
    }

    /**
     * @param {THREE.Object3D|HTMLCanvasElement} container THREE Object
     *   or HTML Canvas Element that may contain a React component.
     * @return {?string} A "reactRoot" ID, if a React component is rendered.
     */

  }, {
    key: 'getReactRootID',
    value: function getReactRootID(container) {
      var rootMarkup = getReactRootMarkupInContainer(container);
      return rootMarkup && this.getID(rootMarkup);
    }

    // see instantiateReactComponent.js
    /**
     * @see #instantiateReactComponent
     *
     * Cloned because it uses
     * @see InternalComponent
     *
     * @param _node ( from createElement )
     * @param {boolean} shouldHaveDebugID
     * @return {object} A new instance of the element's constructor.
     */

  }, {
    key: 'instantiateReactComponent',
    value: function instantiateReactComponent(_node, shouldHaveDebugID) {
      var instance = void 0;

      var node = _node;

      var isEmptyNode = node === null || node === false;

      if (isEmptyNode) {
        // Create an object3D node so that empty components can be added anywhere
        instance = new _InternalComponent2.default(_ReactElement2.default.createElement('object3D', {
          visible: false
        }), this);
        // original: instance = new ReactDOMEmptyComponent(this.instantiateReactComponent);
      } else if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object') {
        var _element = node;

        var type = _element.type;
        if (typeof type !== 'function' && typeof type !== 'string') {
          var info = '';
          if (process.env.NODE_ENV !== 'production') {
            if (type === undefined || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type !== null && Object.keys(type).length === 0) {
              info += ' You likely forgot to export your component from the file ' + 'it\'s defined in.';
            }
          }
          info += getDeclarationErrorAddendum(_element._owner);
          (0, _invariant2.default)(false, 'Element type is invalid: expected a string (for built-in components) ' + 'or a class/function (for composite components) but got: %s.%s', type === null || type === undefined ? type : typeof type === 'undefined' ? 'undefined' : _typeof(type), info);
        }

        // Special case string values
        if (typeof _element.type === 'string') {
          // original: instance = ReactHostComponent.createInternalComponent(element);
          instance = new _InternalComponent2.default(_element, this);
        } else if (isInternalComponentType(_element.type)) {
          // This is temporarily available for custom components that are not string
          // representations. I.e. ART. Once those are updated to use the string
          // representation, we can drop this code path.
          var Constructor = _element.type;

          instance = new Constructor(_element);

          // We renamed this. Allow the old name for compat. :(
          if (!instance.getHostNode) {
            instance.getHostNode = instance.getNativeNode;
          }
        } else {
          instance = new _React3CompositeComponentWrapper2.default(_element, this);
        }
      } else if (typeof node === 'string' || typeof node === 'number') {
        // TODO create instance for text
        if (process.env.NODE_ENV !== 'production') {
          (0, _invariant2.default)(false, 'Encountered invalid React node of type %s : %s', typeof node === 'undefined' ? 'undefined' : _typeof(node), node);
        } else {
          (0, _invariant2.default)(false);
        }
      } else if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(false, 'Encountered invalid React node of type %s', typeof element === 'undefined' ? 'undefined' : _typeof(element));
      } else {
        (0, _invariant2.default)(false);
      }

      if (process.env.NODE_ENV !== 'production') {
        (0, _warning2.default)(typeof instance.mountComponent === 'function' && typeof instance.receiveComponent === 'function' && typeof instance.getHostMarkup === 'function' && typeof instance.unmountComponent === 'function', 'Only React 3 Components can be mounted.');
      }

      // These two fields are used by the DOM and ART diffing algorithms
      // respectively. Instead of using expandos on components, we should be
      // storing the state needed by the diffing algorithms elsewhere.
      instance._mountIndex = 0;
      instance._mountImage = null;

      if (process.env.NODE_ENV !== 'production') {
        if (shouldHaveDebugID) {
          instance._debugID = 'r3r' + this._debugIdPrefix + '-' + this._nextDebugID++;
        } else {
          instance._debugID = 0;
        }
      }

      // Internal instances should fully constructed at this point, so they should
      // not get any new fields added to them at this point.
      if (process.env.NODE_ENV !== 'production') {
        if (Object.preventExtensions) {
          Object.preventExtensions(instance);
        }
      }

      return instance;
    }

    /**
     * @see ReactMount._renderNewRootComponent
     *
     * Cloned because it uses
     * @see React3Renderer.instantiateReactComponent
     *
     * @param nextElement
     * @param {THREE.Object3D | HTMLCanvasElement} container
     * @param shouldReuseMarkup
     * @param context
     * @returns {*}
     * @private
     */

  }, {
    key: '_renderNewRootComponent',
    value: function _renderNewRootComponent(nextElement, container, shouldReuseMarkup, context) {
      // Various parts of our code (such as ReactCompositeComponent's
      // _renderValidatedComponent) assume that calls to render aren't nested;
      // verify that that's the case.
      if (process.env.NODE_ENV !== 'production') {
        (0, _warning2.default)(_ReactCurrentOwner2.default.current === null, '_renderNewRootComponent(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from ' + 'render is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', _ReactCurrentOwner2.default.current && _ReactCurrentOwner2.default.current.getName() || 'ReactCompositeComponent');
      }

      var componentInstance = this.instantiateReactComponent(nextElement, false);

      if (!_ReactUpdates2.default.ReactReconcileTransaction) {
        // If the ReactReconcileTransaction has not been injected
        // let's just use the defaults from ReactMount.
        _ReactInjection2.default.Updates.injectReconcileTransaction(_ReactReconcileTransaction2.default);
        _ReactInjection2.default.Updates.injectBatchingStrategy(_ReactDefaultBatchingStrategy2.default);
      }

      var devToolRemoved = void 0;
      if (process.env.NODE_ENV !== 'production') {
        devToolRemoved = (0, _removeDevTool2.default)();
      }

      // The initial render is synchronous but any updates that happen during
      // rendering, in componentWillMount or componentDidMount, will be batched
      // according to the current batching strategy.

      _ReactUpdates2.default.batchedUpdates(this.batchedMountComponentIntoNode, componentInstance, container, shouldReuseMarkup, context);

      if (process.env.NODE_ENV !== 'production') {
        if (devToolRemoved) {
          _removeDevTool2.default.restore();
        }
      }

      var wrapperID = componentInstance._instance.rootID;
      this._instancesByReactRootID[wrapperID] = componentInstance;

      return componentInstance;
    }

    /**
     * Batched mount.
     *
     * @param {ReactComponent} componentInstance The instance to mount.
     * @param {*} container Container.
     * @param {boolean} shouldReuseMarkup If true, do not insert markup
     * @param {*} context que?
     */


    /**
     * @see #mountComponentIntoNode
     *
     * Mounts this component and inserts it into the DOM.
     *
     * @param {ReactComponent} wrapperInstance The instance to mount.
     * @param {*} container container to mount into.
     * @param {ReactReconcileTransaction} transaction
     * @param {boolean} shouldReuseMarkup If true, do not insert markup
     * @param {*} context
     */

  }, {
    key: 'createReactRootID',
    value: function createReactRootID() {
      return this.nextReactRootIndex++;
    }
  }, {
    key: 'getID',
    value: function getID(markup) {
      return internalGetID(markup);
    }
  }]);

  return React3Renderer;
}(), _class2.eventDispatcher = new _EventDispatcher2.default(), _temp2);


module.exports = React3Renderer;