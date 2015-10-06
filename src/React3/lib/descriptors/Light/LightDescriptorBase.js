import THREE from 'three';
import Object3DDescriptor from '../Object/Object3DDescriptor';

import PropTypes from 'react/lib/ReactPropTypes';

import warning from 'fbjs/lib/warning';

import ReactCurrentOwner from 'react/lib/ReactCurrentOwner';

class LightDescriptorBase extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this._hasColor = false;

    if (process.env.NODE_ENV !== 'production') {
      this._warnedAboutLightMaterialUpdate = false;
    }

    this.hasProp('updatesRefreshAllMaterials', {
      type: PropTypes.bool,
      updateInitial: true,
      update(threeObject, updatesRefreshAllMaterials) {
        threeObject.userData._updatesRefreshAllMaterials = updatesRefreshAllMaterials;
      },
      default: false,
    })
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
      if (process.env.NODE_ENV !== 'production') {
        if (!this._warnedAboutLightMaterialUpdate && !threeObject.userData._updatesRefreshAllMaterials) {
          const owner = threeObject.userData.react3internalComponent._currentElement._owner;

          const elementType = threeObject.userData.react3internalComponent._elementType;

          warning(this._warnedAboutLightMaterialUpdate,
            `<${elementType}/> has been updated which triggered a refresh of all materials.
  This is a potentially expensive operation.
  This can happen when you add or remove a light, or add or remove any component before any lights without keys e.g.
  <object3d>
    {/* new or removed component here */}
    <ambientLight/>
  </object3d>, or update some properties of lights.
  If you would like to add components you should either add the components after the lights (recommended), e.g.
  <object3d>
    <ambientLight/>
    {/* new or removed component here */}
  </object3d>, or add a 'key' property to the lights e.g.
  <object3d>
    {/* new or removed component here */}
    <ambientLight key="light"/>
  </object3d>.
  If you have modified a light's properties e.g. toggled castShadow, the materials need to be rebuilt as well.
  To acknowledge and remove this message, please add the property 'updatesRefreshAllMaterials'
    to <${elementType}/> inside the render() of ${owner && owner.getName() || 'a component'}.
  For more information, visit https://github.com/mrdoob/threejs/wiki/Updates .`);
          this._warnedAboutLightMaterialUpdate = true;
        }
      }

      threeObject.userData.markup._rootInstance._materials.forEach(material => {
        material.needsUpdate = true;
      });
    }
  }
}

export default LightDescriptorBase;
