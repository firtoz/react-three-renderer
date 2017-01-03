import * as THREE from 'three';

import invariant from 'fbjs/lib/invariant';
import warning from 'fbjs/lib/warning';
import PropTypes from 'react/lib/ReactPropTypes';

import THREEElementDescriptor from '../THREEElementDescriptor';
import resource from '../decorators/resource';
import ResourceReference from '../../Resources/ResourceReference';
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
      default: 0,
    });

    this.hasProp('side', {
      type: PropTypes.oneOf([THREE.FrontSide, THREE.BackSide, THREE.DoubleSide]),
      updateInitial: true,
      update: (threeObject, side) => {
        threeObject.side = side;
      },
      default: THREE.FrontSide,
    });

    this.hasProp('depthTest', {
      type: PropTypes.bool,
      simple: true,
      default: true,
    });

    this.hasProp('depthWrite', {
      type: PropTypes.bool,
      simple: true,
      default: true,
    });

    this.hasProp('blending', {
      type: PropTypes.oneOf([
        THREE.NoBlending,
        THREE.NormalBlending,
        THREE.AdditiveBlending,
        THREE.SubtractiveBlending,
        THREE.MultiplyBlending,
        THREE.CustomBlending,
      ]),
      simple: true,
      default: THREE.NormalBlending,
    });

    this.hasProp('depthFunc', {
      type: PropTypes.oneOf([
        THREE.NeverDepth,
        THREE.AlwaysDepth,
        THREE.LessDepth,
        THREE.LessEqualDepth,
        THREE.EqualDepth,
        THREE.GreaterEqualDepth,
        THREE.GreaterDepth,
        THREE.NotEqualDepth,
      ]),
      simple: true,
      default: THREE.LessEqualDepth,
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

    this.hasProp('map', {
      type: propTypeInstanceOf(THREE.Texture),
      update(threeObject, map) {
        threeObject.userData._mapProperty = map;

        if (!threeObject.userData._hasTextureChild) {
          if (threeObject.map !== map) {
            threeObject.needsUpdate = true;
          }
          threeObject.map = map;
        } else {
          warning(map === undefined, 'The material already has a' +
            ' texture assigned to it as a child therefore the \'map\' property will have no effect');
        }
      },
      updateInitial: true,
      default: undefined,
    });

    this.hasProp('vertexColors', {
      type: PropTypes.oneOf([
        THREE.NoColors,
        THREE.FaceColors,
        THREE.VertexColors,
      ]),
      simple: true,
      default: THREE.NoColors,
    });

    this._colors = [];
  }

  getMaterialDescription(props) {
    const materialDescription = {};

    this._colors.forEach((colorPropName) => {
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
      _hasTextureChild: false,
      _mapProperty: undefined,
    };

    super.applyInitialProps(threeObject, props);
  }

  setParent(material, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Mesh
      || parentObject3D instanceof THREE.Points
      || parentObject3D instanceof THREE.Sprite
      || parentObject3D instanceof THREE.Line, 'Parent is not a mesh');
    invariant(parentObject3D[material.userData._materialSlot] === undefined
      || parentObject3D[material.userData._materialSlot] === null,
      `Parent already has a ${material.userData._materialSlot} defined`);
    super.setParent(material, parentObject3D);

    parentObject3D[material.userData._materialSlot] = material;
  }

  unmount(material) {
    const parent = material.userData.markup.parentMarkup.threeObject;

    // could either be a resource description or an actual material
    if (parent instanceof THREE.Mesh ||
      parent instanceof THREE.Sprite ||
      parent instanceof THREE.Line ||
      parent instanceof THREE.Points) {
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

        if (ownerMesh && ownerMesh.geometry && ownerMesh.geometry.computeBoundingBox) {
          ownerMesh.geometry.computeBoundingBox();
        }

        boundingBox.setFromObject(ownerMesh);

        return [boundingBox];
      },
    });
  }

  getBoundingBoxes(threeObject) {
    const boundingBox = new THREE.Box3();

    const ownerMesh = threeObject.userData.markup.parentMarkup.threeObject;

    if (ownerMesh && ownerMesh.geometry && ownerMesh.geometry.computeBoundingBox) {
      ownerMesh.geometry.computeBoundingBox();
    }

    boundingBox.setFromObject(ownerMesh);

    return [boundingBox];
  }

  hideHighlight(threeObject) {
    threeObject.userData.events.emit('hideHighlight');
  }

  addChildren(threeObject, children) {
    invariant(children.filter(this._invalidChild).length === 0,
      'Material children can only be textures or texture resource references!');
  }

  addChild(threeObject, child) {
    this.addChildren(threeObject, [child]);
  }

  moveChild() {
    // doesn't matter
  }

  removeChild() {
    // doesn't matter since the texture will take care of things on unmount
  }

  invalidChildInternal(child) {
    return !(child instanceof THREE.Texture
    || child instanceof ResourceReference);
  }

  _invalidChild = child => this.invalidChildInternal(child);
}

module.exports = MaterialDescriptorBase;
