import THREE from 'three';
import Object3DDescriptor from '../Object/Object3DDescriptor';

import PropTypes from 'react/lib/ReactPropTypes';

import warning from 'fbjs/lib/warning';
import propTypeInstanceOf from '../../utils/propTypeInstanceOf';

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
    });


    this.hasProp('shadowBias', {
      type: PropTypes.number,
      simple: true,
      default: 0,
    });

    this.hasProp('shadowDarkness', {
      type: PropTypes.number,
      simple: true,
      default: 0.5,
    });

    [
      'shadowMapWidth',
      'shadowMapHeight',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number,
        updateInitial: true,
        update(threeObject, value, hasProp) {
          if (hasProp) {
            threeObject[propName] = value;
          }
        },
        default: 512,
      });
    });

    this.hasProp('shadowCameraNear', {
      type: PropTypes.number,
      updateInitial: true,
      update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.near = value;
        }
        // threeObject.shadow.camera.updateProjectionMatrix();
      },
      default: 50,
    });

    this.hasProp('shadowCameraFar', {
      type: PropTypes.number,
      updateInitial: true,
      update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.far = value;
        }
        // threeObject.shadow.camera.updateProjectionMatrix();
      },
      default: 5000,
    });

    this.hasProp('castShadow', {
      override: true,
      type: PropTypes.bool,
      update: this.triggerRemount,
      default: false,
    });
  }

  hasColor() {
    this._hasColor = true;

    this.hasProp('color', {
      type: PropTypes.oneOfType([
        propTypeInstanceOf(THREE.Color),
        PropTypes.number,
        PropTypes.string,
      ]),
      update(threeObject, newColor) {
        threeObject.color.set(newColor);
      },
      default: 0xffffff,
    });
  }

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    if (props.hasOwnProperty('castShadow')) {
      threeObject.castShadow = props.castShadow;
    }
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
    const rootInstance = threeObject.userData.markup._rootInstance;
    if (rootInstance && !rootInstance._willUnmount) {
      if (process.env.NODE_ENV !== 'production') {
        if (!this._warnedAboutLightMaterialUpdate
          && !threeObject.userData._updatesRefreshAllMaterials) {
          const owner = threeObject.userData.react3internalComponent._currentElement._owner;

          const elementType = threeObject.userData.react3internalComponent._elementType;

          warning(this._warnedAboutLightMaterialUpdate,
            LightDescriptorBase.getDynamicWarningMessage(elementType, owner));
          this._warnedAboutLightMaterialUpdate = true;
        }
      }

      rootInstance.allMaterialsNeedUpdate();
    }
  }

  static getDynamicWarningMessage(elementType, owner) {
    return `<${elementType}/> has been updated which triggered a refresh of all materials.
  This is a potentially expensive operation.
  This can happen when you add or remove a light, or add or remove any component
  before any lights without keys e.g.
  <object3d>
    {/* new or removed component here */}
    <ambientLight/>
  </object3d>, or update some properties of lights.

  If you would like to add components, you should either add the components
  after the lights (recommended), e.g.
  <object3d>
    <ambientLight/>
    {/* new or removed component here */}
  </object3d>, or add a 'key' property to the lights e.g.
  <object3d>
    {/* new or removed component here */}
    <ambientLight key="light"/>
  </object3d>.

  If you have modified a light's properties e.g. toggled castShadow,
  the materials need to be rebuilt as well.

  To acknowledge and remove this message, please add the property 'updatesRefreshAllMaterials'
    to <${elementType}/> inside the render() of ${owner && owner.getName() || 'a component'}.

  For more information, visit https://github.com/mrdoob/threejs/wiki/Updates .`;
  }
}

module.exports = LightDescriptorBase;
