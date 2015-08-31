import ReactReconciler from 'react/lib/ReactReconciler';
import warning from 'react/lib/warning.js';
import DOMProperty from 'react/lib/DOMProperty';
import invariant from 'react/lib/invariant';
import ReactMultiChild from 'react/lib/ReactMultiChild';

import threeElementDescriptors from './ElementDescriptors';

const ID_ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;

function legacyIsMounted() {
  const component = this._reactInternalComponent;
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .isMounted() of a DOM node.%s', getDeclarationErrorAddendum(component)) : undefined;
  }
  return !!component;
}

function legacySetStateEtc() {
  if (process.env.NODE_ENV !== 'production') {
    const component = this._reactInternalComponent;
    process.env.NODE_ENV !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .setState(), .replaceState(), or ' + '.forceUpdate() of a DOM node. This is a no-op.%s', getDeclarationErrorAddendum(component)) : undefined;
  }
}

function legacySetProps() {
  invariant(false, "can't set props!");
}

function legacyReplaceProps() {
  invariant(false, "can't replace props!");
}

let canDefineProperty = false;
try {
  Object.defineProperty({}, 'test', {
    get() {
    },
  });
  canDefineProperty = true;
} catch (e) {
  // do nothing
}

let legacyPropsDescriptor;
if (process.env.NODE_ENV !== 'production') {
  legacyPropsDescriptor = {
    props: {
      enumerable: false,
      get() {
        const component = this._reactInternalComponent;
        if (process.env.NODE_ENV !== 'production') {
          warning(false, 'ReactDOMComponent: Do not access .props of a DOM node; instead, ' + 'recreate the props as `render` did originally or read the DOM ' + 'properties/attributes directly from this node (e.g., ' + 'this.refs.box.className).%s', getDeclarationErrorAddendum(component));
        }
        return component._currentElement.props;
      },
    },
  };
}


function processChildContext(context) {
  // if (process.env.NODE_ENV !== 'production') {
  //   // // Pass down our tag name to child components for validation purposes
  //   // context = assign({}, context);
  //   // const info = context[validateDOMNesting.ancestorInfoContextKey];
  //   // context[validateDOMNesting.ancestorInfoContextKey] = validateDOMNesting.updatedAncestorInfo(info, inst._tag, inst);
  // }
  return context;
}


const registrationNameModules = {};

function deleteListener(rootNodeID, propKey) {
  console.log('deleteListener', rootNodeID, propKey);
  debugger;
}

function enqueuePutListener(rootNodeID, propKey, nextProp, transaction) {
  console.log('enqueuePutListener', rootNodeID, propKey, nextProp, transaction);
  debugger;
}

function _arrayMove(array, oldIndex, newIndex) {
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
}

const ReactMultiChildMixin = ReactMultiChild.Mixin;

class InternalComponent {
  constructor(element, react3RendererInstance) {
    this._currentElement = element;
    /**
     * @type React3Renderer
     */
    this._react3RendererInstance = react3RendererInstance;

    // console.log("internal: ", element);

    this._elementType = element.type;
    this._renderedChildren = [];
    this._rootNodeID = null;
    this._threeObject = null;
    this._topLevelWrapper = null;
    this._markup = null;
    this._nodeWithLegacyProperties = null;

    this.threeElementDescriptor = threeElementDescriptors[element.type];
    if (!this.threeElementDescriptor) {
      invariant(false, 'No constructor for ' + element.type);
    }
  }

  construct(element) {
    // console.log('constructing', element);
    this._currentElement = element;
  }

  mountChildren(nestedChildren, transaction, context) {
    const children = this._react3RendererInstance.instantiateChildren(nestedChildren, transaction, context);
    this._renderedChildren = children;
    const mountImages = [];
    let index = 0;
    for (const name in children) {
      if (children.hasOwnProperty(name)) {
        const child = children[name];
        // Inlined for performance, see `ReactInstanceHandles.createReactID`.
        const rootID = this._rootNodeID + name;
        const mountImage = ReactReconciler.mountComponent(child, rootID, transaction, context);
        child._mountIndex = index;
        mountImages.push(mountImage);
        index++;
      }
    }
    return mountImages;
  }

