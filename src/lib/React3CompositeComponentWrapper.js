import ReactCompositeComponent from 'react/lib/ReactCompositeComponent';
import ReactElement from 'react/lib/ReactElement';
import ReactCurrentOwner from 'react/lib/ReactCurrentOwner';
import invariant from 'fbjs/lib/invariant';
import ReactInstanceMap from 'react/lib/ReactInstanceMap';
import ReactInstrumentation from 'react/lib/ReactInstrumentation';
import emptyObject from 'fbjs/lib/emptyObject';
import warning from 'fbjs/lib/warning';
import removeDevTool from './utils/removeDevTool';

class ReactCompositeComponentMixinImpl {
}

ReactCompositeComponentMixinImpl.prototype = {
  ...ReactCompositeComponentMixinImpl.prototype,
  ...ReactCompositeComponent.Mixin,
};

function warnIfInvalidElement(Component, element) {
  if (process.env.NODE_ENV !== 'production') {
    warning(
      element === null || element === false || ReactElement.isValidElement(element),
      '%s(...): A valid React element (or null) must be returned. You may have ' +
      'returned undefined, an array or some other invalid object.',
      Component.displayName || Component.name || 'Component'
    );
  }
}

function shouldConstruct(Component) {
  return Component.prototype && Component.prototype.isReactComponent;
}

function invokeComponentDidMountWithTimer() {
  const publicInstance = this._instance;
  if (this._debugID !== 0) {
    ReactInstrumentation.debugTool.onBeginLifeCycleTimer(
      this._debugID,
      'componentDidMount'
    );
  }
  publicInstance.componentDidMount();
  if (this._debugID !== 0) {
    ReactInstrumentation.debugTool.onEndLifeCycleTimer(
      this._debugID,
      'componentDidMount'
    );
  }
}

class StatelessComponent {
  render() {
    const componentCreator = ReactInstanceMap.get(this)._currentElement.type;
    const element = componentCreator(this.props, this.context, this.updater);
    warnIfInvalidElement(componentCreator, element);
    return element;
  }
}

class React3CompositeComponentWrapper extends ReactCompositeComponentMixinImpl {
  constructor(element, react3RendererInstance) {
    super();
    this._react3RendererInstance = react3RendererInstance;

    this.construct(element);
  }

  getHostMarkup() {
    return super.getHostNode();
  }

  construct(element) {
    super.construct(element);

    this._threeObject = null;
  }

  _updateRenderedComponent(transaction, context) {
    let devToolRemoved;
    if (process.env.NODE_ENV !== 'production') {
      devToolRemoved = removeDevTool();
    }

    super._updateRenderedComponent(transaction, context);

    if (process.env.NODE_ENV !== 'production') {
      if (devToolRemoved) {
        removeDevTool.restore();
      }
    }

    this._threeObject = this._renderedComponent._threeObject;
  }

  _instantiateReactComponent(element, shouldHaveDebugID) {
    return this._react3RendererInstance.instantiateReactComponent(element, shouldHaveDebugID);
  }


  // TODO: prevInstance
  _replaceNodeWithMarkup(oldMarkup, nextMarkup) {
    const parentMarkup = oldMarkup.parentMarkup;

    const ownerChildrenMarkups = parentMarkup.childrenMarkup;

    const indexInParent = ownerChildrenMarkups.indexOf(oldMarkup);

    if (process.env.NODE_ENV !== 'production') {
      invariant(indexInParent !== -1, 'The node has no parent');
    } else {
      invariant(indexInParent !== -1);
    }

    const parentInternalComponent = parentMarkup.threeObject.userData.react3internalComponent;
    const originalInternalComponent = oldMarkup.threeObject.userData.react3internalComponent;

    parentInternalComponent.removeChild(originalInternalComponent, oldMarkup);
    const nextChild = nextMarkup.threeObject.userData.react3internalComponent;
    nextChild._mountIndex = indexInParent;
    parentInternalComponent.createChild(nextChild, null, nextMarkup);
  }

