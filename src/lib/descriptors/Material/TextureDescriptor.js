import * as THREE from 'three';

import invariant from 'fbjs/lib/invariant';
import warning from 'fbjs/lib/warning';
import PropTypes from 'react/lib/ReactPropTypes';

import resource from '../decorators/resource';
import THREEElementDescriptor from '../THREEElementDescriptor';
import Uniform from '../../Uniform';
import React3Renderer from '../../React3Renderer';
import propTypeInstanceOf from '../../utils/propTypeInstanceOf';

@resource
class TextureDescriptor extends THREEElementDescriptor {
  constructor(react3RendererInstance: React3Renderer) {
    super(react3RendererInstance);

    this.hasProp('slot', {
      type: PropTypes.oneOf([
        'map',
        'specularMap',
        'lightMap',
        'aoMap',
        'emissiveMap',
        'bumpMap',
        'normalMap',
        'displacementMap',
        'roughnessMap',
        'metalnessMap',
        'alphaMap',
        'envMap',
      ]),
      updateInitial: true,
      update: (texture, slot) => {
        const lastSlot = texture.userData._materialSlot;
        texture.userData._materialSlot = slot;

        if (texture.userData.markup) {
          const parentMarkup = texture.userData.markup.parentMarkup;
          if (parentMarkup) {
            const parent = parentMarkup.threeObject;

            if (parent instanceof THREE.Material) {
              if (process.env.NODE_ENV !== 'production') {
                this.validateParentSlot(parent, slot);
              }

              // remove from previous slot and assign to new slot
              // TODO add test for this
              this.removeFromSlotOfMaterial(parent, lastSlot, texture);
              this.addToSlotOfMaterial(parent, slot, texture);
            }
          }
        }
      },
      default: 'map',
    });

    this.hasProp('repeat', {
      type: propTypeInstanceOf(THREE.Vector2),
      updateInitial: true,
      update(threeObject, repeat) {
        if (repeat) {
          threeObject.repeat.copy(repeat);
        } else {
          threeObject.repeat.set(1, 1);
        }
      },
      default: new THREE.Vector2(1, 1),
    });

    this.hasProp('offset', {
      type: propTypeInstanceOf(THREE.Vector2),
      updateInitial: true,
      update(threeObject, offset) {
        if (offset) {
          threeObject.offset.copy(offset);
        } else {
          threeObject.offset.set(0, 0);
        }
      },
      default: new THREE.Vector2(0, 0),
    });

    [
      'wrapS',
      'wrapT',
    ].forEach((propName) => {
      this.hasProp(propName, {
        type: PropTypes.oneOf([
          THREE.RepeatWrapping,
          THREE.ClampToEdgeWrapping,
          THREE.MirroredRepeatWrapping,
        ]),
        updateInitial: true,
        update(threeObject, value) {
          threeObject[propName] = value;
          if (threeObject.image) {
            threeObject.needsUpdate = true;
          }
        },
        default: THREE.ClampToEdgeWrapping,
      });
    });

    this.hasProp('anisotropy', {
      type: PropTypes.number,
      updateInitial: true,
      update(threeObject, value) {
        threeObject.anisotropy = value;
        if (threeObject.image) {
          threeObject.needsUpdate = true;
        }
      },
      default: 1,
    });

    this.hasProp('url', {
      type: PropTypes.string.isRequired,
      update: this.triggerRemount,
      default: '',
    });

    this.hasProp('crossOrigin', {
      type: PropTypes.string,
      update: this.triggerRemount,
      default: undefined,
    });

    [
      'onLoad',
      'onProgress',
      'onError',
    ].forEach((eventName) => {
      this.hasProp(eventName, {
        type: PropTypes.func,
        update() {
          // do nothing because these props are only used for initial loading callbacks
        },
        default: undefined,
      });
    });

    this.hasProp('magFilter', {
      type: PropTypes.oneOf([
        THREE.LinearFilter,
        THREE.NearestFilter,
      ]),
      update(texture, magFilter) {
        texture.magFilter = magFilter;
        if (texture.image) {
          texture.needsUpdate = true;
        }
      },
      default: THREE.LinearFilter,
    });

    this.hasProp('minFilter', {
      type: PropTypes.oneOf([
        THREE.LinearMipMapLinearFilter,
        THREE.NearestFilter,
        THREE.NearestMipMapNearestFilter,
        THREE.NearestMipMapLinearFilter,
        THREE.LinearFilter,
        THREE.LinearMipMapNearestFilter,
      ]),
      update(texture, minFilter) {
        texture.minFilter = minFilter;
        if (texture.image) {
          texture.needsUpdate = true;
        }
      },
      default: THREE.LinearMipMapLinearFilter,
    });
  }