  moveChild(child, toIndex, lastIndex) {
    if (toIndex === lastIndex) {
      return;
    }

    this.threeElementDescriptor.moveChild(this._threeObject, child._threeObject, toIndex, lastIndex);

    const markup = this._markup;

    _arrayMove(markup.userData.childrenMarkup, lastIndex, toIndex);
  }

  mountComponent(rootID, transaction, context) {
    // console.log("mount component", rootID);

    const element = this._currentElement;
    this._rootNodeID = rootID;

    this._threeObject = this.threeElementDescriptor.construct(element.props);
    this.threeElementDescriptor.applyInitialProps(this._threeObject, element.props);

    const childrenToUse = element.props.children;

    const mountImages = this.mountChildren(childrenToUse, transaction, processChildContext(context, this));

    const markup = {
      userData: {
        ...this._threeObject.userData,
        [ID_ATTR_NAME]: rootID,
        childrenMarkup: mountImages,
        object3D: this._threeObject,
        toJSON: () => {
          return '---USERDATA---';
        },
      },
      elementType: element.type,
      threeObject: this._threeObject,
      toJSON: () => {
        return '---MARKUP---';
      },
    };

    markup.userData.markup = markup;

    if (mountImages && mountImages.length > 0) {
      this.threeElementDescriptor.addChildren(this._threeObject, mountImages.map(img => img.threeObject));

      mountImages.forEach(mountImage => {
        const descriptorForChild = threeElementDescriptors[mountImage.elementType];

        mountImage.userData.parentMarkup = markup;

        descriptorForChild.setParent(mountImage.threeObject, this._threeObject);
      });
    }

    // console.log('mountComponent', this, 'childrenmarkup', mountImages);

    this._threeObject.userData = markup.userData;

    this._markup = markup;

    return markup;
  }


  receiveComponent(nextElement, transaction, context) {
    //console.log('receive component');

    const prevElement = this._currentElement;
    this._currentElement = nextElement;

    this.updateComponent(transaction, prevElement, nextElement, context);
  }

  updateComponent(transaction, prevElement, nextElement, context) {
    //console.log('ahh updating', transaction, prevElement, nextElement, context);

    const lastProps = prevElement.props;
    const nextProps = this._currentElement.props;

    if (prevElement.type !== nextElement.type) {
      debugger;
    }

    this._updateObjectProperties(lastProps, nextProps, transaction);
    this._updateChildrenObjects(lastProps, nextProps, transaction, processChildContext(context, this));
  }

  _updateChildrenObjects(lastProps, nextProps, transaction, context) {
    //const lastChildren = lastProps.children || null;
    const nextChildren = nextProps.children || null;

    //if (lastChildren !== null && nextChildren === null) {
    //  this.updateChildren(null, transaction, context);
    //}

    //if (nextChildren !== null) {
    this.updateChildren(nextChildren, transaction, context);
    //}
  }

