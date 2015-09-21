import THREE from 'three';
import THREEElementDescriptor from './THREEElementDescriptor';

import invariant from 'fbjs/lib/invariant';

import resource from './decorators/resource';

@resource class TextureDescriptor extends THREEElementDescriptor {
  construct(props) {
    if (props.hasOwnProperty('url')) {
      return THREE.ImageUtils.loadTexture(props.url);
    }
  }

  setParent(texture, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Material || parentObject3D instanceof Uniform,
      'Parent is not a material or a uniform');

    if (parentObject3D instanceof THREE.Material) {
      invariant(parentObject3D.map === undefined, 'Parent already has a texture');
      parentObject3D.map = texture;
    } else { // Uniform as per the assert above
      parentObject3D.setValue(texture);
    }

    super.setParent(texture, parentObject3D);
  }


  applyInitialProps(self, props) {
    self.userData = {
      ...self.userData,
    };

    if (props.hasOwnProperty('anisotropy')) {
      self.anisotropy = props.anisotropy;
    }

    if (props.hasOwnProperty('wrapS')) {
      self.wrapS = props.wrapS;
    }

    if (props.hasOwnProperty('wrapT')) {
      self.wrapT = props.wrapT;
    }

    super.applyInitialProps(self, props);
  }

  unmount(texture) {
    const parent = texture.userData.parentMarkup.threeObject;

    // could either be a resource description or an actual texture
    if (parent instanceof THREE.Material) {
      if (parent.map === texture) {
        parent.map = undefined;
      }
    } else if (parent instanceof Uniform) {
      if (uniform.value === texture) {
        uniform.setValue(null);
      }
    }

    texture.dispose();

    super.unmount(texture);
  }

  highlight(threeObject) {
    const parent = threeObject.userData.parentMarkup.threeObject;
    parent.userData._descriptor.highlight(parent);
  }

  hideHighlight(threeObject) {
    const parent = threeObject.userData.parentMarkup.threeObject;
    parent.userData._descriptor.hideHighlight(parent);
  }
}

export default TextureDescriptor;
