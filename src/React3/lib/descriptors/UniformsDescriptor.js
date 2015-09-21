import THREE from 'three';

import THREEElementDescriptor from './THREEElementDescriptor';

import UniformContainer from '../UniformContainer';
import Uniform from '../Uniform';

import invariant from 'fbjs/lib/invariant';

class UniformsDescriptor extends THREEElementDescriptor {
  constructor(react3Instance) {
    super(react3Instance);
  }

  construct() {
    return new UniformContainer();
  }

  unmount() {
    super.unmount(self);
  }

  setParent(self:UniformContainer, parentObject3D) {
    invariant(parentObject3D instanceof THREE.ShaderMaterial, 'Parent is not a mesh');
    invariant(parentObject3D.uniforms === undefined, 'Parent already has uniforms');

    super.setParent(self, parentObject3D);

    parentObject3D.uniforms = self.uniforms;
  }

  addChildren(self, children) {
    children.forEach(child => {
      invariant(child instanceof Uniform, 'The <uniforms/> component can only have <uniform/> elements as children.');
    });
  }
}

export default UniformsDescriptor;