  _updateObjectProperties(lastProps, nextProps, transaction) {
    for (const propKey in lastProps) {
      if (!lastProps.hasOwnProperty(propKey) || nextProps.hasOwnProperty(propKey)) {
        continue;
      }

      if (propKey === 'children') {
        continue;
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

    for (const propKey in nextProps) {
      if (!nextProps.hasOwnProperty(propKey)) {
        continue;
      }

      if (propKey === 'children') {
        continue;
      }

      const nextProp = nextProps[propKey];
      const lastProp = lastProps[propKey];

      if (nextProp === lastProp) {
        continue;
      }

      if (registrationNameModules.hasOwnProperty(propKey)) {
        if (nextProp) {
          enqueuePutListener(this._rootNodeID, propKey, nextProp, transaction);
        } else if (lastProp) {
          deleteListener(this._rootNodeID, propKey);
        }
      } else {
        this.threeElementDescriptor.updateProperty(this._threeObject, propKey, nextProp);
      }
    }
  }

  /**
   * @see ReactDOMComponent.Mixin.unmountComponent
   * node_modules/react/lib/ReactDOMComponent.js:732
   */
  unmountComponent() {
    //console.log('unmounting component!', this);

    this.threeElementDescriptor.unmount(this._threeObject);
    this.unmountChildren();

    this._rootNodeID = null;
    if (this._nodeWithLegacyProperties) {
      const node = this._nodeWithLegacyProperties;
      node._reactInternalComponent = null;
      this._nodeWithLegacyProperties = null;
    }

    // debugger;
  }

  getPublicInstance() {
    if (!this._nodeWithLegacyProperties) {
      const node = this._react3RendererInstance.getUserData(this._rootNodeID);

      node._reactInternalComponent = this;
      node.getDOMNode = () => {
        invariant(false, `can't get dom node silly! this isn't dom!`);
      };
      node.getBoundingClientRect = () => {
        return node.parentMarkup.getBoundingClientRect();
      };
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


  /**
   * @see ReactMultiChildMixin._updateChildren
   *
   * Improve performance by isolating this hot code path from the try/catch
   * block in `updateChildren`.
   *
   * @param {?object} nextNestedChildren Nested child maps.
   * @param {ReactReconcileTransaction} transaction
   * @final
   * @protected
   */
  _updateChildren(nextNestedChildren, transaction, context) {
    const prevChildren = this._renderedChildren;
    const nextChildren = this._react3RendererInstance.updateChildren(prevChildren, nextNestedChildren, transaction, context);

    this._renderedChildren = nextChildren;

    if (!nextChildren && !prevChildren) {
      return;
    }

    // `nextIndex` will increment for each child in `nextChildren`, but
    // `lastIndex` will be the last index visited in `prevChildren`.
    let lastIndex = 0;
    let nextIndex = 0;
    for (const childName in nextChildren) {
      if (!nextChildren.hasOwnProperty(childName)) {
        continue;
      }

      const prevChild = prevChildren && prevChildren[childName];
      const nextChild = nextChildren[childName];

      if (prevChild === nextChild) {
        this.moveChild(prevChild, nextIndex, lastIndex);
        lastIndex = Math.max(prevChild._mountIndex, lastIndex);
        prevChild._mountIndex = nextIndex;
      } else {
        if (prevChild) {
          // Update `lastIndex` before `_mountIndex` gets unset by unmounting.
          lastIndex = Math.max(prevChild._mountIndex, lastIndex);
          this._unmountChildByName(prevChild, childName);
        }
        // The child must be instantiated before it's mounted.
        this._mountChildByNameAtIndex(nextChild, childName, nextIndex, transaction, context);
      }
      nextIndex++;
    }
    // Remove children that are no longer present.
    for (const childName in prevChildren) {
      if (prevChildren.hasOwnProperty(childName) && !(nextChildren && nextChildren.hasOwnProperty(childName))) {
        this._unmountChildByName(prevChildren[childName], childName);
      }
    }
  }

  createChild(child, mountImage) {
    this._markup.userData.childrenMarkup.push(mountImage);
    this.threeElementDescriptor.addChildren(this._threeObject, [mountImage.threeObject]);

    const descriptorForChild = threeElementDescriptors[mountImage.elementType];

    mountImage.userData.parentMarkup = this._markup;

    descriptorForChild.setParent(mountImage.threeObject, this._threeObject);
  }

  /**
   * Removes a child component.
   *
   * @param {ReactComponent} child Child to remove.
   * @protected
   */
  removeChild(child) {
    this.threeElementDescriptor.removeChild(this._threeObject, child._threeObject);

    const childrenMarkup = this._markup.userData.childrenMarkup;

    for (let i = 0; i < childrenMarkup.length; i++) {
      const childMarkup = childrenMarkup[i];

      if (childMarkup.threeObject === child._threeObject) {
        childrenMarkup.splice(i, 1);
        return;
      }
    }

    invariant(false, `The child is not mounted here!`);
  }

  updateChildren = ReactMultiChildMixin.updateChildren.bind(this);
  _mountChildByNameAtIndex = ReactMultiChildMixin._mountChildByNameAtIndex.bind(this);
  _unmountChildByName = ReactMultiChildMixin._unmountChildByName.bind(this);
  unmountChildren = ReactMultiChildMixin.unmountChildren.bind(this);
}

export default InternalComponent;
