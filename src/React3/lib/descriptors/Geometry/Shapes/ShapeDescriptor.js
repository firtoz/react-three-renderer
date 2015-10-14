import THREE from 'three';

import PathDescriptorBase from './PathDescriptorBase';

import resource from '../../decorators/resource';

@resource
class ShapeDescriptor extends PathDescriptorBase {
  construct(props) {
    return new THREE.Shape();
  }
}

export default ShapeDescriptor;
