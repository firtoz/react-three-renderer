import DOMProperty from 'react/lib/DOMProperty';
import ReactEmptyComponent from 'react/lib/ReactEmptyComponent';
import ReactElement from 'react/lib/ReactElement';
import ReactInstanceMap from 'react/lib/ReactInstanceMap';
import ReactEmptyComponentRegistry from 'react/lib/ReactEmptyComponentRegistry';
import ReactInstanceHandles from 'react/lib/ReactInstanceHandles';
import ReactReconciler from 'react/lib/ReactReconciler';
import ReactUpdates from 'react/lib/ReactUpdates';
import ReactCurrentOwner from 'react/lib/ReactCurrentOwner';
import ReactUpdateQueue from 'react/lib/ReactUpdateQueue';
import ReactComponent from 'react/lib/ReactComponent';
import emptyObject from 'fbjs/lib/emptyObject';
import invariant from 'fbjs/lib/invariant';
import warning from 'fbjs/lib/warning';
import traverseAllChildren from 'react/lib/traverseAllChildren';
import shouldUpdateReactComponent from 'react/lib/shouldUpdateReactComponent';
import React3DInstance from './React3Instance';
import EventDispatcher from './utils/EventDispatcher';

import InternalComponent from './InternalComponent';
import ElementDescriptorContainer from './ElementDescriptorContainer';

import React3CompositeComponentWrapper from './React3CompositeComponentWrapper';

import THREE from 'three.js';

const SEPARATOR = ReactInstanceHandles.SEPARATOR;

if (process.env.NODE_ENV !== 'production') {
  // prop type helpers
  if (!THREE._renamed) {
    THREE._renamed = true;

    THREE.Vector2 = class Vector2 extends THREE.Vector2 {
    };
    THREE.Vector3 = class Vector3 extends THREE.Vector3 {
    };
    THREE.Quaternion = class Quaternion extends THREE.Quaternion {
    };
    THREE.Color = class Color extends THREE.Color {
    };
    THREE.Euler = class Euler extends THREE.Euler {
    };
    THREE.Fog = class Fog extends THREE.Fog {
    };
  }
}

/**
 * @namespace process.env
 * @type string
 * @name process.env.NODE_ENV
 */
class TopLevelWrapper extends ReactComponent {
  render() {
    return this.props;
  }

  static isReactClass = {};
  static displayName = 'TopLevelWrapper';
}

function unmountComponentInternal(instance) {
  ReactReconciler.unmountComponent(instance);
}

const ID_ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;

function internalGetID(userData) {
  return userData && userData[ID_ATTR_NAME] || '';
  // If userData is something like a window, document, or text userData, none of
  // which support attributes or a .getAttribute method, gracefully return
  // the empty string, as if the attribute were missing.
  // return userData && userData.getAttribute && userData.getAttribute(ID_ATTR_NAME) || '';
}


/**
 * @param {THREE.Object3D} threeObject Object3D that may contain
 * a React component
 * @return {?*} Userdata that may have the reactRoot ID, or null.
 */
