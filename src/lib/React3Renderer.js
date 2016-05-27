import THREE from 'three';
import reactElementWrapper from 'react/lib/ReactElement';
import ReactInstanceMap from 'react/lib/ReactInstanceMap';
import ReactInstanceHandles from 'react/lib/ReactInstanceHandles';
import ReactReconciler from 'react/lib/ReactReconciler';
import ReactUpdates from 'react/lib/ReactUpdates';
import ReactCurrentOwner from 'react/lib/ReactCurrentOwner';
import ReactUpdateQueue from 'react/lib/ReactUpdateQueue';
import ReactComponent from 'react/lib/ReactComponent';
import ReactInjection from 'react/lib/ReactInjection';
import ReactReconcileTransaction from 'react/lib/ReactReconcileTransaction';
import ReactDefaultBatchingStrategy from 'react/lib/ReactDefaultBatchingStrategy';
import KeyEscapeUtils from 'react/lib/KeyEscapeUtils';
import traverseAllChildren from 'react/lib/traverseAllChildren';
import getNativeComponentFromComposite from 'react/lib/getNativeComponentFromComposite';
import shouldUpdateReactComponent from 'react/lib/shouldUpdateReactComponent';
import ReactInstrumentation from 'react/lib/ReactInstrumentation';
import emptyObject from 'fbjs/lib/emptyObject';
import invariant from 'fbjs/lib/invariant';
import warning from 'fbjs/lib/warning';
import react3ContainerInfo from './React3ContainerInfo';
import EventDispatcher from './utils/EventDispatcher';
import InternalComponent from './InternalComponent';
import React3ComponentTree from './React3ComponentTree';
import ElementDescriptorContainer from './ElementDescriptorContainer';
import React3CompositeComponentWrapper from './React3CompositeComponentWrapper';
import ID_PROPERTY_NAME from './utils/idPropertyName';

let getDeclarationErrorAddendum;
let getDisplayName;

