import * as THREE from 'three';
import reactElementWrapper from 'react/lib/ReactElement';
import ReactCurrentOwner from 'react/lib/ReactCurrentOwner';
import ReactComponent from 'react/lib/ReactComponent';
import KeyEscapeUtils from 'react/lib/KeyEscapeUtils';

import emptyObject from 'fbjs/lib/emptyObject';
import invariant from 'fbjs/lib/invariant';
import warning from 'fbjs/lib/warning';

import ReactInstanceMap from 'react-dom/lib/ReactInstanceMap';
import ReactReconciler from 'react-dom/lib/ReactReconciler';
import ReactUpdates from 'react-dom/lib/ReactUpdates';
import ReactUpdateQueue from 'react-dom/lib/ReactUpdateQueue';
import ReactInjection from 'react-dom/lib/ReactInjection';
import ReactReconcileTransaction from 'react-dom/lib/ReactReconcileTransaction';
import ReactDefaultBatchingStrategy from 'react-dom/lib/ReactDefaultBatchingStrategy';
import traverseAllChildren from 'react-dom/lib/traverseAllChildren';
import getHostComponentFromComposite from 'react-dom/lib/getHostComponentFromComposite';
import shouldUpdateReactComponent from 'react-dom/lib/shouldUpdateReactComponent';
import ReactInstrumentation from 'react-dom/lib/ReactInstrumentation';

import react3ContainerInfo from './React3ContainerInfo';
import EventDispatcher from './utils/EventDispatcher';
import InternalComponent from './InternalComponent';
import React3ComponentTree from './React3ComponentTree';
import ElementDescriptorContainer from './ElementDescriptorContainer';
import React3CompositeComponentWrapper from './React3CompositeComponentWrapper';
import ID_PROPERTY_NAME from './utils/idPropertyName';
import removeDevTool from './utils/removeDevTool';

