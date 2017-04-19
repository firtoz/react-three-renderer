import * as THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import MaterialDescriptorBase from './MaterialDescriptorBase';

class PointsMaterialDescriptor extends MaterialDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasColor();

    this.hasProp('size', {
      type: PropTypes.number,
      simple: true,
      default: 1,
    });

    this.hasProp('sizeAttenuation', {
      type: PropTypes.bool,
      update(threeObject, sizeAttenuation, existsInProps) {
        if (existsInProps) {
          threeObject.sizeAttenuation = sizeAttenuation;
        }
        threeObject.needsUpdate = true;
      },
      updateInitial: true,
      default: true,
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
      default: true,
    });

    this.hasMap();
  }

  construct(props) {
    const materialDescription = this.getMaterialDescription(props);

    if (props.hasOwnProperty('map')) {
      materialDescription.map = props.map;
    }

    return new THREE.PointsMaterial(materialDescription);
  }
}

module.exports = PointsMaterialDescriptor;
