import ReactCompositeComponent from 'react/lib/ReactCompositeComponent';
import ReactElement from 'react/lib/ReactElement';
import ReactCurrentOwner from 'react/lib/ReactCurrentOwner';
import ReactReconciler from 'react/lib/ReactReconciler';
import invariant from 'fbjs/lib/invariant';
import ReactInstanceMap from 'react/lib/ReactInstanceMap';
import emptyObject from 'fbjs/lib/emptyObject';
import warning from 'fbjs/lib/warning';
import ReactUpdateQueue from 'react/lib/ReactUpdateQueue';
import ReactComponent from 'react/lib/ReactComponent';

class ReactCompositeComponentMixinImpl {
}

ReactCompositeComponentMixinImpl.prototype = {
  ...ReactCompositeComponentMixinImpl.prototype,
  ...ReactCompositeComponent.Mixin,
};

class StatelessComponent extends ReactComponent {
  render() {
    const component = ReactInstanceMap.get(this)._currentElement.type;
    return component(this.props, this.context, this.updater);
  }
}

class React3CompositeComponentWrapper extends ReactCompositeComponentMixinImpl {
  constructor(react3RendererInstance) {
    super();
    this._react3RendererInstance = react3RendererInstance;
  }

  construct(element) {
    super.construct(element);

    this._threeObject = null;
  }

  unmountComponent() {
    super.unmountComponent();

    // this._threeObject = null;
  }

  _updateRenderedComponent(transaction, context) {
    super._updateRenderedComponent(transaction, context);

    this._threeObject = this._renderedComponent._threeObject;
  }

  _instantiateReactComponent(element) {
    return this._react3RendererInstance.instantiateReactComponent(element);
  }

  // See ReactCompositeComponent.mountComponent
  mountComponent(rootID, transaction, context) {
    this._context = context;
    this._mountOrder = this._react3RendererInstance.nextMountID++;
    this._rootNodeID = rootID;

    const publicProps = this._processProps(this._currentElement.props);
    const publicContext = this._processContext(context);

    const Component = this._currentElement.type;

    // Initialize the public class
    let inst;
    let renderedElement;

    // This is a way to detect if Component is a stateless arrow function
    // component, which is not newable. It might not be 100% reliable but is
    // something we can do until we start detecting that Component extends
    // React.Component. We already assume that typeof Component === 'function'.
    const canInstantiate = ('prototype' in Component);

    if (canInstantiate) {
      if (process.env.NODE_ENV !== 'production') {
        const previousCurrent = ReactCurrentOwner.current;

        // noinspection JSValidateTypes
        ReactCurrentOwner.current = this;

        try {
          inst = new Component(publicProps, publicContext, ReactUpdateQueue);
        } finally {
          ReactCurrentOwner.current = previousCurrent;
        }
      } else {
        inst = new Component(publicProps, publicContext, ReactUpdateQueue);
      }
    }


    if (!canInstantiate || inst === null || inst === false || ReactElement.isValidElement(inst)) {
      renderedElement = inst;
      inst = new StatelessComponent(Component);
    }

    if (process.env.NODE_ENV !== 'production') {
      // This will throw later in _renderValidatedComponent, but add an early
      // warning now to help debugging
      if (inst.render === null) {
        if (process.env.NODE_ENV !== 'production') {
          warning(false,
            '%s(...): No `render` method found on the returned component '
            + 'instance: you may have forgotten to define `render`, returned '
            + 'null/false from a stateless component, or tried to render an '
            + 'element whose type is a function that isn\'t a React component.',
            Component.displayName || Component.name || 'Component');
        }
      } else {
        // We support ES6 inheriting from React.Component, the module pattern,
        // and stateless components, but not ES6 classes that don't extend
        if (process.env.NODE_ENV !== 'production') {
          const allOK = Component.prototype && Component.prototype.isReactComponent
            || !canInstantiate || !(inst instanceof Component);
          warning(allOK, '%s(...): React component classes must extend React.Component.',
            Component.displayName || Component.name || 'Component');
        }
      }
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
      if (process.env.NODE_ENV !== 'production') {
        warning(!inst.getInitialState || inst.getInitialState.isReactClassApproved,
          'getInitialState was defined on %s, a plain JavaScript class. '
          + 'This is only supported for classes created using React.createClass. '
          + 'Did you mean to define a state property instead?', this.getName() || 'a component');
        warning(!inst.getDefaultProps || inst.getDefaultProps.isReactClassApproved,
          'getDefaultProps was defined on %s, a plain JavaScript class. '
          + 'This is only supported for classes created using React.createClass. '
          + 'Use a static property to define defaultProps instead.',
          this.getName() || 'a component');
        warning(!inst.propTypes,
          'propTypes was defined as an instance property on %s. Use a static '
          + 'property to define propTypes instead.', this.getName() || 'a component');
        warning(!inst.contextTypes,
          'contextTypes was defined as an instance property on %s. Use a '
          + 'static property to define contextTypes instead.', this.getName() || 'a component');
        warning(typeof inst.componentShouldUpdate !== 'function',
          '%s has a method called '
          + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? '
          + 'The name is phrased as a question because the function is '
          + 'expected to return a value.', this.getName() || 'A component');
        warning(typeof inst.componentDidUnmount !== 'function',
          '%s has a method called '
          + 'componentDidUnmount(). But there is no such lifecycle method. '
          + 'Did you mean componentWillUnmount()?', this.getName() || 'A component');
        warning(typeof inst.componentWillRecieveProps !== 'function', '%s has a method called '
          + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
          this.getName() || 'A component');
      }
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

    if (inst.componentWillMount) {
      inst.componentWillMount();
      // When mounting, calls to `setState` by `componentWillMount` will set
      // `this._pendingStateQueue` without triggering a re-render.
      if (this._pendingStateQueue) {
        inst.state = this._processPendingState(inst.props, inst.context);
      }
    }

    // If not a stateless component, we now render
    if (renderedElement === undefined) {
      renderedElement = this._renderValidatedComponent();
    }

    this._renderedComponent = this._instantiateReactComponent(renderedElement);

    const markup = ReactReconciler.mountComponent(this._renderedComponent,
      rootID, transaction, this._processChildContext(context));
    this._threeObject = this._renderedComponent._threeObject;
    if (inst.componentDidMount) {
      transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
    }

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