let getDeclarationErrorAddendum;
let staticDebugIdHack;
let ReactComponentTreeHook;

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

  getDeclarationErrorAddendum = (owner) => {
    if (owner) {
      const name = owner.getName();
      if (name) {
        return ` Check the render method of \`${name}\`.`;
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
    ReactInstrumentation.debugTool.onBeginFlush();
  }

  ReactReconciler.unmountComponent(instance, safely);

  if (process.env.NODE_ENV !== 'production') {
    ReactInstrumentation.debugTool.onEndFlush();
  }
}

/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */

class TopLevelWrapper extends ReactComponent {
  render() {
    return this.props.child;
  }

  static isReactComponent = {};

  static isReactTopLevelWrapper = true;
}

if (process.env.NODE_ENV !== 'production') {
  TopLevelWrapper.displayName = 'TopLevelWrapper';
}

function internalGetID(markup) {
  return (markup && markup[ID_PROPERTY_NAME]) || '';
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

  return (container.userData && container.userData.markup
    && container.userData.markup.childrenMarkup[0]) || null;
}

/**
 * Check if the type reference is a known internal type. I.e. not a user
 * provided composite type.
 *
 * @param {function} type
 * @return {boolean} Returns true if this is a valid internal type.
 */
function isInternalComponentType(type) {
  return typeof type === 'function'
    && typeof type.prototype !== 'undefined'
    && typeof type.prototype.mountComponent === 'function'
    && typeof type.prototype.receiveComponent === 'function';
}

class React3Renderer {
  // to be used by modules e.g. mouse input ( see examples )
  static eventDispatcher = new EventDispatcher();

  /**
   * Returns the THREE.js object rendered by this element.
   *
   * @param {React.Component|THREE.Object3D|HTMLCanvasElement} componentOrElement
   * @return {?THREE.Object3D} The root node of this element.
   */
  static findTHREEObject(componentOrElement) {
    if (process.env.NODE_ENV !== 'production') {
      const owner = ReactCurrentOwner.current;
      if (owner !== null) {
        if (process.env.NODE_ENV !== 'production') {
          warning(
            owner._warnedAboutRefsInRender,
            '%s is accessing findDOMNode inside its render(). ' +
            'render() should be a pure function of props and state. It should ' +
            'never access something that requires stale data from the previous ' +
            'render, such as refs. Move this logic to componentDidMount and ' +
            'componentDidUpdate instead.',
            owner.getName() || 'A component'
          );
        }
        owner._warnedAboutRefsInRender = true;
      }
    }

    if (componentOrElement === null) {
      return null;
    }

    if (componentOrElement instanceof THREE.Object3D ||
      componentOrElement instanceof HTMLCanvasElement) {
      return componentOrElement;
    }

    if (ReactInstanceMap.has(componentOrElement)) {
      let instance = ReactInstanceMap.get(componentOrElement);

      instance = getHostComponentFromComposite(instance);

      return instance ? React3ComponentTree.getMarkupFromInstance(instance).threeObject : null;
    }

    if (!(componentOrElement.render === null || typeof componentOrElement.render !== 'function')) {
      if (process.env.NODE_ENV !== 'production') {
        invariant(false, 'Component (with keys: %s) contains `render` method ' +
          'but is not mounted', Object.keys(componentOrElement));
      } else {
        invariant(false);
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      invariant(false,
        'Element appears to be neither ReactComponent, ' +
        'a THREE.js object, nor a HTMLCanvasElement (keys: %s)',
        Object.keys(componentOrElement));
    } else {
      invariant(false);
    }

    return null;
  }


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
  updateChildren(prevChildren,
                 nextChildren,
                 mountImages,
                 removedMarkups,
                 transaction,
                 hostParent,
                 hostContainerInfo,
                 context,
                 selfDebugID // 0 in production and for roots
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
      const nextChildrenKeys = Object.keys(nextChildren);

      for (let i = 0; i < nextChildrenKeys.length; ++i) {
        const childName = nextChildrenKeys[i];

        const prevChild = prevChildren && prevChildren[childName];
        const prevElement = prevChild && prevChild._currentElement;
        const nextElement = nextChildren[childName];
        if (prevChild !== null && prevChild !== undefined
          && shouldUpdateReactComponent(prevElement, nextElement)) {
          ReactReconciler.receiveComponent(
            prevChild, nextElement, transaction, context
          );

          if (prevChild._forceRemountOfComponent) {
            removedMarkups[childName] = prevChild.getHostMarkup();

            ReactReconciler.unmountComponent(prevChild, false);
            const nextChildInstance = this.instantiateReactComponent(nextElement, true);
            nextChildren[childName] = nextChildInstance;

            // Creating mount image now ensures refs are resolved in right order
            // (see https://github.com/facebook/react/pull/7101 for explanation).
            const nextChildMountImage = ReactReconciler.mountComponent(
              nextChildInstance,
              transaction,
              hostParent,
              hostContainerInfo,
              context,
              selfDebugID
            );

            mountImages.push(nextChildMountImage);
          } else {
            nextChildren[childName] = prevChild;
          }
        } else {
          if (prevChild) {
            removedMarkups[childName] = prevChild.getHostMarkup();

            ReactReconciler.unmountComponent(prevChild, false);
          }
          // The child must be instantiated before it's mounted.
          const nextChildInstance = this.instantiateReactComponent(nextElement, true);

          nextChildren[childName] = nextChildInstance;

          // Creating mount image now ensures refs are resolved in right order
          // (see https://github.com/facebook/react/pull/7101 for explanation).
          const nextChildMountImage = ReactReconciler.mountComponent(
            nextChildInstance,
            transaction,
            hostParent,
            hostContainerInfo,
            context,
            selfDebugID /* parentDebugID */
          );

          mountImages.push(nextChildMountImage);
        }
      }
    }

    if (prevChildren) {
      // Unmount children that are no longer present.
      const prevChildrenKeys = Object.keys(prevChildren);
      for (let i = 0; i < prevChildrenKeys.length; ++i) {
        const childName = prevChildrenKeys[i];

        if (!(nextChildren && nextChildren.hasOwnProperty(childName))) {
          const prevChild = prevChildren[childName];

          removedMarkups[childName] = prevChild.getHostMarkup();

          ReactReconciler.unmountComponent(prevChild, false);
        }
      }
    }

    return nextChildren;
  }

  getElementDescriptor(name) {
    return this.threeElementDescriptors[name];
  }

  constructor() {
    this._instancesByReactRootID = {};
    if (process.env.NODE_ENV !== 'production') {
      this.rootMarkupsByReactRootID = {};
    }
    this.nextMountID = 1;
    this.globalIdCounter = 1;
    this.nextReactRootIndex = 0;

    this.threeElementDescriptors = new ElementDescriptorContainer(this).descriptors;

    this._highlightElement = document.createElement('div');
    this._highlightCache = null;

    if (process.env.NODE_ENV !== 'production') {
      this._nextDebugID = 1;
      this._debugIdPrefix = staticDebugIdHack++;
    }

    if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_REACT_ADDON_HOOKS === 'true') {
      this._agent = null;

      this._onHideHighlightFromInspector = () => {
        if (this._highlightCache && this._highlightCache
            .threeObject.userData.react3internalComponent) {
          const internalComponent = this._highlightCache
            .threeObject.userData.react3internalComponent;

          internalComponent.hideHighlight();

          this._highlightCache = null;
        }
      };

      this._onHighlightFromInspector = (highlightInfo) => {
        if (highlightInfo.node === this._highlightElement) {
          if (this._highlightCache && this._highlightCache
              .threeObject.userData.react3internalComponent) {
            const internalComponent = this._highlightCache
              .threeObject.userData.react3internalComponent;

            internalComponent.highlightComponent();
          }
        }
      };

      this._hookAgent = (agent) => {
        this._agent = agent;

        // agent.on('startInspecting', (...args) => {
        //   console.log('start inspecting?', args);
        // });
        // agent.on('setSelection', (...args) => {
        //   console.log('set selection?', args);
        // });
        // agent.on('selected', (...args) => {
        //   console.log('selected?', args);
        // });
        agent.on('highlight', this._onHighlightFromInspector);
        agent.on('hideHighlight', this._onHideHighlightFromInspector);
        // agent.on('highlightMany', (...args) => {
        //   console.log('highlightMany?', args);
        // });
      };

      // Inject the runtime into a devtools global hook regardless of browser.
      // Allows for debugging when the hook is injected on the page.
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined'
        && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
        this._devToolsRendererDefinition = {
          ComponentTree: {
            getClosestInstanceFromNode(node) {
              return React3ComponentTree.getClosestInstanceFromMarkup(node);
            },
            getNodeFromInstance(instInput) {
              let inst = instInput;
              // inst is an internal instance (but could be a composite)
              while (inst._renderedComponent) {
                inst = inst._renderedComponent;
              }
              if (inst) {
                return React3ComponentTree.getMarkupFromInstance(inst);
              }

              return null;
            },
          },
          Mount: this,
          Reconciler: ReactReconciler,
          TextComponent: InternalComponent,
        };

        const rendererListener = (info) => {
          this._reactDevtoolsRendererId = info.id;
          this._rendererListenerCleanup();

          delete this._rendererListenerCleanup;
        };

        this._rendererListenerCleanup = __REACT_DEVTOOLS_GLOBAL_HOOK__
          .sub('renderer', rendererListener);
        __REACT_DEVTOOLS_GLOBAL_HOOK__.inject(this._devToolsRendererDefinition);

        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent !== 'undefined'
          && __REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent) {
          const agent = __REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent;
          this._hookAgent(agent);
        } else {
          this._devtoolsCallbackCleanup = __REACT_DEVTOOLS_GLOBAL_HOOK__
            .sub('react-devtools', (agent) => {
              this._devtoolsCallbackCleanup();

              this._hookAgent(agent);
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
  instantiateChild = (childInstances, child, name, selfDebugID) => {
    // We found a component instance.
    const keyUnique = (childInstances[name] === undefined);
    if (process.env.NODE_ENV !== 'production') {
      if (!keyUnique) {
        warning(
          false,
          'flattenChildren(...): Encountered two children with the same key, ' +
          '`%s`. Child keys must be unique; when two children share a key, only ' +
          'the first child will be used.%s',
          KeyEscapeUtils.unescape(name),
          ReactComponentTreeHook.getStackAddendumByID(selfDebugID)
        );
      }
    }

    if (child !== null && keyUnique) {
      childInstances[name] = this.instantiateReactComponent(child, true);
    }
  };

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
  instantiateChildren(nestedChildNodes,
                      transaction,
                      context,
                      selfDebugID // 0 in production and for roots
  ) {
    if (nestedChildNodes === null) {
      return null;
    }

    const childInstances = {};

    if (process.env.NODE_ENV !== 'production') {
      traverseAllChildren(
        nestedChildNodes,
        (childInsts, child, name) => this.instantiateChild(
          childInsts,
          child,
          name,
          selfDebugID
        ),
        childInstances
      );
    } else {
      traverseAllChildren(nestedChildNodes, this.instantiateChild, childInstances);
    }

    return childInstances;
  }

  containsChild(container, markup) {
    const childrenMarkup = container.userData.markup.childrenMarkup;
    for (let i = 0; i < childrenMarkup.length; i++) {
      if (childrenMarkup[i] === markup) {
        return true;
      }
    }

    return false;
  }

  // DO NOT RENAME
  // used by react devtools!
  findNodeHandle = (instance) => {
    const inst = React3ComponentTree.getRenderedHostOrTextFromComponent(instance);

    if (!inst || !inst._threeObject) {
      return null;
    }

    const markup = React3ComponentTree.getMarkupFromInstance(inst);

    this._highlightCache = markup;
    return this._highlightElement;
  };

  // used by react devtools
  nativeTagToRootNodeID = () => 0;
  hostTagToRootNodeID = () => 0;

  _mountImageIntoNode(markup,
                      container,
                      instance,
                      shouldReuseMarkup,
                      transaction) { // eslint-disable-line no-unused-vars
    // TODO try to do server-side rendering for THREE

    if (!container.userData) {
      // it has to be a HTMLCanvasElement I guess?
      invariant(container instanceof HTMLCanvasElement,
        'The root container can only be a THREE.js object ' +
        '(with an userData property) or HTMLCanvasElement.');
      container.userData = {
        _createdByReact3: true,
      };
    }

    const rootImage = markup;

    const rootMarkup = {
      threeObject: container,
      parentMarkup: null,
      childrenMarkup: [rootImage],
      toJSON: () => '---MARKUP---',
    };

    Object.assign(container.userData, {
      object3D: container,
      toJSON: () => '---USERDATA---',
      markup: rootMarkup,
    });

    rootImage.parentMarkup = rootMarkup;

    const descriptorForChild = this.threeElementDescriptors[rootImage.elementType];
    descriptorForChild.setParent(rootImage.threeObject, rootMarkup.threeObject);

    // all objects now added can be marked as added to scene now!

    rootImage.threeObject.mountedIntoRoot();

    const firstChild = container.userData.markup.childrenMarkup[0];
    React3ComponentTree.precacheMarkup(instance, firstChild);

    if (process.env.NODE_ENV !== 'production') {
      const hostInstance = React3ComponentTree.getInstanceFromMarkup(firstChild);
      if (hostInstance._debugID !== 0) {
        ReactInstrumentation.debugTool.onHostOperation({
          instanceID: hostInstance._debugID,
          type: 'mount',
          payload: markup.toString(),
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
  render(nextElement, container, callback) {
    return this._renderSubtreeIntoContainer(null, nextElement, container, callback);
  }

  getHostRootInstanceInContainer(container) {
    const rootMarkup = getReactRootMarkupInContainer(container);
    const prevHostInstance = rootMarkup && React3ComponentTree.getInstanceFromMarkup(rootMarkup);
    return prevHostInstance && !prevHostInstance._hostParent ? prevHostInstance : null;
  }

  getTopLevelWrapperInContainer(container) {
    const root = this.getHostRootInstanceInContainer(container);
    if (root) {
      invariant(!!root._hostContainerInfo, 'Root should have native container info %s',
        ' but it does not');
    }
    return root ? root._hostContainerInfo._topLevelWrapper : null;
  }

  _renderSubtreeIntoContainer(parentComponent, nextElement, container, callback) {
    if (!reactElementWrapper.isValidElement(nextElement)) {
      if (process.env.NODE_ENV !== 'production') {
        if (typeof nextElement === 'string') {
          invariant(false, 'React3Renderer.render(): Invalid component element.%s',
            ' Instead of passing an element string, make sure to instantiate ' +
            'it by passing it to React.createElement.');
        } else if (typeof nextElement === 'function') {
          invariant(false, 'React3Renderer.render(): Invalid component element.%s',
            ' Instead of passing a component class, make sure to instantiate ' +
            'it by passing it to React.createElement.');
        } else if (nextElement !== null && nextElement.props !== undefined) {
          invariant(false, 'React3Renderer.render(): Invalid component element.%s',
            ' This may be caused by unintentionally loading two independent ' +
            'copies of React.');
        } else {
          invariant(false, 'React3Renderer.render(): Invalid component element.');
        }
      } else {
        invariant(false);
      }
    }

    const nextWrappedElement = reactElementWrapper.createElement(
      TopLevelWrapper,
      { child: nextElement }
    );

    let nextContext;
    if (parentComponent) {
      const parentInst = ReactInstanceMap.get(parentComponent);
      nextContext = parentInst._processChildContext(parentInst._context);
    } else {
      nextContext = emptyObject;
    }

    const prevComponent = this.getTopLevelWrapperInContainer(container);

    if (prevComponent) {
      const prevWrappedElement = prevComponent._currentElement;
      const prevElement = prevWrappedElement.props.child;
      if (shouldUpdateReactComponent(prevElement, nextElement)) {
        const publicInst = prevComponent._renderedComponent.getPublicInstance();
        const updatedCallback = callback &&
          (() => {
            callback.call(publicInst);
          });

        this._updateRootComponent(prevComponent,
          nextWrappedElement,
          nextContext,
          container,
          updatedCallback);

        return publicInst;
      }

      this.unmountComponentAtNode(container);
    }

    // aka first child
    const reactRootMarkup = getReactRootMarkupInContainer(container);
    const containerHasReactMarkup = reactRootMarkup && !!internalGetID(reactRootMarkup);

    // containerHasNonRootReactChild not implemented

    const shouldReuseMarkup = containerHasReactMarkup && !prevComponent;

    const component = this._renderNewRootComponent(
      nextWrappedElement,
      container,
      shouldReuseMarkup,
      nextContext
    )._renderedComponent.getPublicInstance();

    if (callback) {
      callback.call(component);
    }

    return component;
  }

  dispose() {
    const rootIds = Object.keys(this._instancesByReactRootID);

    for (let i = 0; i < rootIds.length; ++i) {
      this.unmountComponentAtNode(this._instancesByReactRootID[rootIds[i]]
        .getHostMarkup()
        .parentMarkup
        .threeObject);
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

  _updateRootComponent(prevComponent, nextElement, nextContext, container, callback) {
    ReactUpdateQueue.enqueueElementInternal(prevComponent, nextElement, nextContext);
    if (callback) {
      ReactUpdateQueue.enqueueCallbackInternal(prevComponent, callback);
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
  hasNonRootReactChild(container) {
    const rootMarkup = getReactRootMarkupInContainer(container);
    if (rootMarkup) {
      const inst = React3ComponentTree.getInstanceFromMarkup(rootMarkup);
      return !!(inst && inst._hostParent);
    }

    return false;
  }

  unmountComponentAtNode(container) {
    // Various parts of our code (such as ReactCompositeComponent's
    // _renderValidatedComponent) assume that calls to render aren't nested;
    // verify that that's the case. (Strictly speaking, unmounting won't cause a
    // render but we still don't expect to be in a render call here.)

    if (process.env.NODE_ENV !== 'production') {
      warning(
        ReactCurrentOwner.current === null,
        'unmountComponentAtNode(): Render methods should be a pure function ' +
        'of props and state; triggering nested component updates from render ' +
        'is not allowed. If necessary, trigger nested updates in ' +
        'componentDidUpdate. Check the render method of %s.',
        (ReactCurrentOwner.current && ReactCurrentOwner.current.getName()) ||
        'ReactCompositeComponent'
      );
    }

    const prevComponent = this.getTopLevelWrapperInContainer(container);
    if (!prevComponent) {
      // Check if the node being unmounted was rendered by React, but isn't a
      // root node.
      const containerHasNonRootReactChild = this.hasNonRootReactChild(container);

      // Check if the container itself is a React root node.
      const isContainerReactRoot = !!(
        container
        && container.userData
        && container.userData.markup
        && container.userData.markup[ID_PROPERTY_NAME]
      );

      if (process.env.NODE_ENV !== 'production') {
        warning(
          !containerHasNonRootReactChild,
          'unmountComponentAtNode(): The node you\'re attempting to unmount ' +
          'was rendered by React and is not a top-level container. %s',
          (
            isContainerReactRoot ?
            'You may have accidentally passed in a React root node instead ' +
            'of its container.' :
            'Instead, have the parent component update its state and ' +
            'rerender in order to remove this component.'
          )
        );
      }

      return false;
    }

    delete this._instancesByReactRootID[prevComponent._instance.rootID];

    ReactUpdates.batchedUpdates(
      unmountComponentFromNode,
      prevComponent,
      container,
      false
    );

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
  getReactRootID(container) {
    const rootMarkup = getReactRootMarkupInContainer(container);
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
  instantiateReactComponent(_node, shouldHaveDebugID) {
    let instance;

    const node = _node;

    const isEmptyNode = (node === null || node === false);

    if (isEmptyNode) {
      // Create an object3D node so that empty components can be added anywhere
      instance = new InternalComponent(
        reactElementWrapper.createElement('object3D', {
          visible: false,
        }), this);
      // original: instance = new ReactDOMEmptyComponent(this.instantiateReactComponent);
    } else if (typeof node === 'object') {
      const element = node;

      if (!(element && (typeof element.type === 'function'
        || typeof element.type === 'string'))) {
        if (process.env.NODE_ENV !== 'production') {
          if (element.type == null) {
            invariant(false, 'Element type is invalid:' +
              ' expected a string (for built-in components)' +
              ' or a class/function (for composite components)' +
              ' but got: %s.%s', element.type, getDeclarationErrorAddendum(element._owner));
          } else {
            invariant(false, 'Element type is invalid:' +
              ' expected a string (for built-in components)' +
              ' or a class/function (for composite components)' +
              ' but got: %s.%s', typeof element.type, getDeclarationErrorAddendum(element._owner));
          }
        } else if (element.type == null) {
          invariant(element.type, getDeclarationErrorAddendum(element._owner));
        } else {
          invariant(typeof element.type, getDeclarationErrorAddendum(element._owner));
        }
      }

      // Special case string values
      if (typeof element.type === 'string') {
        // original: instance = ReactHostComponent.createInternalComponent(element);
        instance = new InternalComponent(element, this);
      } else if (isInternalComponentType(element.type)) {
        // This is temporarily available for custom components that are not string
        // representations. I.e. ART. Once those are updated to use the string
        // representation, we can drop this code path.
        const Constructor = element.type;

        instance = new Constructor(element);

        // We renamed this. Allow the old name for compat. :(
        if (!instance.getHostNode) {
          instance.getHostNode = instance.getNativeNode;
        }
      } else {
        instance = new React3CompositeComponentWrapper(element, this);
      }
    } else if (typeof node === 'string'
      || typeof node === 'number') {
      // TODO create instance for text
      if (process.env.NODE_ENV !== 'production') {
        invariant(false, 'Encountered invalid React node of type %s : %s',
          typeof node, node);
      } else {
        invariant(false);
      }
    } else if (process.env.NODE_ENV !== 'production') {
      invariant(false, 'Encountered invalid React node of type %s', typeof element);
    } else {
      invariant(false);
    }

    if (process.env.NODE_ENV !== 'production') {
      warning(
        typeof instance.mountComponent === 'function' &&
        typeof instance.receiveComponent === 'function' &&
        typeof instance.getHostMarkup === 'function' &&
        typeof instance.unmountComponent === 'function',
        'Only React 3 Components can be mounted.'
      );
    }

    // These two fields are used by the DOM and ART diffing algorithms
    // respectively. Instead of using expandos on components, we should be
    // storing the state needed by the diffing algorithms elsewhere.
    instance._mountIndex = 0;
    instance._mountImage = null;

    if (process.env.NODE_ENV !== 'production') {
      if (shouldHaveDebugID) {
        const debugID = `r3r${this._debugIdPrefix}-${this._nextDebugID++}`;
        instance._debugID = debugID;
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
  _renderNewRootComponent(nextElement, container, shouldReuseMarkup, context) {
    // Various parts of our code (such as ReactCompositeComponent's
    // _renderValidatedComponent) assume that calls to render aren't nested;
    // verify that that's the case.
    if (process.env.NODE_ENV !== 'production') {
      warning(ReactCurrentOwner.current === null,
        '_renderNewRootComponent(): Render methods should be a pure function ' +
        'of props and state; triggering nested component updates from ' +
        'render is not allowed. If necessary, trigger nested updates in ' +
        'componentDidUpdate. Check the render method of %s.',
        (ReactCurrentOwner.current &&
        ReactCurrentOwner.current.getName())
        || 'ReactCompositeComponent');
    }

    const componentInstance = this.instantiateReactComponent(nextElement, false);

    if (!ReactUpdates.ReactReconcileTransaction) {
      // If the ReactReconcileTransaction has not been injected
      // let's just use the defaults from ReactMount.
      ReactInjection.Updates.injectReconcileTransaction(ReactReconcileTransaction);
      ReactInjection.Updates.injectBatchingStrategy(ReactDefaultBatchingStrategy);
    }

    let devToolRemoved;
    if (process.env.NODE_ENV !== 'production') {
      devToolRemoved = removeDevTool();
    }

    // The initial render is synchronous but any updates that happen during
    // rendering, in componentWillMount or componentDidMount, will be batched
    // according to the current batching strategy.

    ReactUpdates.batchedUpdates(
      this.batchedMountComponentIntoNode,
      componentInstance,
      container,
      shouldReuseMarkup,
      context
    );

    if (process.env.NODE_ENV !== 'production') {
      if (devToolRemoved) {
        removeDevTool.restore();
      }
    }

    const wrapperID = componentInstance._instance.rootID;
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
  batchedMountComponentIntoNode = (componentInstance,
                                   container,
                                   shouldReuseMarkup,
                                   context) => {
    const transaction = ReactUpdates.ReactReconcileTransaction.getPooled(
      !shouldReuseMarkup
    );
    transaction.perform(
      this.mountComponentIntoNode,
      null,
      componentInstance,
      container,
      transaction,
      shouldReuseMarkup,
      context
    );
    ReactUpdates.ReactReconcileTransaction.release(transaction);
  };

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
  mountComponentIntoNode = (wrapperInstance,
                            container,
                            transaction,
                            shouldReuseMarkup,
                            context) => {
    const markup = ReactReconciler.mountComponent(
      wrapperInstance,
      transaction,
      null,
      react3ContainerInfo(wrapperInstance, container),
      context,
      0 /* parentDebugID */
    );

    wrapperInstance._renderedComponent._topLevelWrapper = wrapperInstance;
    this._mountImageIntoNode(
      markup,
      container,
      wrapperInstance,
      shouldReuseMarkup,
      transaction
    );
  };

  createReactRootID() {
    return this.nextReactRootIndex++;
  }

  getID(markup) {
    return internalGetID(markup);
  }
}


module.exports = React3Renderer;
