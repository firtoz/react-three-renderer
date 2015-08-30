import ReactReconciler from 'react/lib/ReactReconciler';
import warning from 'react/lib/warning.js';
import DOMProperty from 'react/lib/DOMProperty';
import invariant from 'react/lib/invariant';
import THREE from 'three';
import ReactMultiChild from 'react/lib/ReactMultiChild';

const ID_ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;

function legacyGetDOMNode() {
  if (process.env.NODE_ENV !== 'production') {
    const component = this._reactInternalComponent;
    if (process.env.NODE_ENV !== 'production') {
      warning(false, 'ReactDOMComponent: Do not access .getDOMNode() of a DOM node; ' + 'instead, use the node directly.%s', getDeclarationErrorAddendum(component));
    }
  }

  return this;
}

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

function legacySetProps(partialProps, callback) {
  const component = this._reactInternalComponent;
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .setProps() of a DOM node. ' + 'Instead, call React.render again at the top level.%s', getDeclarationErrorAddendum(component)) : undefined;
  }
  //if (!component) {
  //  return;
  //}
  //ReactUpdateQueue.enqueueSetPropsInternal(component, partialProps);
  //if (callback) {
  //  ReactUpdateQueue.enqueueCallbackInternal(component, callback);
  //}
}

function legacyReplaceProps(partialProps, callback) {
  const component = this._reactInternalComponent;
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .replaceProps() of a DOM node. ' + 'Instead, call React.render again at the top level.%s', getDeclarationErrorAddendum(component)) : undefined;
  }
  if (!component) {
    return;
  }
  ReactUpdateQueue.enqueueReplacePropsInternal(component, partialProps);
  if (callback) {
    ReactUpdateQueue.enqueueCallbackInternal(component, callback);
  }
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

/**
 * @abstract
 */
class THREEElementDescriptor {
  construct() {
    invariant(false, 'Missing constructor!');
  }

  addChildren() {
    invariant(false, 'Cannot add children to this type!');
  }

  moveChild() {
    invariant(false, 'Cannot add children to this type!');
  }

  setParent() {
    // do nothing by default
  }

  deleteProperty(threeObject, propKey) {
    console.log('deleteProperty', threeObject, propKey);
  }

  updateProperty(threeObject, propKey, nextProp) {
    console.log('updateProperty', threeObject, propKey, nextProp);
  }
}

class Object3DDescriptor extends THREEElementDescriptor {
  construct() {
    return new THREE.Object3D();
  }

  /**
   * @param self
   * @param {Array} children
   */
  addChildren(self, children) {
    children.forEach(child => {
      self.add(child);
    });
  }

  moveChild(self, childObject, toIndex, lastIndex) {

  }
}

class PerspectiveCameraDescriptor extends THREEElementDescriptor {
  construct(props) {
    return new THREE.PerspectiveCamera(props.fov, props.aspectRatio, props.near, props.far);
  }
}

class MeshDescriptor extends THREEElementDescriptor {
  construct() {
    return new THREE.Mesh();
  }

  addChildren() {
    // i'll allow it
  }

  moveChild(self, childObject, toIndex, lastIndex) {
    // ignore!

    return toIndex;
  }
}

class MaterialDescriptor extends THREEElementDescriptor {
  constructor() {
    super();

    this.propUpdates = {
      'color': this._updateColor,
    };
  }

  _updateColor = (threeObject, nextColor) => {
    threeObject.color.set(nextColor);
  };

  construct() {
    return new THREE.Material({});
  }

  setParent(material, parentObject3D) {
    parentObject3D.material = material;
  }

  updateProperty(threeObject, propKey, nextProp) {
    if (this.propUpdates.hasOwnProperty(propKey)) {
      this.propUpdates[propKey](threeObject, nextProp);
    } else {
      console.error('updating material prop', propKey, nextProp, 'for', threeObject);
    }
  }
}

class GeometryDescriptor extends THREEElementDescriptor {
  construct() {
    return new THREE.Geometry({});
  }

  setParent(material, parentObject3D) {
    parentObject3D.geometry = material;
  }
}

class MeshBasicMaterialDescriptor extends MaterialDescriptor {
  construct(props) {
    const materialDescription = {};

    if (props.hasOwnProperty('color')) {
      materialDescription.color = props.color;
    }

    return new THREE.MeshBasicMaterial(materialDescription);
  }
}

class BoxGeometryDescriptor extends GeometryDescriptor {
  construct(props) {
    return new THREE.BoxGeometry(props.width, props.height, props.depth);
  }
}

/**
 * @type {Object.<string, THREEElementDescriptor>}
 */
const threeElementDescriptors = {
  object3D: new Object3DDescriptor(),
  perspectiveCamera: new PerspectiveCameraDescriptor(),
  mesh: new MeshDescriptor(),
  meshBasicMaterial: new MeshBasicMaterialDescriptor(),
  boxGeometry: new BoxGeometryDescriptor(),
};

const registrationNameModules = {};

function deleteListener(rootNodeID, propKey) {
  console.log('deleteListener', rootNodeID, propKey);
}

function enqueuePutListener(rootNodeID, propKey, nextProp, transaction) {
  console.log('enqueuePutListener', rootNodeID, propKey, nextProp, transaction);
}

function _arrayMove(array, oldIndex, newIndex) {
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
}

const ReactMultiChildMixin = ReactMultiChild.Mixin;

class InternalComponent {
  constructor(element, reactCanvasInstance) {
    this._currentElement = element;
    /**
     * @type ReactCanvas
     */
    this._reactCanvasInstance = reactCanvasInstance;

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

  construct(node) {
    console.log('constructing', node);
  }

  mountChildren(nestedChildren, transaction, context) {
    const children = this._reactCanvasInstance.instantiateChildren(nestedChildren, transaction, context);
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
    console.log("mount component", rootID);

    const element = this._currentElement;
    this._rootNodeID = rootID;

    this._threeObject = this.threeElementDescriptor.construct(element.props);

    const childrenToUse = element.props.children;

    const mountImages = this.mountChildren(childrenToUse, transaction, processChildContext(context, this));

    const markup = {
      userData: {
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
        descriptorForChild.setParent(mountImage.threeObject, this._threeObject);

        mountImage.userData.parentMarkup = markup;
      });
    }

    // console.log('mountComponent', this, 'childrenmarkup', mountImages);

    this._threeObject.userData = markup.userData;

    this._markup = markup;

    return markup;
  }

  receiveComponent(nextElement, transaction, context) {
    console.log('receive component');

    const prevElement = this._currentElement;
    this._currentElement = nextElement;
    this.updateComponent(transaction, prevElement, nextElement, context);
  }

  updateComponent(transaction, prevElement, nextElement, context) {
    console.log('ahh updating', transaction, prevElement, nextElement, context);
    const lastProps = prevElement.props;
    const nextProps = this._currentElement.props;

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

  unmountComponent() {
    console.log('unmounting component!');
  }

  getPublicInstance() {
    if (!this._nodeWithLegacyProperties) {
      const node = this._reactCanvasInstance.getUserData(this._rootNodeID);

      node._reactInternalComponent = this;
      node.getDOMNode =  () => {
        console.log(`can't get dom node silly! this isn't dom!`);
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

  createChild(child, mountImage) {
    console.log("create child", child, mountImage);
    debugger;
  }

  updateChildren = ReactMultiChildMixin.updateChildren;
  _updateChildren = ReactMultiChildMixin._updateChildren;
  _unmountChildByName = ReactMultiChildMixin._unmountChildByName;
  _mountChildByNameAtIndex = ReactMultiChildMixin._mountChildByNameAtIndex;
}

export default InternalComponent;
