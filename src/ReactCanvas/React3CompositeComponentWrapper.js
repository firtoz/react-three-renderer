import ReactCompositeComponent from 'react/lib/ReactCompositeComponent';
import ReactReconciler from 'react/lib/ReactReconciler.js';
import invariant from 'react/lib/invariant.js';
import ReactInstanceMap from 'react/lib/ReactInstanceMap.js';
import emptyObject from 'react/lib/emptyObject.js';
import warning from 'react/lib/warning.js';
import ReactUpdateQueue from 'react/lib/ReactUpdateQueue.js';

class ReactCompositeComponentMixinImpl {}

ReactCompositeComponentMixinImpl.prototype = {
  ...ReactCompositeComponentMixinImpl.prototype,
  ...ReactCompositeComponent.Mixin,
};

class React3CompositeComponentWrapper extends ReactCompositeComponentMixinImpl {
  constructor(ReactCanvasInstance) {
    super();
    this._reactCanvasInstance = ReactCanvasInstance;
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

    console.log('ahh updated');

    // this._threeObject =
    this._threeObject = this._renderedComponent._threeObject;
  }

  _instantiateReactComponent(element) {
    return this._reactCanvasInstance.instantiateReactComponent(element);
  }

  mountComponent(rootID, transaction, context) {
    console.log('mounting composite component');

    this._context = context;
    this._mountOrder = this._reactCanvasInstance.nextMountID++;
    this._rootNodeID = rootID;

    const publicProps = this._processProps(this._currentElement.props);
    const publicContext = this._processContext(context);

    const Component = this._currentElement.type;

    // Initialize the public class
    const inst = new Component(publicProps, publicContext, ReactUpdateQueue);

    if (process.env.NODE_ENV !== 'production') {
      // This will throw later in _renderValidatedComponent, but add an early
      // warning now to help debugging
      if (process.env.NODE_ENV !== 'production') {
        warning(inst.render !== null, '%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render` in your ' + 'component or you may have accidentally tried to render an element ' + 'whose type is a function that isn\'t a React component.', Component.displayName || Component.name || 'Component');
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
      process.env.NODE_ENV !== 'production' ? warning(!inst.getInitialState || inst.getInitialState.isReactClassApproved, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', this.getName() || 'a component') : undefined;
      process.env.NODE_ENV !== 'production' ? warning(!inst.getDefaultProps || inst.getDefaultProps.isReactClassApproved, 'getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', this.getName() || 'a component') : undefined;
      process.env.NODE_ENV !== 'production' ? warning(!inst.propTypes, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', this.getName() || 'a component') : undefined;
      process.env.NODE_ENV !== 'production' ? warning(!inst.contextTypes, 'contextTypes was defined as an instance property on %s. Use a ' + 'static property to define contextTypes instead.', this.getName() || 'a component') : undefined;
      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentShouldUpdate !== 'function', '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', this.getName() || 'A component') : undefined;
      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentDidUnmount !== 'function', '%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', this.getName() || 'A component') : undefined;
      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentWillReceiveProps !== 'function', '%s has a method called ' + 'componentWillReceiveProps(). Did you mean componentWillReceiveProps()?', this.getName() || 'A component') : undefined;
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
    this._threeObject = this._renderedComponent._threeObject;
    if (inst.componentDidMount) {
      console.log('calling component did mount for markup', markup);
      transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
    }

    return markup;
  }
}
//
//React3CompositeComponentWrapper.prototype = {
//  ...ReactCompositeComponent.Mixin,
//  _instantiateReactComponent(element) {
//    return this._reactCanvasInstance.instantiateReactComponent(element);
//  },
//
//  mountComponent(rootID, transaction, context) {
//    console.log('mounting composite component');
//
//    this._context = context;
//    this._mountOrder = this._reactCanvasInstance.nextMountID++;
//    this._rootNodeID = rootID;
//
//    const publicProps = this._processProps(this._currentElement.props);
//    const publicContext = this._processContext(context);
//
//    const Component = this._currentElement.type;
//
//    // Initialize the public class
//    const inst = new Component(publicProps, publicContext, ReactUpdateQueue);
//
//    if (process.env.NODE_ENV !== 'production') {
//      // This will throw later in _renderValidatedComponent, but add an early
//      // warning now to help debugging
//      if (process.env.NODE_ENV !== 'production') {
//        warning(inst.render !== null, '%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render` in your ' + 'component or you may have accidentally tried to render an element ' + 'whose type is a function that isn\'t a React component.', Component.displayName || Component.name || 'Component');
//      }
//    }
//
//    // These should be set up in the constructor, but as a convenience for
//    // simpler class abstractions, we set them up after the fact.
//    inst.props = publicProps;
//    inst.context = publicContext;
//    inst.refs = emptyObject;
//    inst.updater = ReactUpdateQueue;
//
//    this._instance = inst;
//
//    // Store a reference from the instance back to the internal representation
//    ReactInstanceMap.set(inst, this);
//
//    if (process.env.NODE_ENV !== 'production') {
//      // Since plain JS classes are defined without any special initialization
//      // logic, we can not catch common errors early. Therefore, we have to
//      // catch them here, at initialization time, instead.
//      process.env.NODE_ENV !== 'production' ? warning(!inst.getInitialState || inst.getInitialState.isReactClassApproved, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', this.getName() || 'a component') : undefined;
//      process.env.NODE_ENV !== 'production' ? warning(!inst.getDefaultProps || inst.getDefaultProps.isReactClassApproved, 'getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', this.getName() || 'a component') : undefined;
//      process.env.NODE_ENV !== 'production' ? warning(!inst.propTypes, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', this.getName() || 'a component') : undefined;
//      process.env.NODE_ENV !== 'production' ? warning(!inst.contextTypes, 'contextTypes was defined as an instance property on %s. Use a ' + 'static property to define contextTypes instead.', this.getName() || 'a component') : undefined;
//      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentShouldUpdate !== 'function', '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', this.getName() || 'A component') : undefined;
//      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentDidUnmount !== 'function', '%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', this.getName() || 'A component') : undefined;
//      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentWillReceiveProps !== 'function', '%s has a method called ' + 'componentWillReceiveProps(). Did you mean componentWillReceiveProps()?', this.getName() || 'A component') : undefined;
//    }
//
//    let initialState = inst.state;
//    if (initialState === undefined) {
//      inst.state = initialState = null;
//    }
//    if (!(typeof initialState === 'object' && !Array.isArray(initialState))) {
//      if (process.env.NODE_ENV !== 'production') {
//        invariant(false, '%s.state: must be set to an object or null', this.getName() || 'ReactCompositeComponent');
//      } else {
//        invariant(false);
//      }
//    }
//
//    this._pendingStateQueue = null;
//    this._pendingReplaceState = false;
//    this._pendingForceUpdate = false;
//
//    if (inst.componentWillMount) {
//      inst.componentWillMount();
//      // When mounting, calls to `setState` by `componentWillMount` will set
//      // `this._pendingStateQueue` without triggering a re-render.
//      if (this._pendingStateQueue) {
//        inst.state = this._processPendingState(inst.props, inst.context);
//      }
//    }
//
//    const renderedElement = this._renderValidatedComponent();
//
//    this._renderedComponent = this._instantiateReactComponent(renderedElement);
//    this._threeObject = this._renderedComponent._threeObject;
//
//    const markup = ReactReconciler.mountComponent(this._renderedComponent, rootID, transaction, this._processChildContext(context));
//    if (inst.componentDidMount) {
//      console.log('calling component did mount for markup', markup);
//      transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
//    }
//
//    return markup;
//  },
//};

export default React3CompositeComponentWrapper;
