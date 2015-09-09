import THREE from 'three';
import THREEElementDescriptor from './THREEElementDescriptor';
import invariant from 'fbjs/lib/invariant';

class MaterialDescriptorBase extends THREEElementDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

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

  applyInitialProps(self, props) {
    self.userData = {};

    if (props.hasOwnProperty('slot')) {
      self.userData._materialSlot = props.slot;
    } else {
      self.userData._materialSlot = 'material';
    }
  }

  setParent(material, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Mesh || parentObject3D instanceof THREE.PointCloud, 'Parent is not a mesh');
    invariant(parentObject3D[material.userData._materialSlot] === undefined, 'Parent already has a ' + material.userData._materialSlot + ' defined');

    parentObject3D[material.userData._materialSlot] = material;
  }

  unmount(material) {
    const parent = material.userData.parentMarkup.threeObject;

    const slot = material.userData._materialSlot;

    if (parent[slot] === material) {
      parent[slot] = undefined;
    }

    material.dispose();
  }
}

export default MaterialDescriptorBase;
