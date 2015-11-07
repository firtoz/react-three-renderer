import THREE from 'three.js';
import THREEElementDescriptor from '../THREEElementDescriptor';

import invariant from 'fbjs/lib/invariant';

import resource from '../decorators/resource';

import PropTypes from 'react/lib/ReactPropTypes';

import Uniform from '../../Uniform';

const textureLoader = new THREE.TextureLoader();

import React3Renderer from '../../React3Renderer';

@resource
class TextureDescriptor extends THREEElementDescriptor {
  constructor(react3RendererInstance:React3Renderer) {
    super(react3RendererInstance);

    this.hasProp('repeat', {
      type: PropTypes.instanceOf(THREE.Vector2),
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

    [
      'wrapS',
      'wrapT',
    ].forEach(propName => {
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
  }

  construct(props) {
    if (props.hasOwnProperty('url')) {
      return textureLoader.load(props.url);
    }

    invariant(false, 'The texture needs a url property.');
  }

  setParent(texture, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Material || parentObject3D instanceof Uniform,
      'Parent is not a material or a uniform');

    if (parentObject3D instanceof THREE.Material) {
      invariant(parentObject3D.map === null || parentObject3D.map === undefined, 'Parent already has a texture');
      parentObject3D.map = texture;
      // dispose to force a recreate
      parentObject3D.needsUpdate = true;
    } else { // Uniform as per the assert above
      parentObject3D.setValue(texture);
    }

    super.setParent(texture, parentObject3D);
  }


  applyInitialProps(threeObject, props) {
    threeObject.userData = {
      ...threeObject.userData,
    };

    super.applyInitialProps(threeObject, props);
  }

  unmount(texture) {
    const parent = texture.userData.markup.parentMarkup.threeObject;

    // could either be a resource description or an actual texture
    if (parent instanceof THREE.Material) {
      if (parent.map === texture) {
        parent.map = null;
        // dispose to force a recreate
        parent.needsUpdate = true;
      }
    } else if (parent instanceof Uniform) {
      if (parent.value === texture) {
        parent.setValue(null);
      }
    }

    texture.dispose();

    super.unmount(texture);
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

export default TextureDescriptor;
