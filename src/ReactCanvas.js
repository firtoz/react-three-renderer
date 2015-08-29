import ReactElement from 'react/lib/ReactElement';
import * as DOMProperty from 'react/lib/DOMProperty.js';
import * as ReactMarkupChecksum from 'react/lib/ReactMarkupChecksum.js';
import ReactInstanceMap from 'react/lib/ReactInstanceMap';
import ReactCompositeComponent from 'react/lib/ReactCompositeComponent';
import ReactEmptyComponent from 'react/lib/ReactEmptyComponent';
import setInnerHTML from 'react/lib/setInnerHTML';
import ReactInstanceHandles from 'react/lib/ReactInstanceHandles';
import ReactBrowserEventEmitter from 'react/lib/ReactBrowserEventEmitter';
import ReactReconciler from 'react/lib/ReactReconciler';
import ReactUpdates from 'react/lib/ReactUpdates';
import ReactCurrentOwner from 'react/lib/ReactCurrentOwner';
import ReactUpdateQueue from 'react/lib/ReactUpdateQueue';
import emptyObject from 'react/lib/emptyObject';
import invariant from 'react/lib/invariant';
import warning from 'react/lib/warning';

const ELEMENT_NODE_TYPE = 1;
const DOC_NODE_TYPE = 9;
const DOCUMENT_FRAGMENT_NODE_TYPE = 11;


/**
 * @namespace process.env
 * @type string
 * @name process.env.NODE_ENV
 */

class TopLevelWrapper {
  render() {
    return this.props;
  }
}

function unmountComponentFromNode(instance, container) {
  ReactReconciler.unmountComponent(instance);

  let currentContainer = container;

  if (currentContainer.nodeType === DOC_NODE_TYPE) {
    currentContainer = container.documentElement;
  }

  // http://jsperf.com/emptying-a-node
  while (currentContainer.lastChild) {
    currentContainer.removeChild(currentContainer.lastChild);
  }
}

const ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;

function internalGetID(node) {
  return node[ATTR_NAME] || '';
  // If node is something like a window, document, or text node, none of
  // which support attributes or a .getAttribute method, gracefully return
  // the empty string, as if the attribute were missing.
  //return node && node.getAttribute && node.getAttribute(ATTR_NAME) || '';
}


/**
 * @param {DOMElement|DOMDocument} container DOM element that may contain
 * a React component
 * @return {?*} DOM element that may have the reactRoot ID, or null.
 */
