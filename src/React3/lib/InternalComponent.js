import ReactReconciler from 'react/lib/ReactReconciler';
import DOMProperty from 'react/lib/DOMProperty';
import ReactMultiChild from 'react/lib/ReactMultiChild';

import invariant from 'fbjs/lib/invariant';

import flattenChildren from 'react/lib/flattenChildren';
import ReactCurrentOwner from 'react/lib/ReactCurrentOwner';

const ID_ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;

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
  static displayName = 'React3Component';

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
    this._wantsReplace = false;

    this.threeElementDescriptor = react3RendererInstance.threeElementDescriptors[element.type];
    if (!this.threeElementDescriptor) {
      if (process.env.NODE_ENV !== 'production') {
        invariant(false, 'No constructor for ' + element.type);
      } else {
        invariant(false);
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      this.highlightComponent = () => {
        this.threeElementDescriptor.highlight(this._threeObject);
      };

      this.hideHighlight = () => {
        this.threeElementDescriptor.hideHighlight(this._threeObject);
      };
    }
  }

  construct(element) {
    // console.log('constructing', element);
    this._currentElement = element;
  }

  mountComponent(rootID, transaction, context) {
    // console.log("mount component", rootID);

    const element = this._currentElement;
    this._rootNodeID = rootID;

    if (process.env.NODE_ENV !== 'production') {
      this.threeElementDescriptor.checkPropTypes(element.type, this._currentElement._owner, element.props);
    }

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
        react3internalComponent: this, // used for highlighting etc
        toJSON: () => {
          return '---USERDATA---';
        },
      },
      _rootInstance: null,
      elementType: element.type,
      threeObject: this._threeObject,
      toJSON: () => {
        return '---MARKUP---';
      },
    };

    markup.userData.markup = markup;
    this._threeObject.userData = markup.userData;

    if (mountImages && mountImages.length > 0) {
      this.threeElementDescriptor.addChildren(this._threeObject, mountImages.map(img => img.threeObject));

      mountImages.forEach(mountImage => {
        const descriptorForChild = this._react3RendererInstance.threeElementDescriptors[mountImage.elementType];

        mountImage.userData.parentMarkup = markup;

        descriptorForChild.setParent(mountImage.threeObject, this._threeObject);
      });
    }

    this._markup = markup;

    return markup;
  }

  _reconcilerInstantiateChildren(nestedChildren, transaction, context) {
    if (process.env.NODE_ENV !== 'production') {
      if (this._currentElement) {
        try {
          ReactCurrentOwner.current = this._currentElement._owner;
          return this._react3RendererInstance.instantiateChildren(
            nestedChildren, transaction, context
          );
        } finally {
          ReactCurrentOwner.current = null;
        }
      }
    }
    return this._react3RendererInstance.instantiateChildren(
      nestedChildren, transaction, context
    );
  }

  _reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements, transaction, context) {
    let nextChildren;
    if (process.env.NODE_ENV !== 'production') {
      if (this._currentElement) {
        try {
          ReactCurrentOwner.current = this._currentElement._owner;
          nextChildren = flattenChildren(nextNestedChildrenElements);
        } finally {
          ReactCurrentOwner.current = null;
        }

        return this._react3RendererInstance.updateChildren(
          prevChildren, nextChildren, transaction, context
        );
      }
    }

    nextChildren = flattenChildren(nextNestedChildrenElements);
    return this._react3RendererInstance.updateChildren(
      prevChildren, nextChildren, transaction, context
    );
  }

  mountChildren(nestedChildren, transaction, context) {
    const children = this._reconcilerInstantiateChildren(
      nestedChildren, transaction, context);
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
    if (child._mountIndex === toIndex) {
      return;
    }

    this.threeElementDescriptor.moveChild(this._threeObject, child._threeObject, toIndex, child._mountIndex);

    const markup = this._markup;

    _arrayMove(markup.userData.childrenMarkup, lastIndex, toIndex);
  }


  receiveComponent(nextElement, transaction, context) {
    // console.log('receive component');

    const prevElement = this._currentElement;
    this._currentElement = nextElement;

    this.updateComponent(transaction, prevElement, nextElement, context);
  }

  updateComponent(transaction, prevElement, nextElement, context) {
    const lastProps = prevElement.props;
    const nextProps = this._currentElement.props;

    if (prevElement.type !== nextElement.type) {
      if (process.env.NODE_ENV !== 'production') {
        invariant(false, 'The component type changed unexpectedly');
      } else {
        invariant(false);
      }
    }

    this._updateObjectProperties(lastProps, nextProps, transaction, context);
    this._updateChildrenObjects(nextProps, transaction, processChildContext(context, this));
  }

  _updateChildrenObjects(nextProps, transaction, context) {
    const nextChildren = nextProps.children || null;

    this.updateChildren(nextChildren, transaction, context);
  }

  _updateObjectProperties(lastProps, nextProps, transaction, context) {
    this.threeElementDescriptor.beginPropertyUpdates(this._threeObject);

    if (process.env.NODE_ENV !== 'production') {
      this.threeElementDescriptor.checkPropTypes(this._currentElement.type, this._currentElement._owner, nextProps);
    }

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

    this.threeElementDescriptor.completePropertyUpdates(this._threeObject);
  }

  /**
   * @see ReactDOMComponent.Mixin.unmountComponent
   * node_modules/react/lib/ReactDOMComponent.js:732
   */
  unmountComponent() {
    this.unmountChildren();
    this.threeElementDescriptor.unmount(this._threeObject);

    this._rootNodeID = null;
    if (this._nodeWithLegacyProperties) {
      const node = this._nodeWithLegacyProperties;
      node._reactInternalComponent = null;
      this._nodeWithLegacyProperties = null;
    }
  }


  emptyJson() {
    debugger;
    return '...';
  }

  getPublicInstance() {
    const node = this._react3RendererInstance.getUserData(this._rootNodeID);

    if (node.object3D) {
      node.object3D.toJSON = this.emptyJson;
      return node.object3D;
    }

    if (process.env.NODE_ENV !== 'production') {
      invariant(false, 'Node has no object3d?');
    } else {
      invariant(false);
    }
  }

  /**
   * @see ReactMultiChildMixin._updateChildren
   *
   * Improve performance by isolating this hot code path from the try/catch
   * block in `updateChildren`.
   *
   * @param {?object} nextNestedChildren Nested child maps.
   * @param {ReactReconcileTransaction} transaction
   * @param {any} context
   * @final
   * @protected
   */
  _updateChildren(nextNestedChildren, transaction, context) {
    const prevChildren = this._renderedChildren;
    const nextChildren = this._reconcilerUpdateChildren(prevChildren, nextNestedChildren, transaction, context);

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
          this._unmountChild(prevChild);
        }
        // The child must be instantiated before it's mounted.
        this._mountChildByNameAtIndex(nextChild, childName, nextIndex, transaction, context);
      }
      nextIndex++;
    }
    // Remove children that are no longer present.
    for (const childName in prevChildren) {
      if (prevChildren.hasOwnProperty(childName) && !(nextChildren && nextChildren.hasOwnProperty(childName))) {
        this._unmountChild(prevChildren[childName]);
      }
    }
  }

  createChild(child, mountImage) {
    const mountIndex = child._mountIndex;

    this._markup.userData.childrenMarkup.splice(mountIndex, 0, mountImage);
    mountImage.userData.parentMarkup = this._markup;

    this.threeElementDescriptor.addChild(this._threeObject, mountImage.threeObject, mountIndex);

    const descriptorForChild = this._react3RendererInstance.threeElementDescriptors[mountImage.elementType];

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

    child.threeElementDescriptor.removedFromParent(child._threeObject);

    const childrenMarkup = this._markup.userData.childrenMarkup;

    for (let i = 0; i < childrenMarkup.length; i++) {
      const childMarkup = childrenMarkup[i];

      if (childMarkup.threeObject === child._threeObject) {
        childrenMarkup.splice(i, 1);
        return;
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      invariant(false, `Trying to remove a child that is not mounted`);
    } else {
      invariant(false);
    }
  }

  updateChildren = ReactMultiChildMixin.updateChildren.bind(this);
  _mountChildByNameAtIndex = ReactMultiChildMixin._mountChildByNameAtIndex.bind(this);
  _unmountChild = ReactMultiChildMixin._unmountChild.bind(this);
  unmountChildren = ReactMultiChildMixin.unmountChildren.bind(this);
}

export default InternalComponent;
