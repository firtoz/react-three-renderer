import THREE from 'three';
import THREEElementDescriptor from './THREEElementDescriptor';

import invariant from 'fbjs/lib/invariant';

import resource from './decorators/resource';

import MaterialDescriptorBase from './MaterialDescriptorBase';

@resource class TextureDescriptor extends THREEElementDescriptor {
  construct(props) {
    if (props.hasOwnProperty('url')) {
      return THREE.ImageUtils.loadTexture(props.url);
    }
    /*
     this.clothTexture = THREE.ImageUtils.loadTexture('textures/patterns/circuit_pattern.png');
     this.clothTexture.wrapS = this.clothTexture.wrapT = THREE.RepeatWrapping;
     this.clothTexture.anisotropy = 16;
     */
    //return new THREE.Geometry();
  }

  setParent(texture, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Material, 'Parent is not a material');
    invariant(parentObject3D.map === undefined, 'Parent already has a texture');

    super.setParent(texture, parentObject3D);

    parentObject3D.geometry = texture;
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
    }

    texture.dispose();

    super.unmount(texture);
  }

  highlight(threeObject) {
    const ownerMaterial = threeObject.userData.parentMarkup.threeObject;

    new MaterialDescriptorBase(this.react3RendererInstance).highlight(ownerMaterial);
  }

  hideHighlight(threeObject) {
    const ownerMaterial = threeObject.userData.parentMarkup.threeObject;

    new MaterialDescriptorBase(this.react3RendererInstance).hideHighlight(ownerMaterial);
  }
}

export default TextureDescriptor;