function getReactRootElementInContainer(container) {
  if (!container) {
    return null;
  }

  if (container.nodeType === DOC_NODE_TYPE) {
    return container.documentElement;
  }

  return container.firstChild;
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

function ReactCompositeComponentWrapper(ReactCanvasInstance) {
  this._reactCanvasInstance = ReactCanvasInstance;
}

let nextMountID = 1;

ReactCompositeComponentWrapper.prototype = {
  ...ReactCompositeComponent.Mixin,
  _instantiateReactComponent(element) {
    return this._reactCanvasInstance.instantiateReactComponent(element);
  },

  mountComponent(rootID, transaction, context) {
    this._context = context;
    this._mountOrder = nextMountID++;
    this._rootNodeID = rootID;

    var publicProps = this._processProps(this._currentElement.props);
    var publicContext = this._processContext(context);

    var Component = this._currentElement.type;

    // Initialize the public class
    var inst = new Component(publicProps, publicContext, ReactUpdateQueue);

    if (process.env.NODE_ENV !== 'production') {
      // This will throw later in _renderValidatedComponent, but add an early
      // warning now to help debugging
      process.env.NODE_ENV !== 'production' ? warning(inst.render != null, '%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render` in your ' + 'component or you may have accidentally tried to render an element ' + 'whose type is a function that isn\'t a React component.', Component.displayName || Component.name || 'Component') : undefined;
    }

    // These should be set up in the constructor, but as a convenience for
    // simpler class abstractions, we set them up after the fact.
    inst.props = publicProps;
    inst.context = publicContext;
    inst.refs = emptyObject;
    inst.updater = ReactUpdateQueue;

    this._instance = inst;

    // Store a reference from the instance back to the internal representation
    ReactInstanceMap.set(inst, this);

    if (process.env.NODE_ENV !== 'production') {
      // Since plain JS classes are defined without any special initialization
      // logic, we can not catch common errors early. Therefore, we have to
      // catch them here, at initialization time, instead.
      process.env.NODE_ENV !== 'production' ? warning(!inst.getInitialState || inst.getInitialState.isReactClassApproved, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', this.getName() || 'a component') : undefined;
      process.env.NODE_ENV !== 'production' ? warning(!inst.getDefaultProps || inst.getDefaultProps.isReactClassApproved, 'getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', this.getName() || 'a component') : undefined;
      process.env.NODE_ENV !== 'production' ? warning(!inst.propTypes, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', this.getName() || 'a component') : undefined;
      process.env.NODE_ENV !== 'production' ? warning(!inst.contextTypes, 'contextTypes was defined as an instance property on %s. Use a ' + 'static property to define contextTypes instead.', this.getName() || 'a component') : undefined;
      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentShouldUpdate !== 'function', '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', this.getName() || 'A component') : undefined;
      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentDidUnmount !== 'function', '%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', this.getName() || 'A component') : undefined;
      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentWillRecieveProps !== 'function', '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', this.getName() || 'A component') : undefined;
    }

    let initialState = inst.state;
    if (initialState === undefined) {
      inst.state = initialState = null;
    }
    if (!(typeof initialState === 'object' && !Array.isArray(initialState))) {
      if (process.env.NODE_ENV !== 'production') {
        invariant(false, '%s.state: must be set to an object or null', this.getName() || 'ReactCompositeComponent');
      } else {
        invariant(false);
      }
    }

    this._pendingStateQueue = null;
    this._pendingReplaceState = false;
    this._pendingForceUpdate = false;

    if (inst.componentWillMount) {
      inst.componentWillMount();
      // When mounting, calls to `setState` by `componentWillMount` will set
      // `this._pendingStateQueue` without triggering a re-render.
      if (this._pendingStateQueue) {
        inst.state = this._processPendingState(inst.props, inst.context);
      }
    }

    const renderedElement = this._renderValidatedComponent();

    this._renderedComponent = this._instantiateReactComponent(renderedElement);

    const markup = ReactReconciler.mountComponent(this._renderedComponent, rootID, transaction, this._processChildContext(context));
    if (inst.componentDidMount) {
      transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
    }

    return markup;
  },
};


function legacyGetDOMNode() {
  if ('production' !== process.env.NODE_ENV) {
    var component = this._reactInternalComponent;
    'production' !== process.env.NODE_ENV ? warning(false, 'ReactDOMComponent: Do not access .getDOMNode() of a DOM node; ' + 'instead, use the node directly.%s', getDeclarationErrorAddendum(component)) : undefined;
  }
  return this;
}

function legacyIsMounted() {
  var component = this._reactInternalComponent;
  if ('production' !== process.env.NODE_ENV) {
    'production' !== process.env.NODE_ENV ? warning(false, 'ReactDOMComponent: Do not access .isMounted() of a DOM node.%s', getDeclarationErrorAddendum(component)) : undefined;
  }
  return !!component;
}

function legacySetStateEtc() {
  if ('production' !== process.env.NODE_ENV) {
    var component = this._reactInternalComponent;
    'production' !== process.env.NODE_ENV ? warning(false, 'ReactDOMComponent: Do not access .setState(), .replaceState(), or ' + '.forceUpdate() of a DOM node. This is a no-op.%s', getDeclarationErrorAddendum(component)) : undefined;
  }
}

