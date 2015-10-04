import THREE from 'three';

import THREEElementDescriptor from '../THREEElementDescriptor';

import UniformContainer from '../../UniformContainer';
import Uniform from '../../Uniform';

import invariant from 'fbjs/lib/invariant';

class UniformsDescriptor extends THREEElementDescriptor {
  constructor(react3Instance) {
    super(react3Instance);
  }

  construct() {
    return new UniformContainer();
  }

  unmount() {
    super.unmount(threeObject);
  }

  setParent(threeObject:UniformContainer, parentObject3D) {
    invariant(parentObject3D instanceof THREE.ShaderMaterial, 'Parent is not a mesh');
    invariant(parentObject3D.uniforms === undefined, 'Parent already has uniforms');

    super.setParent(threeObject, parentObject3D);

    parentObject3D.uniforms = threeObject.uniforms;
  }

  addChildren(threeObject, children) {
    children.forEach(child => {
      invariant(child instanceof Uniform, 'The <uniforms/> component can only have <uniform/> elements as children.');
    });
  }

  highlight(threeObject) {
    const parent = threeObject.userData.parentMarkup.threeObject;
    parent.userData._descriptor.highlight(parent);
  }

  getBoundingBoxes(threeObject) {
    const parent = threeObject.userData.parentMarkup.threeObject;
    return parent.userData._descriptor.getBoundingBoxes(parent);
  }

  hideHighlight(threeObject) {
    const parent = threeObject.userData.parentMarkup.threeObject;
    parent.userData._descriptor.hideHighlight(parent);
  }
}

export default UniformsDescriptor;