  // See ReactCompositeComponent.mountComponent

  /**
   * Initializes the component, renders markup, and registers event listeners.
   *
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {?object} hostParent
   * @param {?object} hostContainerInfo
   * @param {?object} context
   * @return {?string} Rendered markup to be inserted into the DOM.
   * @final
   * @internal
   */
  mountComponent(transaction,
                 hostParent,
                 hostContainerInfo,
                 context) {
    this._context = context;
    this._mountOrder = this._react3RendererInstance.nextMountID++;
    this._hostParent = hostParent;
    this._hostContainerInfo = hostContainerInfo;

    const publicProps = this._currentElement.props;
    const publicContext = this._processContext(context);

    const Component = this._currentElement.type;

    const updateQueue = transaction.getUpdateQueue();

    // Initialize the public class
    let inst = this._constructComponent(publicProps, publicContext, updateQueue);
    let renderedElement;

    // Support functional components
    if (!shouldConstruct(Component) && (inst == null || inst.render == null)) {
      renderedElement = inst;
      warnIfInvalidElement(Component, renderedElement);
      invariant(
        inst === null ||
        inst === false ||
        ReactElement.isValidElement(inst),
        '%s(...): A valid React element (or null) must be returned. You may have ' +
        'returned undefined, an array or some other invalid object.',
        Component.displayName || Component.name || 'Component'
      );
      inst = new StatelessComponent(Component);
    }

    if (process.env.NODE_ENV !== 'production') {
      // This will throw later in _renderValidatedComponent, but add an early
      // warning now to help debugging
      if (!inst.render) {
        warning(
          false,
          '%s(...): No `render` method found on the returned component ' +
          'instance: you may have forgotten to define `render`.',
          Component.displayName || Component.name || 'Component'
        );
      }

      const propsMutated = inst.props !== publicProps;
      const componentName =
        Component.displayName || Component.name || 'Component';

      warning(
        inst.props === undefined || !propsMutated,
        '%s(...): When calling super() in `%s`, make sure to pass ' +
        'up the same props that your component\'s constructor was passed.',
        componentName, componentName
      );
    }

    // These should be set up in the constructor, but as a convenience for
    // simpler class abstractions, we set them up after the fact.
    inst.props = publicProps;
    inst.context = publicContext;
    inst.refs = emptyObject;
    inst.updater = updateQueue;

    this._instance = inst;

    // Store a reference from the instance back to the internal representation
    ReactInstanceMap.set(inst, this);

    if (process.env.NODE_ENV !== 'production') {
      // Since plain JS classes are defined without any special initialization
      // logic, we can not catch common errors early. Therefore, we have to
      // catch them here, at initialization time, instead.
      warning(
        !inst.getInitialState ||
        inst.getInitialState.isReactClassApproved,
        'getInitialState was defined on %s, a plain JavaScript class. ' +
        'This is only supported for classes created using React.createClass. ' +
        'Did you mean to define a state property instead?',
        this.getName() || 'a component'
      );
      warning(
        !inst.getDefaultProps ||
        inst.getDefaultProps.isReactClassApproved,
        'getDefaultProps was defined on %s, a plain JavaScript class. ' +
        'This is only supported for classes created using React.createClass. ' +
        'Use a static property to define defaultProps instead.',
        this.getName() || 'a component'
      );
      warning(
        !inst.propTypes,
        'propTypes was defined as an instance property on %s. Use a static ' +
        'property to define propTypes instead.',
        this.getName() || 'a component'
      );
      warning(
        !inst.contextTypes,
        'contextTypes was defined as an instance property on %s. Use a ' +
        'static property to define contextTypes instead.',
        this.getName() || 'a component'
      );
      warning(
        typeof inst.componentShouldUpdate !== 'function',
        '%s has a method called ' +
        'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
        'The name is phrased as a question because the function is ' +
        'expected to return a value.',
        (this.getName() || 'A component')
      );
      warning(
        typeof inst.componentDidUnmount !== 'function',
        '%s has a method called ' +
        'componentDidUnmount(). But there is no such lifecycle method. ' +
        'Did you mean componentWillUnmount()?',
        this.getName() || 'A component'
      );
      warning(
        typeof inst.componentWillRecieveProps !== 'function',
        '%s has a method called ' +
        'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
        (this.getName() || 'A component')
      );
    }
    let initialState = inst.state;
    if (initialState === undefined) {
      inst.state = initialState = null;
    }
    if (!(typeof initialState === 'object' && !Array.isArray(initialState))) {
      if (process.env.NODE_ENV !== 'production') {
        invariant(false,
          '%s.state: must be set to an object or null',
          this.getName() || 'ReactCompositeComponent');
      } else {
        invariant(false);
      }
    }

    this._pendingStateQueue = null;
    this._pendingReplaceState = false;
    this._pendingForceUpdate = false;

    const markup = this.performInitialMount(
      renderedElement,
      hostParent,
      hostContainerInfo,
      transaction,
      context);

    if (inst.componentDidMount) {
      if (process.env.NODE_ENV !== 'production') {
        transaction.getReactMountReady().enqueue(invokeComponentDidMountWithTimer, this);
      } else {
        transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
      }
    }

    return markup;
  }

