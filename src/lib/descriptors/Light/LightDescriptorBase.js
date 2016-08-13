import THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';
import warning from 'fbjs/lib/warning';

import Object3DDescriptor from '../Object/Object3DDescriptor';
import propTypeInstanceOf from '../../utils/propTypeInstanceOf';

const updateLightTargetFromQuaternion = (() => {
  const lightPositionVector = new THREE.Vector3();
  const forward = new THREE.Vector3();

  return (light) => {
    light.updateMatrixWorld();

    lightPositionVector.setFromMatrixPosition(light.matrixWorld);

    // rotate forward to match the rotation
    // then set the target position
    light.target.position.copy(forward.set(0, 0, 1)
      .applyQuaternion(light.quaternion)
      .add(lightPositionVector));

    light.target.updateMatrixWorld();
  };
})();

class LightDescriptorBase extends Object3DDescriptor {
  static defaultShadowCameraNear = 0.5;
  static defaultShadowCameraFar = 500;
  static defaultShadowBias = 0;

  constructor(react3Instance) {
    super(react3Instance);

    this.removeProp('receiveShadow');

    this._hasColor = false;
    this._hasDirection = false;

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
      updateInitial: true,
      update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.bias = value;
        }
      },
      default: LightDescriptorBase.defaultShadowBias,
    });

    this.hasProp('shadowDarkness', {
      type: PropTypes.number,
      simple: true,
      default: 0.5,
    });

    this.hasProp('shadowMapWidth', {
      type: PropTypes.number,
      updateInitial: true,
      update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.mapSize.x = value;
        }
      },
      default: 512,
    });

    this.hasProp('shadowMapHeight', {
      type: PropTypes.number,
      updateInitial: true,
      update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.mapSize.y = value;
        }
      },
      default: 512,
    });

    this.hasProp('shadowCameraNear', {
      type: PropTypes.number,
      updateInitial: true,
      update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.near = value;
        }
      },
      default: LightDescriptorBase.defaultShadowCameraNear,
    });

    this.hasProp('shadowCameraFar', {
      type: PropTypes.number,
      updateInitial: true,
      update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.far = value;
        }
      },
      default: LightDescriptorBase.defaultShadowCameraFar,
    });

    this.hasProp('castShadow', {
      override: true,
      type: PropTypes.bool,
      update: this.triggerRemount,
      default: false,
    });
  }

  hasDirection() {
    this._hasDirection = true;

    // recreate the props to use target
    this.removeProp('position');
    this.removeProp('rotation');
    this.removeProp('quaternion');
    this.removeProp('lookAt');

    this.hasProp('position', {
      type: propTypeInstanceOf(THREE.Vector3),
      update(threeObject, position) {
        threeObject.position.copy(position);

        if (threeObject.userData._lookAt) {
          threeObject.lookAt(threeObject.userData._lookAt);
        }

        threeObject.userData._needsDirectionUpdate = true;
      },
      default: new THREE.Vector3(),
    });

    this.hasProp('rotation', {
      type: propTypeInstanceOf(THREE.Euler),
      update(light, rotation) {
        light.rotation.copy(rotation);

        light.userData._needsDirectionUpdate = true;
      },
      default: new THREE.Euler(),
    });

    this.hasProp('quaternion', {
      type: propTypeInstanceOf(THREE.Quaternion),
      update(light, quaternion) {
        light.quaternion.copy(quaternion);

        light.userData._needsDirectionUpdate = true;
      },
      default: new THREE.Quaternion(),
    });

    this.hasProp('lookAt', {
      type: propTypeInstanceOf(THREE.Vector3),
      update(threeObject, lookAt) {
        threeObject.userData._lookAt = lookAt;

        if (lookAt) {
          threeObject.lookAt(lookAt);

          threeObject.userData._needsDirectionUpdate = true;
        }
      },
      default: undefined,
    });
  }

  completePropertyUpdates(threeObject) {
    super.completePropertyUpdates(threeObject);

    if (threeObject.userData._needsDirectionUpdate) {
      threeObject.userData._needsDirectionUpdate = false;
      updateLightTargetFromQuaternion(threeObject);
    }
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

    if (this._hasDirection) {
      threeObject.userData._needsDirectionUpdate = false;

      if (props.position || props.lookAt || props.rotation || props.quaternion) {
        updateLightTargetFromQuaternion(threeObject);
      }
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
}

if (process.env.NODE_ENV !== 'production') {
  LightDescriptorBase.getDynamicWarningMessage = (elementType, owner) =>
    `<${elementType}/> has been updated which triggered a refresh of all materials.
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
  to <${elementType}/> inside the render() of ${(owner && owner.getName()) || 'a component'}.

For more information, visit https://github.com/mrdoob/threejs/wiki/Updates .`;
}

module.exports = LightDescriptorBase;