  construct(props) {
    let result;

    if (props.hasOwnProperty('url')) {
      const textureLoader = new THREE.TextureLoader();

      if (props.hasOwnProperty('crossOrigin')) {
        textureLoader.crossOrigin = props.crossOrigin;
      }

      let onLoad;
      let onProgress;
      let onError;

      if (props.hasOwnProperty('onLoad')) {
        onLoad = props.onLoad;
      }

      if (props.hasOwnProperty('onProgress')) {
        onProgress = props.onProgress;
      }

      if (props.hasOwnProperty('onError')) {
        onError = props.onError;
      }

      result = textureLoader.load(props.url, onLoad, onProgress, onError);
      if (props.hasOwnProperty('minFilter')) {
        result.minFilter = props.minFilter;
      }
    } else {
      invariant(false, 'The texture needs a url property.');
    }

    return result;
  }

  setParent(texture, parent) {
    if (parent instanceof THREE.Material) {
      const { _materialSlot: slot } = texture.userData;

      if (process.env.NODE_ENV !== 'production') {
        this.validateParentSlot(parent, slot);
      }

      this.addToSlotOfMaterial(parent, slot, texture);
    } else if (parent instanceof Uniform) { // Uniform as per the assert above
      parent.setValue(texture);
    } else {
      invariant(false,
        'Parent of a texture is not a material nor a uniform, it needs to be one of them.');
    }

    super.setParent(texture, parent);
  }

  applyInitialProps(threeObject, props) {
    threeObject.userData = {
      ...threeObject.userData,
    };

    super.applyInitialProps(threeObject, props);
  }

  unmount(texture) {
    const parent = texture.userData.markup.parentMarkup.threeObject;

    const { _materialSlot: slot } = texture.userData;

    // could either be a resource description or an actual texture
    if (parent instanceof THREE.Material) {
      this.removeFromSlotOfMaterial(parent, slot, texture);
    } else if (parent instanceof Uniform) {
      if (parent.value === texture) {
        parent.setValue(null);
      }
    }

    texture.dispose();

    super.unmount(texture);
  }

  removeFromSlotOfMaterial(material, slot, texture) {
    if (material[slot] === texture) {
      material.userData[`_has${slot}}TextureChild`] = false;

      if (material.userData[`_${slot}}Property`]) {
        // restore the map property
        material[slot] = material.userData[`_${slot}}Property`];
      } else {
        material[slot] = null;
      }

      material.needsUpdate = true;
    }
  }

  addToSlotOfMaterial(material, slot, texture) {
    material.userData[`_has${slot}}TextureChild`] = true;

    if (material.userData[`_${slot}}Property`]) {
      let slotInfo = 'texture';

      if (slot !== 'map') {
        slotInfo += `with a '${slot}' slot`;
      }

      warning(false, 'The material already has a' +
        ` '${slot}' property but a ${slotInfo} is being added as a child.` +
        ' The child will override the property.');
    } else {
      // removing invariant to enable slot swapping
    }

    if (material[slot] !== texture) {
      material[slot] = texture;
    }
  }

  validateParentSlot(parent, slot) {
    const react3internalComponent = parent.userData.react3internalComponent;
    if (react3internalComponent) {
      const descriptor = react3internalComponent.threeElementDescriptor;
      if (descriptor && !descriptor._supportedMaps[slot]) {
        // TODO add test for this
        warning(false, `A texture cannot be assigned as a '${slot}' to '${parent.type}'`);
      }
    }
  }

  highlight(threeObject) {
    const parent = threeObject.userData.markup.parentMarkup.threeObject;
    parent.userData._descriptor.highlight(parent);
  }

  hideHighlight(threeObject) {
    const parent = threeObject.userData.markup.parentMarkup.threeObject;
    parent.userData._descriptor.hideHighlight(parent);
  }
}

module.exports = TextureDescriptor;
