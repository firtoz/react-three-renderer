import THREE from 'three';

import PathDescriptorBase from './PathDescriptorBase';

import resource from '../../decorators/resource';

@resource
class ShapeDescriptor extends PathDescriptorBase {
  construct(props) {
    if (props.hasOwnProperty('points')) {
      return new THREE.Shape(props.points);
    }

    return new THREE.Shape();
  }
}

export default ShapeDescriptor;