function legacySetProps(partialProps, callback) {
  var component = this._reactInternalComponent;
  if ('production' !== process.env.NODE_ENV) {
    'production' !== process.env.NODE_ENV ? warning(false, 'ReactDOMComponent: Do not access .setProps() of a DOM node. ' + 'Instead, call React.render again at the top level.%s', getDeclarationErrorAddendum(component)) : undefined;
  }
  if (!component) {
    return;
  }
  ReactUpdateQueue.enqueueSetPropsInternal(component, partialProps);
  if (callback) {
    ReactUpdateQueue.enqueueCallbackInternal(component, callback);
  }
}

function legacyReplaceProps(partialProps, callback) {
  var component = this._reactInternalComponent;
  if ('production' !== process.env.NODE_ENV) {
    'production' !== process.env.NODE_ENV ? warning(false, 'ReactDOMComponent: Do not access .replaceProps() of a DOM node. ' + 'Instead, call React.render again at the top level.%s', getDeclarationErrorAddendum(component)) : undefined;
  }
  if (!component) {
    return;
  }
  ReactUpdateQueue.enqueueReplacePropsInternal(component, partialProps);
  if (callback) {
    ReactUpdateQueue.enqueueCallbackInternal(component, callback);
  }
}

class InternalComponent {
  constructor(element, reactCanvasInstance) {
    this._currentElement = element;
    this._reactCanvasInstance = reactCanvasInstance;

    console.log(element);

    this._rootNodeID = null;
    this._topLevelWrapper = null;
    this._nodeWithLegacyProperties = null;
  }

  construct(node) {
    console.log('constructing', node);
  }

  mountComponent(rootID, transaction, context) {
    this._rootNodeID = rootID;

    return {
      _reactId: rootID,
      content: 'HEBELE',
      children: [],
    };
  }

  receiveComponent(nextElement, transaction, context) {
    var prevElement = this._currentElement;
    this._currentElement = nextElement;
    this.updateComponent(transaction, prevElement, nextElement, context);
  }

  updateComponent(transaction, prevElement, nextElement, context) {
    console.log('ahh updating');
  }

  unmountComponent() {
    console.log('unmounting component!');
  }


  getPublicInstance() {
    if (!this._nodeWithLegacyProperties) {
      const node = this._reactCanvasInstance.getNode(this._rootNodeID);

      node._reactInternalComponent = this;
      node.getDOMNode = legacyGetDOMNode;
      node.isMounted = legacyIsMounted;
      node.setState = legacySetStateEtc;
      node.replaceState = legacySetStateEtc;
      node.forceUpdate = legacySetStateEtc;
      node.setProps = legacySetProps;
      node.replaceProps = legacyReplaceProps;

      if (process.env.NODE_ENV !== 'production') {
        if (canDefineProperty) {
          Object.defineProperties(node, legacyPropsDescriptor);
        } else {
          // updateComponent will update this property on subsequent renders
          node.props = this._currentElement.props;
        }
      } else {
        // updateComponent will update this property on subsequent renders
        node.props = this._currentElement.props;
      }

      this._nodeWithLegacyProperties = node;
    }
    return this._nodeWithLegacyProperties;
  }
}


class ReactCanvas {
  constructor() {
    this.instancesByReactRootID = {};
    this.containersByReactRootID = {};
    this.rootElementsByReactRootID = {};
    this.findComponentRootReusableArray = [];
    this.nodeCache = {};
    this.deepestNodeSoFar = null;
  }

