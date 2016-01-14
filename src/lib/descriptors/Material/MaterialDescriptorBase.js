import THREE from 'three';
import THREEElementDescriptor from '../THREEElementDescriptor';
import invariant from 'fbjs/lib/invariant';

import resource from '../decorators/resource';

import ResourceReference from '../../Resources/ResourceReference';

import PropTypes from 'react/lib/ReactPropTypes';
import propTypeInstanceOf from '../../utils/propTypeInstanceOf';

@resource
class MaterialDescriptorBase extends THREEElementDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.hasProp('slot', {
      type: PropTypes.string,
      updateInitial: true,
      update: (threeObject, slot, hasProperty) => {
        if (hasProperty) {
          threeObject.userData._materialSlot = slot;
        } else {
          threeObject.userData._materialSlot = 'material';
        }
      },
      default: 'material',
    });

    this.hasProp('transparent', {
      type: PropTypes.bool,
      simple: true,
    });

    this.hasProp('alphaTest', {
      type: PropTypes.number,
      updateInitial: true,
      update: (threeObject, alphaTest) => {
        threeObject.alphaTest = alphaTest;
        threeObject.needsUpdate = true;
      },
    });

    this.hasProp('side', {
      type: PropTypes.oneOf([THREE.FrontSide, THREE.BackSide, THREE.DoubleSide]),
      updateInitial: true,
      update: (threeObject, side) => {
        threeObject.side = side;
      },
      default: undefined,
    });

    this.hasProp('opacity', {
      type: PropTypes.number,
      simple: true,
    });

    this.hasProp('visible', {
      type: PropTypes.bool,
      simple: true,
      default: true,
    });

    this._colors = [];
  }

  getMaterialDescription(props) {
    const materialDescription = {};

    this._colors.forEach(colorPropName => {
      if (props.hasOwnProperty(colorPropName)) {
        materialDescription[colorPropName] = props[colorPropName];
      }
    });

    if (props.hasOwnProperty('side')) {
      materialDescription.side = props.side;
    }

    return materialDescription;
  }

  hasColor(propName = 'color', defaultVal = 0xffffff) {
    if (process.env.NODE_ENV !== 'production') {
      invariant(this._colors.indexOf(propName) === -1,
        'This color is already defined for %s.',
        this.constructor.name);
    }

    this._colors.push(propName);

    this.hasProp(propName, {
      type: PropTypes.oneOfType([
        propTypeInstanceOf(THREE.Color),
        PropTypes.number,
        PropTypes.string,
      ]),
      update: (threeObject, value) => {
        threeObject[propName].set(value);
      },
      default: defaultVal,
    });
  }

  hasWireframe() {
    this.hasProp('wireframe', {
      type: PropTypes.bool,
      simple: true,
      default: false,
    });

    this.hasProp('wireframeLinewidth', {
      type: PropTypes.number,
      simple: true,
      default: 1,
    });
  }

  construct() {
    return new THREE.Material({});
  }

  applyInitialProps(threeObject, props) {
    threeObject.userData = {
      ...threeObject.userData,
    };

    super.applyInitialProps(threeObject, props);
  }

  setParent(material, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Mesh
      || parentObject3D instanceof THREE.Points
      || parentObject3D instanceof THREE.Line, 'Parent is not a mesh');
    invariant(parentObject3D[material.userData._materialSlot] === undefined
      || parentObject3D[material.userData._materialSlot] === null,
      'Parent already has a ' + material.userData._materialSlot + ' defined');
    super.setParent(material, parentObject3D);

    parentObject3D[material.userData._materialSlot] = material;
  }

  unmount(material) {
    const parent = material.userData.markup.parentMarkup.threeObject;

    // could either be a resource description or an actual material
    if (parent instanceof THREE.Mesh || parent instanceof THREE.Points) {
      const slot = material.userData._materialSlot;

      if (parent[slot] === material) {
        // TODO: set material slot to null rather than undefined

        parent[slot] = undefined;
      }
    }

    material.dispose();

    super.unmount(material);
  }

  highlight(threeObject) {
    const ownerMesh = threeObject.userData.markup.parentMarkup.threeObject;
    threeObject.userData.events.emit('highlight', {
      uuid: threeObject.uuid,
      boundingBoxFunc: () => {
        const boundingBox = new THREE.Box3();

        boundingBox.setFromObject(ownerMesh);

        return [boundingBox];
      },
    });
  }

  getBoundingBoxes(threeObject) {
    const boundingBox = new THREE.Box3();

    boundingBox.setFromObject(threeObject.userData.markup.parentMarkup.threeObject);

    return [boundingBox];
  }

  hideHighlight(threeObject) {
    threeObject.userData.events.emit('hideHighlight');
  }

  addChildren(threeObject, children) {
    invariant(children.filter(this._invalidChild).length === 0,
      'Mesh children can only be materials or geometries!');
  }

  addChild(threeObject, child) {
    this.addChildren(threeObject, [child]);
  }

  moveChild() {
    // doesn't matter
  }

  removeChild() {
    // doesn't matter
  }

  invalidChildInternal(child) {
    const invalid = !(child instanceof THREE.Texture
    || child instanceof ResourceReference);

    return invalid;
  }

  _invalidChild = child => {
    return this.invalidChildInternal(child);
  };
}

module.exports = MaterialDescriptorBase;