function getReactRootUserDataInObject3D(threeObject) {
  if (!threeObject) {
    return null;
  }

  return threeObject.userData && threeObject.userData.childrenMarkup && threeObject.userData.childrenMarkup[0] || null;
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

/**
 * @global
 * @var __REACT_DEVTOOLS_GLOBAL_HOOK__
 */

class React3Renderer {
  static eventDispatcher = new EventDispatcher();

  /**
   * Returns the DOM node rendered by this element.
   *
   * @param {React.Component|THREE.Object3D} componentOrElement
   * @return {?THREE.Object3D} The root node of this element.
   */
  static findTHREEObject(componentOrElement) {
    if (process.env.NODE_ENV !== 'production') {
      const owner = ReactCurrentOwner.current;
      if (owner !== null) {
        if (process.env.NODE_ENV !== 'production') {
          warning(owner._warnedAboutRefsInRender, '%s is accessing getDOMNode or findDOMNode inside its render(). ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', owner.getName() || 'A component');
        }
        owner._warnedAboutRefsInRender = true;
      }
    }

    if (componentOrElement === null) {
      return null;
    }

    if (componentOrElement instanceof THREE.Object3D) {
      return componentOrElement;
    }

    if (ReactInstanceMap.has(componentOrElement)) {
      const instance = ReactInstanceMap.get(componentOrElement);

      return instance._react3RendererInstance.getUserDataFromInstance(componentOrElement).object3D;
    }

    if (!(componentOrElement.render === null || typeof componentOrElement.render !== 'function')) {
      if (process.env.NODE_ENV !== 'production') {
        invariant(false, 'Component (with keys: %s) contains `render` method ' + 'but is not mounted in the DOM', Object.keys(componentOrElement));
      } else {
        invariant(false);
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      invariant(false, 'Element appears to be neither ReactComponent nor DOMNode (keys: %s)', Object.keys(componentOrElement));
    } else {
      invariant(false);
    }
  }


  /**
   * @see ReactChildReconciler.updateChildren
   *
   * Updates the rendered children and returns a new set of children.
   *
   * @param {?object} prevChildren Previously initialized set of children.
   * @param {?object} nextChildren Nested child maps.
   * @param {ReactReconcileTransaction} transaction
   * @param {object} context
   * @return {?object} A new set of child instances.
   * @internal
   */
  updateChildren(prevChildren, nextChildren, transaction, context) {
    // We currently don't have a way to track moves here but if we use iterators
    // instead of for..in we can zip the iterators and check if an item has
    // moved.
    // TODO: If nothing has changed, return the prevChildren object so that we
    // can quickly bailout if nothing has changed.
    if (!nextChildren && !prevChildren) {
      return null;
    }
    for (const childName in nextChildren) {
      if (!nextChildren.hasOwnProperty(childName)) {
        continue;
      }
      const prevChild = prevChildren && prevChildren[childName];
      const prevElement = prevChild && prevChild._currentElement;
      const nextElement = nextChildren[childName];
      if (prevChild !== null && prevChild !== undefined && shouldUpdateReactComponent(prevElement, nextElement)) {
        ReactReconciler.receiveComponent(prevChild, nextElement, transaction, context);

        if (prevChild._forceRemountOfComponent) {
          ReactReconciler.unmountComponent(prevChild, childName);
          nextChildren[childName] = this.instantiateReactComponent(nextElement, null);
        } else {
          nextChildren[childName] = prevChild;
        }
      } else {
        if (prevChild) {
          ReactReconciler.unmountComponent(prevChild, childName);
        }
        // The child must be instantiated before it's mounted.
        nextChildren[childName] = this.instantiateReactComponent(nextElement, null);
      }
    }
    // Unmount children that are no longer present.
    for (const childName in prevChildren) {
      if (prevChildren.hasOwnProperty(childName) && !(nextChildren && nextChildren.hasOwnProperty(childName))) {
        ReactReconciler.unmountComponent(prevChildren[childName]);
      }
    }
    return nextChildren;
  }

  getUserDataFromInstance(instance) {
    const id = ReactInstanceMap.get(instance)._rootNodeID;

    if (ReactEmptyComponentRegistry.isNullComponentID(id)) {
      return null;
    }

    if (!this.userDataCache.hasOwnProperty(id) || !this.isValid(this.userDataCache[id], id)) {
      this.userDataCache[id] = this.findReactNodeByID(id);
    }

    return this.userDataCache[id];
  }

  getElementDescriptor(name) {
    return this.threeElementDescriptors[name];
  }

  constructor(canvas) {
    this._canvas = canvas;
    this._instancesByReactRootID = {};
    this.object3DsByReactRootID = {};
    if (process.env.NODE_ENV !== 'production') {
      this.rootUserDatasByReactRootID = {};
    }
    this.findComponentRootReusableArray = [];
    this.userDataCache = {};
    this.deepestObject3DSoFar = null;
    this.nextMountID = 1;
    this.nextReactRootIndex = 0;

    this.threeElementDescriptors = new ElementDescriptorContainer(this).descriptors;

    this._root = {};

    this._highlightElement = document.createElement('div');
    this._highlightCache = null;

    if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_REACT_ADDON_HOOKS === 'true') {
      this._agent = null;

      this._onHideHighlightFromInspector = () => {
        if (this._highlightCache && this._highlightCache.react3internalComponent) {
          const internalComponent = this._highlightCache.react3internalComponent;

          internalComponent.hideHighlight();

          this._highlightCache = null;
        }
      };

      this._onHighlightFromInspector = (highlightInfo) => {
        if (highlightInfo.node === this._highlightElement) {
          if (this._highlightCache && this._highlightCache.react3internalComponent) {
            const internalComponent = this._highlightCache.react3internalComponent;

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

      // this._scene = new THREE.Scene();

      // Inject the runtime into a devtools global hook regardless of browser.
      // Allows for debugging when the hook is injected on the page.
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
        this._devToolsRendererDefinition = {
          CurrentOwner: ReactCurrentOwner,
          InstanceHandles: ReactInstanceHandles,
          Mount: this,
          Reconciler: ReactReconciler,
          TextComponent: InternalComponent,
        };

        const rendererListener = (info) => {
          this._reactDevtoolsRendererId = info.id;
        };

        __REACT_DEVTOOLS_GLOBAL_HOOK__.sub('renderer', rendererListener);
        __REACT_DEVTOOLS_GLOBAL_HOOK__.inject(this._devToolsRendererDefinition);

        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent !== 'undefined') {
          const agent = __REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent;
          this._hookAgent(agent);
        } else {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.sub('react-devtools', (agent) => {
            this._hookAgent(agent);
          });
        }
      }
    }
  }


  findDeepestCachedAncestorImpl = (ancestorID) => {
    const ancestorUserData = this.userDataCache[ancestorID];
    if (ancestorUserData && this.isValid(ancestorUserData, ancestorID)) {
      this.deepestObject3DSoFar = ancestorUserData.object3D;
    } else {
      // This node isn't populated in the cache, so presumably none of its
      // descendants are. Break out of the loop.
      return false;
    }
  };

  /**
   * Return the deepest cached node whose ID is a prefix of `targetID`.
   */
  findDeepestCachedAncestor(targetID) {
    this.deepestObject3DSoFar = null;

    ReactInstanceHandles.traverseAncestors(targetID, this.findDeepestCachedAncestorImpl);

    const foundUserData = this.deepestObject3DSoFar;
    this.deepestObject3DSoFar = null;
    return foundUserData;
  }

  instantiateChild = (childInstances, child, name) => {
    // We found a component instance.
    const keyUnique = childInstances[name] === undefined;
    if (process.env.NODE_ENV !== 'production') {
      warning(keyUnique, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.', name);
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

  containsChild(container, userData) {
    const childrenMarkup = container.userData.childrenMarkup;
    for (let i = 0; i < childrenMarkup.length; i++) {
      if (childrenMarkup[i].userData === userData) {
        return true;
      }
    }

    return false;
  }

  isValid(userData, id) {
    if (userData) {
      if (internalGetID(userData) !== id) {
        if (process.env.NODE_ENV !== 'production') {
          invariant(false, 'React3Renderer: Unexpected modification of `%s`', ID_ATTR_NAME);
        } else {
          invariant(false);
        }
      }

      const container = this.findReactContainerForID(id);

      // if (container && container.userData === userData) {
      //  return true;
      // }

      if (container && this.containsChild(container, userData)) {
        return true;
      }
    }

    return false;
  }


  /**
   * Finds the object3D DOM element that contains React component to which the
   * supplied DOM `id` belongs.
   *
   * @param {string} id The ID of an element rendered by a React component.
   * @return {?THREE.Object3D} The 3d object that contains the `id`.
   */
  findReactContainerForID(id) {
    const reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(id);
    const object3D = this.object3DsByReactRootID[reactRootID];

    if (process.env.NODE_ENV !== 'production') {
      const rootElement = this.rootUserDatasByReactRootID[reactRootID];
      if (rootElement && rootElement.userData.parentMarkup.threeObject !== object3D) {
        if (process.env.NODE_ENV !== 'production') {
          warning(
            // Call internalGetID here because getID calls isValid which calls
            // findReactContainerForID (this function).
            internalGetID(rootElement) === reactRootID, 'React3Renderer: Root element ID differed from reactRootID.');
        }

        const containerChild = object3D.userData.childrenMarkup[0];// firstChild;
        if (containerChild && reactRootID === internalGetID(containerChild)) {
          // If the object3D has a new child with the same ID as the old
          // root element, then rootUserDatasByReactRootID[reactRootID] is
          // just stale and needs to be updated. The case that deserves a
          // warning is when the object3D is empty.
          this.rootUserDatasByReactRootID[reactRootID] = containerChild;
        } else {
          if (process.env.NODE_ENV !== 'production') {
            warning(false, 'React3Renderer: Root element has been removed from its original ' + 'object3D. New object3D: %s', rootElement.parentNode);
          }
        }
      }
    }

    return object3D;
  }

  getUserData(id) {
    if (!this.userDataCache.hasOwnProperty(id) || !this.isValid(this.userDataCache[id], id)) {
      this.userDataCache[id] = this.findReactNodeByID(id);
    }
    return this.userDataCache[id];
  }

  findNodeHandle = (instance) => {
    const userData = this.getUserData(instance._rootNodeID);

    this._highlightCache = userData;
    return this._highlightElement;
  };

  nativeTagToRootNodeID = () => {
    // console.log('wat');
    // debugger;
    // invariant(false, 'Wat!');
    return null;
  };

  /**
   * Finds an element rendered by React with the supplied ID.
   *
   * @param {string} id ID of a DOM node in the React component.
   * @return {THREE.Object3D} Root THREE.Object3D of the React component.
   */
  findReactNodeByID(id) {
    const reactRoot = this.findReactContainerForID(id);
    return this.findComponentRoot(reactRoot, id);
  }

  findComponentRoot(ancestorNode, targetID) {
    const firstUserDataList = this.findComponentRootReusableArray;
    let childIndex = 0;

    const deepestAncestor = this.findDeepestCachedAncestor(targetID) || ancestorNode;

    firstUserDataList[0] = deepestAncestor.userData.childrenMarkup[0].userData;
    firstUserDataList.length = 1;

    while (childIndex < firstUserDataList.length) {
      let child = firstUserDataList[childIndex++];
      let targetChild;

      while (child) {
        const childID = this.getID(child);
        if (childID) {
          // Even if we find the node we're looking for, we finish looping
          // through its siblings to ensure they're cached so that we don't have
          // to revisit this node again. Otherwise, we make n^2 calls to getID
          // when visiting the many children of a single node in order.

          if (targetID === childID) {
            targetChild = child;
          } else if (ReactInstanceHandles.isAncestorIDOf(childID, targetID)) {
            // If we find a child whose ID is an ancestor of the given ID,
            // then we can be sure that we only want to search the subtree
            // rooted at this child, so we can throw out the rest of the
            // search state.
            firstUserDataList.length = childIndex = 0;
            firstUserDataList.push(child.childrenMarkup[0].userData);
          }
        } else {
          debugger;
          // If this child had no ID, then there's a chance that it was
          // injected automatically by the browser, as when a `<table>`
          // element sprouts an extra `<tbody>` child as a side effect of
          // `.innerHTML` parsing. Optimistically continue down this
          // branch, but not before examining the other siblings.
          firstUserDataList.push(child.childrenMarkup[0].userData);
        }

        const ownerChildren = child.parentMarkup.userData.childrenMarkup;

        child = null;

        // child = child.nextSibling;
        for (let i = 0; i < ownerChildren.length - 1; i++) {
          const ownerChildId = this.getID(ownerChildren[i].userData);

          if (ownerChildId === childID) {
            child = ownerChildren[i + 1].userData;
            break;
          }
        }
      }

      if (targetChild) {
        // Emptying firstUserDataList/findComponentRootReusableArray is
        // not necessary for correctness, but it helps the GC reclaim
        // any nodes that were left at the end of the search.
        firstUserDataList.length = 0;

        return targetChild;
      }
    }

    firstUserDataList.length = 0;

    if (process.env.NODE_ENV !== 'production') {
      invariant(false, 'findComponentRoot(..., %s): Unable to find element. This probably ' + 'means the DOM was unexpectedly mutated (e.g., by the browser), ' + 'usually due to forgetting a <tbody> when using tables, nesting tags ' + 'like <form>, <p>, or <a>, or using non-SVG elements in an <svg> ' + 'parent. ' + 'Try inspecting the child nodes of the element with React ID `%s`.', targetID, this.getID(ancestorNode));
    } else {
      invariant(false);
    }
  }


  /**
   * Mounts this component and inserts it into the DOM.
   *
   * @param {ReactComponent} componentInstance The instance to mount.
   * @param {string} rootID DOM ID of the root node.
   * @param {THREE.Object3D} container DOM element to mount into.
   * @param {ReactReconcileTransaction} transaction
   * @param {boolean} shouldReuseMarkup If true, do not insert markup
   * @param {any} context
   */
  mountRootComponent = (componentInstance, rootID, container, transaction, shouldReuseMarkup, context) => {
    // if (process.env.NODE_ENV !== 'production') {
    // if (context === emptyObject) {
    //   context = {};
    // }
    // const tag = container.nodeName.toLowerCase();
    // context[validateDOMNesting.ancestorInfoContextKey] = validateDOMNesting.updatedAncestorInfo(null, tag, null);
    // }

    const markup = ReactReconciler.mountComponent(componentInstance, rootID, transaction, context);
    componentInstance._renderedComponent._topLevelWrapper = componentInstance;
    this._mountRootImage(markup, container, shouldReuseMarkup, transaction);
  };

  _mountRootImage(markup, container) {
    // if (!(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE))) {
    //   if (process.env.NODE_ENV !== 'production') {
    //     invariant(false, 'mountRootComponent(...): Target container is not valid.');
    //   } else {
    //     invariant(false);
    //   }
    // }

    // TODO try to do server-side rendering for THREE ( can write a scene into json or something :D )
    // if (shouldReuseMarkup) {
    //   const rootElement = getReactRootUserDataInObject3D(container);
    //   if (ReactMarkupChecksum.canReuseMarkup(markup, rootElement)) {
    //     return;
    //   }
    //
    //   const checksum = rootElement.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
    //   rootElement.removeAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
    //
    //   const rootMarkup = rootElement.outerHTML;
    //   rootElement.setAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME, checksum);
    //
    //   const diffIndex = firstDifferenceIndex(markup, rootMarkup);
    //   const difference = ' (client) ' + markup.substring(diffIndex - 20, diffIndex + 20) + '\n (server) ' + rootMarkup.substring(diffIndex - 20, diffIndex + 20);
    //
    //   !(container.nodeType !== DOC_NODE_TYPE) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'You\'re trying to render a component to the document using ' + 'server rendering but the checksum was invalid. This usually ' + 'means you rendered a different component type or props on ' + 'the client from the one on the server, or your render() ' + 'methods are impure. React cannot handle this case due to ' + 'cross-browser quirks by rendering at the document root. You ' + 'should look for environment dependent code in your components ' + 'and ensure the props are the same client and server side:\n%s', difference) : invariant(false) : undefined;
    //
    //   if (process.env.NODE_ENV !== 'production') {
    //     process.env.NODE_ENV !== 'production' ? warning(false, 'React attempted to reuse markup in a container but the ' + 'checksum was invalid. This generally means that you are ' + 'using server rendering and the markup generated on the ' + 'server was not what the client was expecting. React injected ' + 'new markup to compensate which works but you have lost many ' + 'of the benefits of server rendering. Instead, figure out ' + 'why the markup being generated is different on the client ' + 'or server:\n%s', difference) : undefined;
    //   }
    // }

    // if (!(container.nodeType !== DOC_NODE_TYPE)) {
    //   if (process.env.NODE_ENV !== 'production') {
    //     invariant(false, 'You\'re trying to render a component to the document but ' + 'you didn\'t use server rendering. We can\'t do this ' + 'without using server rendering due to cross-browser quirks. ' + 'See React.renderToString() for server rendering.');
    //   } else {
    //     invariant(false);
    //   }
    // }

    // console.log('setting inner html!?', markup);

    const rootMarkup = {
      userData: {
        ...container.userData,
        childrenMarkup: [markup],
        parentMarkup: null,
        object3D: container,
        toJSON: () => {
          return '---USERDATA---';
        },
      },
      threeObject: container,
      toJSON: () => {
        return '---MARKUP---';
      },
    };

    rootMarkup.userData.markup = rootMarkup;

    container.userData = rootMarkup.userData;

    markup.userData.parentMarkup = rootMarkup;

    // all objects now added can be marked as added to scene now!

    const instance:React3DInstance = markup.threeObject;

    invariant(instance instanceof React3DInstance, 'Invalid root component type found');

    instance.mountedIntoRoot();

    container.instance = instance;
  }

  /**
   * Batched mount.
   *
   * @param {ReactComponent} componentInstance The instance to mount.
   * @param {string} rootID DOM ID of the root node.
   * @param {THREE.Object3D} container DOM element to mount into.
   * @param {boolean} shouldReuseMarkup If true, do not insert markup
   * @param {any} context
   */
  batchedMountRootComponent = (componentInstance, rootID, container, shouldReuseMarkup, context) => {
    const transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
    transaction.perform(this.mountRootComponent, null, componentInstance, rootID, container, transaction, shouldReuseMarkup, context);
    ReactUpdates.ReactReconcileTransaction.release(transaction);
  };


  render(nextElement, callback) {
    return this._renderSubtree(null, nextElement, callback);
  }

  _renderSubtree(parentComponent, nextElement, callback) {
    const root = this._root;

    if (!ReactElement.isValidElement(nextElement)) {
      if (process.env.NODE_ENV !== 'production') {
        if (typeof nextElement === 'string') {
          invariant(false, 'React.render(): Invalid component element.%s', ' Instead of passing an element string, make sure to instantiate ' + 'it by passing it to React.createElement.');
        } else if (typeof nextElement === 'function') {
          invariant(false, 'React.render(): Invalid component element.%s', ' Instead of passing a component class, make sure to instantiate ' + 'it by passing it to React.createElement.');
        } else if (nextElement !== null && nextElement.props !== undefined) {
          invariant(false, 'React.render(): Invalid component element.%s', ' This may be caused by unintentionally loading two independent ' + 'copies of React.');
        } else {
          invariant(false, 'React.render(): Invalid component element.%s', '');
        }
      } else {
        invariant(false);
      }
    }

    const nextWrappedElement = new ReactElement(TopLevelWrapper, null, null, null, null, null, nextElement);

    const prevComponent = this._instancesByReactRootID[this.getReactRootID(root)];

    if (prevComponent) {
      const prevWrappedElement = prevComponent._currentElement;
      const prevElement = prevWrappedElement.props;
      if (shouldUpdateReactComponent(prevElement, nextElement)) {
        return this._updateRootComponent(prevComponent, nextWrappedElement, root, callback)._renderedComponent.getPublicInstance();
      }

      this.unmountComponentAtNode(root);
    }

    const reactRootUserData = getReactRootUserDataInObject3D(root);
    const containerHasReactMarkup = reactRootUserData && internalGetID(reactRootUserData);

    // if (process.env.NODE_ENV !== 'production') {
    //   if (!containerHasReactMarkup || reactRootUserData.nextSibling) {
    //     let rootElementSibling = reactRootUserData;
    //     while (rootElementSibling) {
    //       if (this.isRenderedByReact(rootElementSibling)) {
    //         if (process.env.NODE_ENV !== 'production') {
    //           warning(false, 'render(): Target node has markup rendered by React, but there ' + 'are unrelated nodes as well. This is most commonly caused by ' + 'white-space inserted around server-rendered markup.');
    //         }
    //         break;
    //       }
    //
    //       rootElementSibling = rootElementSibling.nextSibling;
    //     }
    //   }
    // }

    const shouldReuseMarkup = containerHasReactMarkup && !prevComponent;

    let component;
    if (parentComponent === null) {
      // root !
      component = this._renderNewRootComponent(nextWrappedElement, root, shouldReuseMarkup, emptyObject)._renderedComponent.getPublicInstance();
    } else {
      component = this._renderNewRootComponent(nextWrappedElement, root, shouldReuseMarkup, parentComponent._reactInternalInstance._processChildContext(parentComponent._reactInternalInstance._context))._renderedComponent.getPublicInstance();
    }

    if (callback) {
      callback.call(component);
    }

    return component;
  }

  dispose() {
    this.unmountComponentAtNode(this._root);

    delete this._root.instance;
    delete this._root;

    delete this._canvas;
    delete this._instancesByReactRootID;
    delete this.object3DsByReactRootID;
    if (process.env.NODE_ENV !== 'production') {
      delete this.rootUserDatasByReactRootID;
    }
    delete this.findComponentRootReusableArray;
    delete this.userDataCache;
    delete this.deepestObject3DSoFar;
    delete this._highlightElement;
    this.nextMountID = 1;
    this.nextReactRootIndex = 0;

    if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_REACT_ADDON_HOOKS === 'true') {
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
    // this.scrollMonitor(container, function () {
    ReactUpdateQueue.enqueueElementInternal(prevComponent, nextElement);
    if (callback) {
      ReactUpdateQueue.enqueueCallbackInternal(prevComponent, callback);
    }
    // });

    if (process.env.NODE_ENV !== 'production') {
      // Record the root element in case it later gets transplanted.
      this.rootUserDatasByReactRootID[this.getReactRootID(container)] = getReactRootUserDataInObject3D(container);
    }

    return prevComponent;
  }

  unmountComponentAtNode(container) {
    // Various parts of our code (such as ReactCompositeComponent's
    // _renderValidatedComponent) assume that calls to render aren't nested;
    // verify that that's the case. (Strictly speaking, unmounting won't cause a
    // render but we still don't expect to be in a render call here.)

    if (process.env.NODE_ENV !== 'production') {
      warning(ReactCurrentOwner.current === null, 'unmountComponentAtNode(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from render ' + 'is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent');
    }

    const reactRootID = this.getReactRootID(container);
    const component = this._instancesByReactRootID[reactRootID];
    if (!component) {
      return false;
    }

    ReactUpdates.batchedUpdates(unmountComponentInternal, component, container);
    delete this._instancesByReactRootID[reactRootID];
    delete this.object3DsByReactRootID[reactRootID];

    if (process.env.NODE_ENV !== 'production') {
      delete this.rootUserDatasByReactRootID[reactRootID];
    }

    return true;
  }

  /**
   * @param {THREE.Object3D} scene DOM element that may contain a React component.
   * @return {?string} A "reactRoot" ID, if a React component is rendered.
   */
  getReactRootID(scene) {
    const rootElement = getReactRootUserDataInObject3D(scene);
    return rootElement && this.getID(rootElement.userData);
  }

  instantiateReactComponent(elementToInstantiate) {
    // console.log('instantiating react component', elementToInstantiate);
    let instance;

    let node = elementToInstantiate;

    if (node === null || node === false) {
      node = new ReactEmptyComponent(this.instantiateReactComponent);
    } else if (typeof node === 'object') {
      const element = node;
      if (!(element && (typeof element.type === 'function' || typeof element.type === 'string'))) {
        if (process.env.NODE_ENV !== 'production') {
          if (element.type === null) {
            invariant(false, 'Element type is invalid: expected a string (for built-in components) ' + 'or a class/function (for composite components) but got: %s.%s',
              element.type, getDeclarationErrorAddendum(element._owner));
          } else {
            invariant(false, 'Element type is invalid: expected a string (for built-in components) ' + 'or a class/function (for composite components) but got: %s.%s',
              typeof element.type, getDeclarationErrorAddendum(element._owner));
          }
        } else {
          invariant(false);
        }
      }

      // Special case string values
      if (typeof element.type === 'string') {
        // console.log('string value string value', element);

        instance = new InternalComponent(element, this);

        // instance = ReactNativeComponent.createInternalComponent(element);
      } else if (isInternalComponentType(element.type)) {
        // This is temporarily available for custom components that are not string
        // representations. I.e. ART. Once those are updated to use the string
        // representation, we can drop this code path.
        const Constructor = element.type;

        instance = new Constructor(element);

        console.log('internal component type herp derp');
      } else {
        instance = new React3CompositeComponentWrapper(this);
      }
    } else if (typeof node === 'string' || typeof node === 'number') {

      if (process.env.NODE_ENV !== 'production') {
        invariant(false, 'Encountered invalid React node of type %s : %s', typeof node, node);
      } else {
        invariant(false);
      }
    } else {
      if (process.env.NODE_ENV !== 'production') {
        invariant(false, 'Encountered invalid React node of type %s', typeof node);
      } else {
        invariant(false);
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      warning(typeof instance.construct === 'function' && typeof instance.mountComponent === 'function' && typeof instance.receiveComponent === 'function' && typeof instance.unmountComponent === 'function', 'Only React Components can be mounted.');
    }

    // Sets up the instance. This can probably just move into the constructor now.
    instance.construct(node);

    // These two fields are used by the DOM and ART diffing algorithms
    // respectively. Instead of using expandos on components, we should be
    // storing the state needed by the diffing algorithms elsewhere.
    instance._mountIndex = 0;
    instance._mountImage = null;

    if (process.env.NODE_ENV !== 'production') {
      instance._isOwnerNecessary = false;
      instance._warnedAboutRefsInRender = false;
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
   * @param object3D
   * @param shouldReuseMarkup
   * @param context
   * @returns {*}
   * @private
   */
  _renderNewRootComponent(nextElement, object3D, shouldReuseMarkup, context) {
    // Various parts of our code (such as ReactCompositeComponent's
    // _renderValidatedComponent) assume that calls to render aren't nested;
    // verify that that's the case.
    if (process.env.NODE_ENV !== 'production') {
      warning(ReactCurrentOwner.current === null, '_renderNewRootComponent(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from ' + 'render is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent');
    }

    const componentInstance = this.instantiateReactComponent(nextElement);
    const reactRootID = this._registerComponent(componentInstance, object3D);

    // The initial render is synchronous but any updates that happen during
    // rendering, in componentWillMount or componentDidMount, will be batched
    // according to the current batching strategy.

    ReactUpdates.batchedUpdates(this.batchedMountRootComponent, componentInstance, reactRootID, object3D, shouldReuseMarkup, context);

    if (process.env.NODE_ENV !== 'production') {
      // Record the root element in case it later gets transplanted.
      this.rootUserDatasByReactRootID[reactRootID] = getReactRootUserDataInObject3D(object3D);
    }

    return componentInstance;
  }

  _registerComponent(nextComponent, object3D) {
    // if (!(object3D && (object3D.nodeType === ELEMENT_NODE_TYPE || object3D.nodeType === DOC_NODE_TYPE || object3D.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE))) {
    //   if (process.env.NODE_ENV !== 'production') {
    //     invariant(false, '_registerComponent(...): Target object3D is not a DOM element.');
    //   } else {
    //     invariant(false);
    //   }
    // }

    // ReactBrowserEventEmitter.ensureScrollValueMonitoring();

    const reactRootID = this.registerContainer(object3D);
    this._instancesByReactRootID[reactRootID] = nextComponent;
    return reactRootID;
  }

  /**
   * Registers a object3D node into which React components will be rendered.
   * This also creates the "reactRoot" ID that will be assigned to the element
   * rendered within.
   *
   * @param {THREE.Object3D} object3D DOM element to register as a object3D.
   * @return {string} The "reactRoot" ID of elements rendered within.
   */
  registerContainer(object3D) {
    let reactRootID = this.getReactRootID(object3D);
    if (reactRootID) {
      // If one exists, make sure it is a valid "reactRoot" ID.
      reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID);
    }
    if (!reactRootID) {
      // No valid "reactRoot" ID found, create one.
      reactRootID = `${SEPARATOR}${this.createReactRootID()}`;
    }
    this.object3DsByReactRootID[reactRootID] = object3D;
    return reactRootID;
  }

  createReactRootID() {
    return this.nextReactRootIndex++;
  }

  getID(userData) {
    const id = internalGetID(userData);
    if (id) {
      if (this.userDataCache.hasOwnProperty(id)) {
        const cached = this.userDataCache[id];
        if (cached !== userData) {
          if (!!this.isValid(cached, id)) {
            if (process.env.NODE_ENV !== 'production') {
              invariant(false, 'React3Renderer: Two valid but unequal nodes with the same `%s`: %s', ID_ATTR_NAME, id);
            } else {
              invariant(false);
            }
          }

          this.userDataCache[id] = userData;
        }
      } else {
        this.userDataCache[id] = userData;
      }
    }

    return id;
  }
}


export default React3Renderer;
