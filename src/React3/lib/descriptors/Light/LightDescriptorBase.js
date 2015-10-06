import THREE from 'three';
import Object3DDescriptor from '../Object/Object3DDescriptor';

import PropTypes from 'react/lib/ReactPropTypes'

class LightDescriptorBase extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this._hasColor = false;
  }

  hasColor() {
    this._hasColor = true;

    this.hasProp('color', {
      type: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(THREE.Color)]),
      update(threeObject, newColor) {
        threeObject.color.set(newColor);
      },
      default: 0xffffff,
    });
  }

  unmount(threeObject) {
    this.updateAllMaterials(threeObject);

    super.unmount(threeObject);
  }

  setParent(threeObject, parentObject3d) {
    super.setParent(threeObject, parentObject3d);

    this.updateAllMaterials(threeObject);
  }

  updateAllMaterials(threeObject) {
    // TODO: give a warning when a property like 'updatingLightIsExpensive' to have the users acknowledge the situation.
    if (threeObject.userData.markup._rootInstance) {
      threeObject.userData.markup._rootInstance._materials.forEach(material => {
        console.log('updating material', material);
        material.needsUpdate = true;
      });
    }
  }
}

export default LightDescriptorBase;
