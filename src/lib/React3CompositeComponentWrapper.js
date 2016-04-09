import ReactCompositeComponent from 'react/lib/ReactCompositeComponent';
import ReactElement from 'react/lib/ReactElement';
import ReactCurrentOwner from 'react/lib/ReactCurrentOwner';
import ReactReconciler from 'react/lib/ReactReconciler';
import invariant from 'fbjs/lib/invariant';
import ReactInstanceMap from 'react/lib/ReactInstanceMap';
import emptyObject from 'fbjs/lib/emptyObject';
import warning from 'fbjs/lib/warning';
import ReactUpdateQueue from 'react/lib/ReactUpdateQueue';

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

  getNativeMarkup() {
    debugger; // eslint-disable-line
  }

  construct(element) {
    super.construct(element);

    this._threeObject = null;
  }

  unmountComponent(safely) {
    // debugger; // eslint-disable-line

    super.unmountComponent(safely);

    // this._threeObject = null;
  }

  _updateRenderedComponent(transaction, context) {
    super._updateRenderedComponent(transaction, context);

    this._threeObject = this._renderedComponent._threeObject;
  }

  _instantiateReactComponent(element) {
    return this._react3RendererInstance.instantiateReactComponent(element);
  }


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

    parentInternalComponent.removeChild(originalInternalComponent, null);
    const nextChild = nextMarkup.threeObject.userData.react3internalComponent;
    nextChild._mountIndex = indexInParent;
    parentInternalComponent.createChild(nextChild, null, nextMarkup);
  }

  // See ReactCompositeComponent.mountComponent

  /**
   * Initializes the component, renders markup, and registers event listeners.
   *
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {?object} nativeParent
   * @param {?object} nativeContainerInfo
   * @param {?object} context
   * @return {?string} Rendered markup to be inserted into the DOM.
   * @final
   * @internal
   */
  mountComponent(transaction,
                 nativeParent,
                 nativeContainerInfo,
                 context) {
    this._context = context;
    this._mountOrder = this._react3RendererInstance.nextMountID++;
    this._nativeParent = nativeParent;
    this._nativeContainerInfo = nativeContainerInfo;
    // this._rootNodeID = rootID;

    const publicProps = this._processProps(this._currentElement.props);
    const publicContext = this._processContext(context);

    const Component = this._currentElement.type;

    // Initialize the public class
    let inst;
    let renderedElement;

    if (Component.prototype && Component.prototype.isReactComponent) {
      if (process.env.NODE_ENV !== 'production') {
        const previousOwner = ReactCurrentOwner.current;

        // noinspection JSValidateTypes
        ReactCurrentOwner.current = this;
        try {
          inst = new Component(publicProps, publicContext, ReactUpdateQueue);
        } finally {
          ReactCurrentOwner.current = previousOwner;
        }
      } else {
        inst = new Component(publicProps, publicContext, ReactUpdateQueue);
      }
    } else {
      const componentConstructor = Component;

      if (process.env.NODE_ENV !== 'production') {
        const previousOwner = ReactCurrentOwner.current;

        // noinspection JSValidateTypes
        ReactCurrentOwner.current = this;
        try {
          inst = componentConstructor(publicProps, publicContext, ReactUpdateQueue);
        } finally {
          ReactCurrentOwner.current = previousOwner;
        }
      } else {
        inst = componentConstructor(publicProps, publicContext, ReactUpdateQueue);
      }
      if (!inst || !inst.render) {
        renderedElement = inst;
        warnIfInvalidElement(Component, renderedElement);
        if (process.env.NODE_ENV !== 'production') {
          invariant(
            inst === null ||
            inst === false ||
            ReactElement.isValidElement(inst),
            '%s(...): A valid React element (or null) must be returned. You may have ' +
            'returned undefined, an array or some other invalid object.',
            Component.displayName || Component.name || 'Component'
          );
        } else {
          invariant(
            inst === null ||
            inst === false ||
            ReactElement.isValidElement(inst)
          );
        }
        inst = new StatelessComponent(Component);
      }
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
    inst.updater = ReactUpdateQueue;

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
      nativeParent,
      nativeContainerInfo,
      transaction,
      context);

    // if (inst.componentWillMount) {
    //   inst.componentWillMount();
    //   // When mounting, calls to `setState` by `componentWillMount` will set
    //   // `this._pendingStateQueue` without triggering a re-render.
    //   if (this._pendingStateQueue) {
    //     inst.state = this._processPendingState(inst.props, inst.context);
    //   }
    // }

    // // If not a stateless component, we now render
    // if (renderedElement === undefined) {
    //   renderedElement = this._renderValidatedComponent();
    // }

    if (inst.componentDidMount) {
      transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
    }

    // this._renderedComponent = this._instantiateReactComponent(renderedElement);
    //
    // const markup = ReactReconciler.mountComponent(this._renderedComponent,
    //   rootID, transaction, this._processChildContext(context));
    // this._threeObject = this._renderedComponent._threeObject;
    // if (inst.componentDidMount) {
    //   transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
    // }

    return markup;
  }


  performInitialMount(_renderedElement, nativeParent, nativeContainerInfo, transaction, context) {
    const inst = this._instance;
    if (inst.componentWillMount) {
      inst.componentWillMount();
      // When mounting, calls to `setState` by `componentWillMount` will set
      // `this._pendingStateQueue` without triggering a re-render.
      if (this._pendingStateQueue) {
        inst.state = this._processPendingState(inst.props, inst.context);
      }
    }

    let renderedElement = _renderedElement;

    // If not a stateless component, we now render
    if (renderedElement === undefined) {
      renderedElement = this._renderValidatedComponent();
    }

    // this._renderedNodeType = ReactNodeTypes.getType(renderedElement);
    this._renderedComponent = this._instantiateReactComponent(
      renderedElement
    );

    const markup = ReactReconciler.mountComponent(
      this._renderedComponent,
      transaction,
      nativeParent,
      nativeContainerInfo,
      this._processChildContext(context)
    );

    return markup;
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