if (process.env.NODE_ENV !== 'production') {
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

  getDisplayName = (instance) => {
    const element = instance._currentElement;
    if (element == null) {
      return '#empty';
    } else if (typeof element === 'string' || typeof element === 'number') {
      return '#text';
    } else if (typeof element.type === 'string') {
      return element.type;
    } else if (instance.getName) {
      return instance.getName() || 'Unknown';
    }

    return element.type.displayName || element.type.name || 'Unknown';
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
  ReactReconciler.unmountComponent(instance, safely);
}

/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */

class TopLevelWrapper extends ReactComponent {
  render() {
    // this.props is actually a ReactElement
    return this.props;
  }

  static isReactComponent = {};
}

if (process.env.NODE_ENV !== 'production') {
  TopLevelWrapper.displayName = 'TopLevelWrapper';
}

function internalGetID(markup) {
  return markup && markup[ID_PROPERTY_NAME] || '';
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

  return container.userData && container.userData.markup
    && container.userData.markup.childrenMarkup[0] || null;
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

      instance = getNativeComponentFromComposite(instance);

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
   * Updates the rendered children and returns a new set of children.
   *
   * @param {?object} prevChildren Previously initialized set of children.
   * @param {?object} nextChildren Flat child element maps.
   * @param {?object} removedMarkups The map for removed nodes.
   * @param {ReactReconcileTransaction} transaction
   * @param {object} context
   * @return {?object} A new set of child instances.
   * @internal
   */
  updateChildren(prevChildren,
                 nextChildren,
                 removedMarkups,
                 transaction,
                 context) {
    // We currently don't have a way to track moves here but if we use iterators
    // instead of for..in we can zip the iterators and check if an item has
    // moved.
    // TODO: If nothing has changed, return the prevChildren object so that we
    // can quickly bailout.
    if (!nextChildren && !prevChildren) {
      return null;
    }

    if (!!nextChildren) {
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
            removedMarkups[childName] = prevChild.getNativeMarkup();

            ReactReconciler.unmountComponent(prevChild, false);
            nextChildren[childName] = this.instantiateReactComponent(nextElement);
          } else {
            nextChildren[childName] = prevChild;
          }
        } else {
          if (prevChild) {
            removedMarkups[childName] = prevChild.getNativeMarkup();

            ReactReconciler.unmountComponent(prevChild, false);
          }
          // The child must be instantiated before it's mounted.
          nextChildren[childName] = this.instantiateReactComponent(nextElement);
        }
      }
    }

    if (!!prevChildren) {
      // Unmount children that are no longer present.
      const prevChildrenKeys = Object.keys(prevChildren);
      for (let i = 0; i < prevChildrenKeys.length; ++i) {
        const childName = prevChildrenKeys[i];

        if (!(nextChildren && nextChildren.hasOwnProperty(childName))) {
          const prevChild = prevChildren[childName];

          removedMarkups[childName] = prevChild.getNativeMarkup();

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

    this._nextDebugID = 1;

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
          CurrentOwner: ReactCurrentOwner,
          InstanceHandles: ReactInstanceHandles,
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

  instantiateChild = (childInstances, child, name) => {
    // We found a component instance.
    const keyUnique = childInstances[name] === undefined;
    if (process.env.NODE_ENV !== 'production') {
      warning(keyUnique,
        'flattenChildren(...): Encountered two children with the same key, '
        + '`%s`. Child keys must be unique; when two children share a key, only '
        + 'the first child will be used.', KeyEscapeUtils.unescape(name));
    }
    if (child !== null && keyUnique) {
      childInstances[name] = this.instantiateReactComponent(child, null);
    }
  };

  instantiateChildren(nestedChildNodes) {
    if (nestedChildNodes === null) {
      return null;
    }

    const childInstances = {};

    traverseAllChildren(nestedChildNodes, this.instantiateChild, childInstances);

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
    const inst = React3ComponentTree.getRenderedNativeOrTextFromComponent(instance);

    if (!inst || !inst._threeObject) {
      return null;
    }

    const markup = React3ComponentTree.getMarkupFromInstance(inst);

    this._highlightCache = markup;
    return this._highlightElement;
  };

  // used by react devtools
  nativeTagToRootNodeID = () => null;

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

    const nativeInstance = React3ComponentTree.getInstanceFromMarkup(firstChild);
    if (nativeInstance._debugID !== 0) {
      ReactInstrumentation.debugTool.onNativeOperation(
        nativeInstance._debugID,
        'mount',
        markup.toString()
      );
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

  getNativeRootInstanceInContainer(container) {
    const rootMarkup = getReactRootMarkupInContainer(container);
    const prevNativeInstance = rootMarkup && React3ComponentTree.getInstanceFromMarkup(rootMarkup);
    return prevNativeInstance && !prevNativeInstance._nativeParent ? prevNativeInstance : null;
  }

  getTopLevelWrapperInContainer(container) {
    const root = this.getNativeRootInstanceInContainer(container);
    if (root) {
      invariant(!!root._nativeContainerInfo, 'Root should have native container info %s',
        ' but it does not');
    }
    return root ? root._nativeContainerInfo._topLevelWrapper : null;
  }

  _renderSubtreeIntoContainer(parentComponent, nextElement, container, callback) {
    if (!reactElementWrapper.isValidElement(nextElement)) {
      if (process.env.NODE_ENV !== 'production') {
        if (typeof nextElement === 'string') {
          invariant(false, 'React3Renderer.render(): Invalid component element.%s',
            ' Instead of passing an element string, make sure to instantiate ' +
            'it by passing it to React.createElement.');
        } else {
          if (typeof nextElement === 'function') {
            invariant(false, 'React3Renderer.render(): Invalid component element.%s',
              ' Instead of passing a component class, make sure to instantiate ' +
              'it by passing it to React.createElement.');
          } else {
            if (nextElement !== null && nextElement.props !== undefined) {
              invariant(false, 'React3Renderer.render(): Invalid component element.%s',
                ' This may be caused by unintentionally loading two independent ' +
                'copies of React.');
            } else {
              invariant(false, 'React3Renderer.render(): Invalid component element.');
            }
          }
        }
      } else {
        invariant(false);
      }
    }

    const nextWrappedElement = reactElementWrapper(TopLevelWrapper,
      null, null, null, null, null, nextElement);

    const prevComponent = this.getTopLevelWrapperInContainer(container);

    if (prevComponent) {
      const prevWrappedElement = prevComponent._currentElement;
      const prevElement = prevWrappedElement.props;
      if (shouldUpdateReactComponent(prevElement, nextElement)) {
        const publicInst = prevComponent._renderedComponent.getPublicInstance();
        const updatedCallback = callback &&
          (() => {
            callback.call(publicInst);
          });

        this._updateRootComponent(prevComponent, nextWrappedElement, container, updatedCallback);

        return publicInst;
      }

      this.unmountComponentAtNode(container);
    }

    // aka first child
    const reactRootMarkup = getReactRootMarkupInContainer(container);
    const containerHasReactMarkup = reactRootMarkup && !!internalGetID(reactRootMarkup);

    // containerHasNonRootReactChild not implemented

    const shouldReuseMarkup = containerHasReactMarkup && !prevComponent;

    let component;
    if (parentComponent === null) {
      // no context
      component = this._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup,
        emptyObject
      )._renderedComponent.getPublicInstance();
    } else {
      // yes context
      component = this._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup,
        parentComponent._reactInternalInstance
          ._processChildContext(parentComponent
            ._reactInternalInstance._context)
      )._renderedComponent.getPublicInstance();
    }

    if (callback) {
      callback.call(component);
    }

    return component;
  }

  dispose() {
    const rootIds = Object.keys(this._instancesByReactRootID);

    for (let i = 0; i < rootIds.length; ++i) {
      this.unmountComponentAtNode(this._instancesByReactRootID[rootIds[i]]
        .getNativeMarkup()
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

  _updateRootComponent(prevComponent, nextElement, container, callback) {
    ReactUpdateQueue.enqueueElementInternal(prevComponent, nextElement);
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
      return !!(inst && inst._nativeParent);
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
        ReactCurrentOwner.current && ReactCurrentOwner.current.getName() ||
        'ReactCompositeComponent'
      );
    }

    const prevComponent = this.getTopLevelWrapperInContainer(container);
    if (!prevComponent) {
      // Check if the node being unmounted was rendered by React, but isn't a
      // root node.
      const containerHasNonRootReactChild = this.hasNonRootReactChild(container);

      // Check if the container itself is a React root node.
      const isContainerReactRoot = container && container.userData && container.userData.markup &&
        container.userData.markup[ID_PROPERTY_NAME];

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
   *
   * @param element ( from createElement )
   * @returns {*}
   */
  instantiateReactComponent(element) {
    let instance;

    let elementToInstantiate = element;

    const isEmpty = elementToInstantiate === null || elementToInstantiate === false;
    if (isEmpty) {
      elementToInstantiate = reactElementWrapper.createElement('object3D');
      // instance = new ReactDOMEmptyComponent(this.instantiateReactComponent);
    }

    if (typeof elementToInstantiate === 'object') {
      if (!(elementToInstantiate && (typeof elementToInstantiate.type === 'function'
        || typeof elementToInstantiate.type === 'string'))) {
        if (process.env.NODE_ENV !== 'production') {
          invariant(false,
            'Element type is invalid: expected a string (for built-in components) ' +
            'or a class/function (for composite components) but got: %s.%s',
            (!elementToInstantiate.type) ?
              elementToInstantiate.type
              : typeof elementToInstantiate.type,
            getDeclarationErrorAddendum(elementToInstantiate._owner));
        } else {
          invariant(false);
        }
      }

      // Special case string values
      if (typeof elementToInstantiate.type === 'string') {
// original: instance = ReactNativeComponent.createInternalComponent(elementToInstantiate);
        instance = new InternalComponent(elementToInstantiate, this);
      } else if (isInternalComponentType(elementToInstantiate.type)) {
        // This is temporarily available for custom components that are not string
        // representations. I.e. ART. Once those are updated to use the string
        // representation, we can drop this code path.
        const Constructor = elementToInstantiate.type;

        instance = new Constructor(elementToInstantiate);
      } else {
        instance = new React3CompositeComponentWrapper(elementToInstantiate, this);
      }
    } else if (typeof elementToInstantiate === 'string'
      || typeof elementToInstantiate === 'number') {
      // TODO create instance for text
      if (process.env.NODE_ENV !== 'production') {
        invariant(false, 'Encountered invalid React node of type %s : %s',
          typeof elementToInstantiate, elementToInstantiate);
      } else {
        invariant(false);
      }
    } else {
      if (process.env.NODE_ENV !== 'production') {
        invariant(false, 'Encountered invalid React node of type %s', typeof elementToInstantiate);
      } else {
        invariant(false);
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      warning(
        typeof instance.mountComponent === 'function' &&
        typeof instance.receiveComponent === 'function' &&
        typeof instance.getNativeMarkup === 'function' &&
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
      instance._isOwnerNecessary = false;
      instance._warnedAboutRefsInRender = false;
    }

    if (process.env.NODE_ENV !== 'production') {
      const debugID = isEmpty ? 0 : this._nextDebugID++;
      instance._debugID = debugID;

      if (debugID !== 0) {
        const displayName = getDisplayName(instance);
        ReactInstrumentation.debugTool.onSetDisplayName(debugID, displayName);
        const owner = elementToInstantiate && elementToInstantiate._owner;
        if (owner) {
          ReactInstrumentation.debugTool.onSetOwner(debugID, owner._debugID);
        }
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
   *
   * @param nextElement
   * @param {THREE.Object3D | HTMLCanvasElement} container
   * @param shouldReuseMarkup
   * @param context
   * @returns {*}
   * @private
   */
  _renderNewRootComponent(nextElement, container, shouldReuseMarkup, context) {
    if (process.env.NODE_ENV !== 'production') {
      ReactInstrumentation.debugTool.onBeginFlush();
    }

    // Various parts of our code (such as ReactCompositeComponent's
    // _renderValidatedComponent) assume that calls to render aren't nested;
    // verify that that's the case.
    if (process.env.NODE_ENV !== 'production') {
      warning(ReactCurrentOwner.current === null,
        '_renderNewRootComponent(): Render methods should be a pure function ' +
        'of props and state; triggering nested component updates from ' +
        'render is not allowed. If necessary, trigger nested updates in ' +
        'componentDidUpdate. Check the render method of %s.',
        ReactCurrentOwner.current &&
        ReactCurrentOwner.current.getName()
        || 'ReactCompositeComponent');
    }

    const componentInstance = this.instantiateReactComponent(nextElement);

    if (process.env.NODE_ENV !== 'production') {
      // Mute future events from the top level wrapper.
      // It is an implementation detail that devtools should not know about.
      componentInstance._debugID = 0;
    }

    // The initial render is synchronous but any updates that happen during
    // rendering, in componentWillMount or componentDidMount, will be batched
    // according to the current batching strategy.

    if (!ReactUpdates.ReactReconcileTransaction) {
      // If the ReactReconcileTransaction has not been injected
      // let's just use the defaults from ReactMount.
      ReactInjection.Updates.injectReconcileTransaction(ReactReconcileTransaction);
      ReactInjection.Updates.injectBatchingStrategy(ReactDefaultBatchingStrategy);
    }

    ReactUpdates.batchedUpdates(
      this.batchedMountComponentIntoNode,
      componentInstance,
      container,
      shouldReuseMarkup,
      context
    );

    const wrapperID = componentInstance._instance.rootID = this.createReactRootID();
    this._instancesByReactRootID[wrapperID] = componentInstance;

    if (process.env.NODE_ENV !== 'production') {
      const reactRootID = 0;
      // Record the root element in case it later gets transplanted.
      this.rootMarkupsByReactRootID[reactRootID] = getReactRootMarkupInContainer(container);

      // The instance here is TopLevelWrapper so we report mount for its child.
      ReactInstrumentation.debugTool.onMountRootComponent(
        componentInstance._renderedComponent._debugID
      );
      ReactInstrumentation.debugTool.onEndFlush();
    }

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
      context
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