  _constructComponent(publicProps, publicContext, updateQueue) {
    if (process.env.NODE_ENV !== 'production') {
      ReactCurrentOwner.current = this;
      try {
        return this._constructComponentWithoutOwner(publicProps, publicContext, updateQueue);
      } finally {
        ReactCurrentOwner.current = null;
      }
    } else {
      return this._constructComponentWithoutOwner(publicProps, publicContext, updateQueue);
    }
  }

  _constructComponentWithoutOwner(publicProps, publicContext, updateQueue) {
    const Component = this._currentElement.type;
    let instanceOrElement;
    if (shouldConstruct(Component)) {
      if (process.env.NODE_ENV !== 'production') {
        if (this._debugID !== 0) {
          ReactInstrumentation.debugTool.onBeginLifeCycleTimer(
            this._debugID,
            'ctor'
          );
        }
      }
      instanceOrElement = new Component(publicProps, publicContext, updateQueue);
      if (process.env.NODE_ENV !== 'production') {
        if (this._debugID !== 0) {
          ReactInstrumentation.debugTool.onEndLifeCycleTimer(
            this._debugID,
            'ctor'
          );
        }
      }
    } else {
      // This can still be an instance in case of factory components
      // but we'll count this as time spent rendering as the more common case.
      if (process.env.NODE_ENV !== 'production') {
        if (this._debugID !== 0) {
          ReactInstrumentation.debugTool.onBeginLifeCycleTimer(
            this._debugID,
            'render'
          );
        }
      }

      /* eslint-disable new-cap */
      instanceOrElement = Component(publicProps, publicContext, updateQueue);
      /* eslint-enable */

      if (process.env.NODE_ENV !== 'production') {
        if (this._debugID !== 0) {
          ReactInstrumentation.debugTool.onEndLifeCycleTimer(
            this._debugID,
            'render'
          );
        }
      }
    }
    return instanceOrElement;
  }

  /**
   * Needs to be overwritten because emptyObject points to another...
   *
   * Lazily allocates the refs object and stores `component` as `ref`.
   *
   * @param {string} ref Reference name.
   * @param {*} component Component to store as `ref`.
   * @final
   * @private
   */
  attachRef(ref, component) {
    const inst = this.getPublicInstance();
    const refs = inst.refs === emptyObject ? inst.refs = {} : inst.refs;
    refs[ref] = component.getPublicInstance();
  }
}

module.exports = React3CompositeComponentWrapper;
