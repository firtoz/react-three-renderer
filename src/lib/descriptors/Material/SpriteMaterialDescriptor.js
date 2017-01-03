import * as THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import MaterialDescriptorBase from './MaterialDescriptorBase';

class SpriteMaterialDescriptor extends MaterialDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasColor();

    this.hasProp('rotation', {
      type: PropTypes.number,
      simple: true,
      default: 0,
    });

    this.hasProp('fog', {
      type: PropTypes.bool,
      update(threeObject, fog, existsInProps) {
        if (existsInProps) {
          threeObject.fog = fog;
        }
        threeObject.needsUpdate = true;
      },
      updateInitial: true,
      default: false,
    });

    this.hasMap();
  }

  construct(props) {
    const materialDescription = this.getMaterialDescription(props);

    return new THREE.SpriteMaterial(materialDescription);
  }
}

module.exports = SpriteMaterialDescriptor;