  findDeepestCachedAncestorImpl = (ancestorID) => {
    var ancestor = this.nodeCache[ancestorID];
    if (ancestor && this.isValid(ancestor, ancestorID)) {
      this.deepestNodeSoFar = ancestor;
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
    this.deepestNodeSoFar = null;
    ReactInstanceHandles.traverseAncestors(targetID, this.findDeepestCachedAncestorImpl);

    const foundNode = this.deepestNodeSoFar;
    this.deepestNodeSoFar = null;
    return foundNode;
  }

  isValid(node, id) {
    if (node) {
      if (!(internalGetID(node) === id)) {
        if (process.env.NODE_ENV !== 'production') {
          invariant(false, 'ReactCanvas: Unexpected modification of `%s`', ATTR_NAME);
        } else {
          invariant(false);
        }
      }

      const container = this.findReactContainerForID(id);
      if (container && containsNode(container, node)) {
        return true;
      }
    }

    return false;
  }


  /**
   * Finds the container DOM element that contains React component to which the
   * supplied DOM `id` belongs.
   *
   * @param {string} id The ID of an element rendered by a React component.
   * @return {?DOMElement} DOM element that contains the `id`.
   */
  findReactContainerForID(id) {
    const reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(id);
    const container = this.containersByReactRootID[reactRootID];

    if (process.env.NODE_ENV !== 'production') {
      const rootElement = this.rootElementsByReactRootID[reactRootID];
      if (rootElement && rootElement.parentNode !== container) {
        if (process.env.NODE_ENV !== 'production') {
          warning(
            // Call internalGetID here because getID calls isValid which calls
            // findReactContainerForID (this function).
            internalGetID(rootElement) === reactRootID, 'ReactCanvas: Root element ID differed from reactRootID.');
        }

        const containerChild = container.firstChild;
        if (containerChild && reactRootID === internalGetID(containerChild)) {
          // If the container has a new child with the same ID as the old
          // root element, then rootElementsByReactRootID[reactRootID] is
          // just stale and needs to be updated. The case that deserves a
          // warning is when the container is empty.
          this.rootElementsByReactRootID[reactRootID] = containerChild;
        } else {
          if (process.env.NODE_ENV !== 'production') {
            warning(false, 'ReactCanvas: Root element has been removed from its original ' + 'container. New container: %s', rootElement.parentNode);
          }
        }
      }
    }

    return container;
  }

  getNode(id) {
    if (!this.nodeCache.hasOwnProperty(id) || !this.isValid(nodeCache[id], id)) {
      this.nodeCache[id] = this.findReactNodeByID(id);
    }
    return nodeCache[id];
  }


  /**
   * Finds an element rendered by React with the supplied ID.
   *
   * @param {string} id ID of a DOM node in the React component.
   * @return {DOMElement} Root DOM node of the React component.
   */
  findReactNodeByID(id) {
    const reactRoot = this.findReactContainerForID(id);
    return this.findComponentRoot(reactRoot, id);
  }

  findComponentRoot(ancestorNode, targetID) {
    const firstChildren = this.findComponentRootReusableArray;
    let childIndex = 0;

    const deepestAncestor = this.findDeepestCachedAncestor(targetID) || ancestorNode;

    firstChildren[0] = deepestAncestor.firstChild;
    firstChildren.length = 1;

    while (childIndex < firstChildren.length) {
      let child = firstChildren[childIndex++];
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
            firstChildren.length = childIndex = 0;
            firstChildren.push(child.firstChild);
          }
        } else {
          // If this child had no ID, then there's a chance that it was
          // injected automatically by the browser, as when a `<table>`
          // element sprouts an extra `<tbody>` child as a side effect of
          // `.innerHTML` parsing. Optimistically continue down this
          // branch, but not before examining the other siblings.
          firstChildren.push(child.firstChild);
        }

        child = child.nextSibling;
      }

