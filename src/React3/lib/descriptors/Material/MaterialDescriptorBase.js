import THREE from 'three';
import THREEElementDescriptor from '../THREEElementDescriptor';
import invariant from 'fbjs/lib/invariant';

import resource from '../decorators/resource';

import ResourceReference from '../../Resources/ResourceReference';

import PropTypes from 'react/lib/ReactPropTypes';

@resource class MaterialDescriptorBase extends THREEElementDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propTypes = {
      ...this.propTypes,
      side: PropTypes.oneOf([THREE.FrontSide, THREE.BackSide, THREE.DoubleSide]),
      opacity: PropTypes.number,
      alphaTest: PropTypes.number,
      transparent: PropTypes.bool,
      slot: PropTypes.string,
    };

    this._hasColor = false;
  }

  getMaterialDescription(props) {
    const materialDescription = {};

    if (props.hasOwnProperty('color')) {
      materialDescription.color = props.color;
    }

    if (props.hasOwnProperty('side')) {
      materialDescription.side = props.side;
    }

    if (props.hasOwnProperty('alphaTest')) {
      materialDescription.alphaTest = props.alphaTest;
    }

    return materialDescription;
  }

  hasColor() {
    this._hasColor = true;

    this.propTypes = {
      ...this.propTypes,

      color: PropTypes.number,
    };

    this.propUpdates = {
      ...this.propUpdates,

      'color': this._updateColor,
    };
  }

  _updateColor = (threeObject, nextColor) => {
    threeObject.color.set(nextColor);
  };

  construct() {
    return new THREE.Material({});
  }

  applyInitialProps(self, props) {
    self.userData = {
      ...self.userData,
    };

    if (props.hasOwnProperty('slot')) {
      self.userData._materialSlot = props.slot;
    } else {
      self.userData._materialSlot = 'material';
    }

    super.applyInitialProps(self, props);
  }

  setParent(material, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Mesh || parentObject3D instanceof THREE.Points, 'Parent is not a mesh');
    invariant(parentObject3D[material.userData._materialSlot] === undefined, 'Parent already has a ' + material.userData._materialSlot + ' defined');
    super.setParent(material, parentObject3D);

    parentObject3D[material.userData._materialSlot] = material;
  }

  unmount(material) {
    const parent = material.userData.parentMarkup.threeObject;

    // could either be a resource description or an actual material
    if (parent instanceof THREE.Mesh || parent instanceof THREE.Points) {
      const slot = material.userData._materialSlot;

      if (parent[slot] === material) {
        parent[slot] = undefined;
      }
    }

    material.dispose();

    super.unmount(material);
  }

  highlight(threeObject) {
    const ownerMesh = threeObject.userData.parentMarkup.threeObject;
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

    boundingBox.setFromObject(threeObject.userData.parentMarkup.threeObject);

    return [boundingBox];
  }

  hideHighlight(threeObject) {
    threeObject.userData.events.emit('hideHighlight');
  }

  addChildren(self, children) {
    invariant(children.filter(this._invalidChild).length === 0, 'Mesh children can only be materials or geometries!');
  }

  moveChild() {
    // doesn't matter
  }

  invalidChildInternal(child) {
    const invalid = !(child instanceof THREE.Texture || child instanceof ResourceReference );

    if (invalid) {
      debugger;
    }

    return invalid;
  }

  _invalidChild = child => {
    return this.invalidChildInternal(child);
  };
}

export default MaterialDescriptorBase;
