import ReactReconciler from 'react/lib/ReactReconciler';
import warning from 'react/lib/warning.js';
import DOMProperty from 'react/lib/DOMProperty';
import invariant from 'react/lib/invariant';
import THREE from 'three';

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
  if (!component) {
    return;
  }
  ReactUpdateQueue.enqueueSetPropsInternal(component, partialProps);
  if (callback) {
    ReactUpdateQueue.enqueueCallbackInternal(component, callback);
  }
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

  setParent() {
    //do nothing by default
  }
}

class Object3DDescriptor extends THREEElementDescriptor {
  construct() {
    return new THREE.Object3D();
  }

  /**
   *
   * @param self
   * @param {Array} children
   */
  addChildren(self, children) {
    children.forEach(child => {
      self.add(child);
    });
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
}

class MeshBasicMaterialDescriptor extends THREEElementDescriptor {
  construct() {
    return new THREE.MeshBasicMaterial({});
  }

  setParent(material, parentObject3D) {
    parentObject3D.material = material;
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
};

class InternalComponent {
  constructor(element, reactCanvasInstance) {
    this._currentElement = element;
    /**
     * @type ReactCanvas
     */
    this._reactCanvasInstance = reactCanvasInstance;

    // console.log("internal: ", element);

    this._renderedChildren = [];
    this._rootNodeID = null;
    this._threeObject3D = null;
    this._topLevelWrapper = null;
    this._nodeWithLegacyProperties = null;
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

  mountComponent(rootID, transaction, context) {
    console.log("mount component", rootID);

    const element = this._currentElement;
    this._rootNodeID = rootID;

    const threeElementDescriptor = threeElementDescriptors[element.type];
    if (!threeElementDescriptor) {
      invariant(false, 'No constructor for ' + element.type);
    }

    this._threeObject3D = threeElementDescriptor.construct(element.props);

    const childrenToUse = element.props.children;

    const mountImages = this.mountChildren(childrenToUse, transaction, processChildContext(context, this));

    const markup = {
      userData: {
        [ID_ATTR_NAME]: rootID,
        childrenMarkup: mountImages,
        object3D: this._threeObject3D,
      },
      elementType: element.type,
      threeObject: this._threeObject3D,
    };

    if (mountImages && mountImages.length > 0) {
      threeElementDescriptor.addChildren(this._threeObject3D, mountImages.map(img => img.threeObject));

      mountImages.forEach(mountImage => {
        const descriptorForChild = threeElementDescriptors[mountImage.elementType];
        descriptorForChild.setParent(mountImage.threeObject, this._threeObject3D);

        mountImage.userData.parentMarkup = markup;
      });
    }

    // console.log('mountComponent', this, 'childrenmarkup', mountImages);

    this._threeObject3D.userData = markup.userData;

    return markup;
  }

  receiveComponent(nextElement, transaction, context) {
    console.log('receive component');

    const prevElement = this._currentElement;
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
      node.getDOMNode = function() {
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
}

export default InternalComponent;