      if (targetChild) {
        // Emptying firstChildren/findComponentRootReusableArray is
        // not necessary for correctness, but it helps the GC reclaim
        // any nodes that were left at the end of the search.
        firstChildren.length = 0;

        return targetChild;
      }
    }

    firstChildren.length = 0;

    if ('production' !== process.env.NODE_ENV) {
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
   * @param {DOMElement} container DOM element to mount into.
   * @param {ReactReconcileTransaction} transaction
   * @param {boolean} shouldReuseMarkup If true, do not insert markup
   */
  mountComponentIntoNode = (componentInstance, rootID, container, transaction, shouldReuseMarkup, context) => {
    if (process.env.NODE_ENV !== 'production') {
      // if (context === emptyObject) {
      //   context = {};
      // }
      // const tag = container.nodeName.toLowerCase();
      // context[validateDOMNesting.ancestorInfoContextKey] = validateDOMNesting.updatedAncestorInfo(null, tag, null);
    }

    console.log('creating markup!');

    debugger;

    const markup = ReactReconciler.mountComponent(componentInstance, rootID, transaction, context);
    componentInstance._renderedComponent._topLevelWrapper = componentInstance;
    this._mountImageIntoNode(markup, container, shouldReuseMarkup);
  };

  _mountImageIntoNode(markup, container, shouldReuseMarkup) {
    //if (!(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE))) {
    //  if (process.env.NODE_ENV !== 'production') {
    //    invariant(false, 'mountComponentIntoNode(...): Target container is not valid.');
    //  } else {
    //    invariant(false);
    //  }
    //}

    // TODO try to do serverside rendering for THREE ( can write a scene into json or something :D )
    //if (shouldReuseMarkup) {
    //  const rootElement = getReactRootElementInContainer(container);
    //  if (ReactMarkupChecksum.canReuseMarkup(markup, rootElement)) {
    //    return;
    //  }
    //
    //  const checksum = rootElement.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
    //  rootElement.removeAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
    //
    //  const rootMarkup = rootElement.outerHTML;
    //  rootElement.setAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME, checksum);
    //
    //  const diffIndex = firstDifferenceIndex(markup, rootMarkup);
    //  const difference = ' (client) ' + markup.substring(diffIndex - 20, diffIndex + 20) + '\n (server) ' + rootMarkup.substring(diffIndex - 20, diffIndex + 20);
    //
    //  !(container.nodeType !== DOC_NODE_TYPE) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'You\'re trying to render a component to the document using ' + 'server rendering but the checksum was invalid. This usually ' + 'means you rendered a different component type or props on ' + 'the client from the one on the server, or your render() ' + 'methods are impure. React cannot handle this case due to ' + 'cross-browser quirks by rendering at the document root. You ' + 'should look for environment dependent code in your components ' + 'and ensure the props are the same client and server side:\n%s', difference) : invariant(false) : undefined;
    //
    //  if (process.env.NODE_ENV !== 'production') {
    //    process.env.NODE_ENV !== 'production' ? warning(false, 'React attempted to reuse markup in a container but the ' + 'checksum was invalid. This generally means that you are ' + 'using server rendering and the markup generated on the ' + 'server was not what the client was expecting. React injected ' + 'new markup to compensate which works but you have lost many ' + 'of the benefits of server rendering. Instead, figure out ' + 'why the markup being generated is different on the client ' + 'or server:\n%s', difference) : undefined;
    //  }
    //}

    //if (!(container.nodeType !== DOC_NODE_TYPE)) {
    //  if (process.env.NODE_ENV !== 'production') {
    //    invariant(false, 'You\'re trying to render a component to the document but ' + 'you didn\'t use server rendering. We can\'t do this ' + 'without using server rendering due to cross-browser quirks. ' + 'See React.renderToString() for server rendering.');
    //  } else {
    //    invariant(false);
    //  }
    //}

    console.log('setting inner html!?');
    debugger;

    setInnerHTML(container, markup);
  }

  /**
   * Batched mount.
   *
   * @param {ReactComponent} componentInstance The instance to mount.
   * @param {string} rootID DOM ID of the root node.
   * @param {DOMElement} container DOM element to mount into.
   * @param {boolean} shouldReuseMarkup If true, do not insert markup
   */
  batchedMountComponentIntoNode = (componentInstance, rootID, container, shouldReuseMarkup, context) => {
    const transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
    transaction.perform(this.mountComponentIntoNode, null, componentInstance, rootID, container, transaction, shouldReuseMarkup, context);
    ReactUpdates.ReactReconcileTransaction.release(transaction);
  };


  render(nextElement, container, callback) {
    return this._renderSubtreeIntoContainer(null, nextElement, container, callback);
  }

  _renderSubtreeIntoContainer(parentComponent, nextElement, container, callback) {
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

    const nextWrappedElement = new ReactElement(TopLevelWrapper, null, null, null, nextElement);

    const prevComponent = this.instancesByReactRootID[this.getReactRootID(container)];

    if (prevComponent) {
      const prevWrappedElement = prevComponent._currentElement;
      const prevElement = prevWrappedElement.props;
      if (shouldUpdateReactComponent(prevElement, nextElement)) {
        return this._updateRootComponent(prevComponent, nextWrappedElement, container, callback)._renderedComponent.getPublicInstance();
      }

      this.unmountComponentAtNode(container);
    }

    const reactRootElement = getReactRootElementInContainer(container);
    const containerHasReactMarkup = reactRootElement && this.isRenderedByReact(reactRootElement);

    //if (process.env.NODE_ENV !== 'production') {
    //  if (!containerHasReactMarkup || reactRootElement.nextSibling) {
    //    let rootElementSibling = reactRootElement;
    //    while (rootElementSibling) {
    //      if (this.isRenderedByReact(rootElementSibling)) {
    //        if (process.env.NODE_ENV !== 'production') {
    //          warning(false, 'render(): Target node has markup rendered by React, but there ' + 'are unrelated nodes as well. This is most commonly caused by ' + 'white-space inserted around server-rendered markup.');
    //        }
    //        break;
    //      }
    //
    //      rootElementSibling = rootElementSibling.nextSibling;
    //    }
    //  }
    //}

    const shouldReuseMarkup = containerHasReactMarkup && !prevComponent;

    let component;
    if (parentComponent === null) {
      // root !
      component = this._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, emptyObject)._renderedComponent.getPublicInstance();
    } else {
      component = this._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, parentComponent._reactInternalInstance._processChildContext(parentComponent._reactInternalInstance._context))._renderedComponent.getPublicInstance();
    }

    if (callback) {
      callback.call(component);
    }

    return component;
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
      this.rootElementsByReactRootID[this.getReactRootID(container)] = getReactRootElementInContainer(container);
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

    if (!(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE))) {
      if (process.env.NODE_ENV !== 'production') {
        invariant(false, 'unmountComponentAtNode(...): Target container is not a DOM element.');
      } else {
        invariant(false);
      }
    }

    const reactRootID = this.getReactRootID(container);
    const component = this.instancesByReactRootID[reactRootID];
    if (!component) {
      return false;
    }
    ReactUpdates.batchedUpdates(unmountComponentFromNode, component, container);
    delete this.instancesByReactRootID[reactRootID];
    delete this.containersByReactRootID[reactRootID];

    if (process.env.NODE_ENV !== 'production') {
      delete this.rootElementsByReactRootID[reactRootID];
    }

    return true;
  }

  /**
   * @param {DOMElement} container DOM element that may contain a React component.
   * @return {?string} A "reactRoot" ID, if a React component is rendered.
   */
  getReactRootID(container) {
    const rootElement = getReactRootElementInContainer(container);
    return rootElement && this.getID(rootElement);
  }

  isRenderedByReact(node) {
    if (node.nodeType !== 1) {
      // Not a DOMElement, therefore not a React component
      return false;
    }

    const id = this.getID(node);

    if (id) {
      return id.charAt(0) === SEPARATOR;
    }

    return false;
  }

  instantiateReactComponent(nodeInput) {
    let instance;

    let node = nodeInput;

    if (node === null || node === false) {
      node = ReactEmptyComponent.emptyElement;
    }

    if (typeof node === 'object') {
      const element = node;
      if (!(element && (typeof element.type === 'function' || typeof element.type === 'string'))) {
        if (process.env.NODE_ENV !== 'production') {
          invariant(false, 'Element type is invalid: expected a string (for built-in components) ' + 'or a class/function (for composite components) but got: %s.%s', element.type == null ? element.type : typeof element.type, getDeclarationErrorAddendum(element._owner));
        } else {
          invariant(false);
        }
      }

      // Special case string values
      if (typeof element.type === 'string') {
        console.log('string value string value');

        instance = new InternalComponent(element, this);
        //debugger;

        //instance = ReactNativeComponent.createInternalComponent(element);
      } else if (isInternalComponentType(element.type)) {
        // This is temporarily available for custom components that are not string
        // representations. I.e. ART. Once those are updated to use the string
        // representation, we can drop this code path.
        instance = new element.type(element);

        console.log('internal component type herp derp');
      } else {
        instance = new ReactCompositeComponentWrapper(this);
      }
    } else if (typeof node === 'string' || typeof node === 'number') {
      console.log('string or number?!');
      // instance = ReactNativeComponent.createInstanceForText(node);
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
   * @param container
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
      warning(ReactCurrentOwner.current === null, '_renderNewRootComponent(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from ' + 'render is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent');
    }

    const componentInstance = this.instantiateReactComponent(nextElement);
    const reactRootID = this._registerComponent(componentInstance, container);

    // The initial render is synchronous but any updates that happen during
    // rendering, in componentWillMount or componentDidMount, will be batched
    // according to the current batching strategy.

    ReactUpdates.batchedUpdates(this.batchedMountComponentIntoNode, componentInstance, reactRootID, container, shouldReuseMarkup, context);

    if (process.env.NODE_ENV !== 'production') {
      // Record the root element in case it later gets transplanted.
      this.rootElementsByReactRootID[reactRootID] = getReactRootElementInContainer(container);
    }

    return componentInstance;
  }

  _registerComponent(nextComponent, container) {
    //if (!(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE))) {
    //  if (process.env.NODE_ENV !== 'production') {
    //    invariant(false, '_registerComponent(...): Target container is not a DOM element.');
    //  } else {
    //    invariant(false);
    //  }
    //}

    //ReactBrowserEventEmitter.ensureScrollValueMonitoring();

    const reactRootID = this.registerContainer(container);
    this.instancesByReactRootID[reactRootID] = nextComponent;
    return reactRootID;
  }

  /**
   * Registers a container node into which React components will be rendered.
   * This also creates the "reactRoot" ID that will be assigned to the element
   * rendered within.
   *
   * @param {DOMElement} container DOM element to register as a container.
   * @return {string} The "reactRoot" ID of elements rendered within.
   */
  registerContainer(container) {
    let reactRootID = this.getReactRootID(container);
    if (reactRootID) {
      // If one exists, make sure it is a valid "reactRoot" ID.
      reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID);
    }
    if (!reactRootID) {
      // No valid "reactRoot" ID found, create one.
      reactRootID = ReactInstanceHandles.createReactRootID();
    }
    this.containersByReactRootID[reactRootID] = container;
    return reactRootID;
  }

  getID(node) {
    const id = internalGetID(node);
    if (id) {
      if (this.nodeCache.hasOwnProperty(id)) {
        const cached = this.nodeCache[id];
        if (cached !== node) {
          if (!!this.isValid(cached, id)) {
            if (process.env.NODE_ENV !== 'production') {
              invariant(false, 'ReactCanvas: Two valid but unequal nodes with the same `%s`: %s', ATTR_NAME, id);
            } else {
              invariant(false);
            }
          }

          this.nodeCache[id] = node;
        }
      } else {
        this.nodeCache[id] = node;
      }
    }

    return id;
  }
}

export default ReactCanvas;
