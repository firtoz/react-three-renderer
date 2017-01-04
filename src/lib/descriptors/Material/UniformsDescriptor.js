import * as THREE from 'three';

import invariant from 'fbjs/lib/invariant';

import THREEElementDescriptor from '../THREEElementDescriptor';
import UniformContainer from '../../UniformContainer';
import Uniform from '../../Uniform';

class UniformsDescriptor extends THREEElementDescriptor {
  construct() {
    return new UniformContainer();
  }

  setParent(threeObject: UniformContainer, parentObject3D) {
    invariant(parentObject3D instanceof THREE.ShaderMaterial,
      'Parent of <uniforms/> is not a shader material');

    super.setParent(threeObject, parentObject3D);

    parentObject3D.uniforms = threeObject.uniforms;
  }

  addChildren(threeObject, children) {
    children.forEach((child) => {
      invariant(child instanceof Uniform,
        'The <uniforms/> component can only have <uniform/> elements as children.');
    });
  }

  highlight(threeObject) {
    const parent = threeObject.userData.markup.parentMarkup.threeObject;
    parent.userData._descriptor.highlight(parent);
  }

  getBoundingBoxes(threeObject) {
    const parent = threeObject.userData.markup.parentMarkup.threeObject;
    return parent.userData._descriptor.getBoundingBoxes(parent);
  }

  hideHighlight(threeObject) {
    const parent = threeObject.userData.markup.parentMarkup.threeObject;
    parent.userData._descriptor.hideHighlight(parent);
  }
}

module.exports = UniformsDescriptor;
