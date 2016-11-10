import * as THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import MaterialDescriptorBase from './MaterialDescriptorBase';

class LineBasicMaterialDescriptor extends MaterialDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasColor();

    this.hasProp('linewidth', {
      type: PropTypes.number,
      simple: true,
      default: 1,
    });

    // what are these properties used for?
    [
      'linecap',
      'linejoin',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.oneOf([
          'round',
        ]),
        simple: true,
        default: 'round',
      });
    });

    this.hasProp('vertexColors', {
      type: PropTypes.oneOf([
        THREE.NoColors,
        THREE.FaceColors,
        THREE.VertexColors,
      ]),
      simple: true,
      default: THREE.NoColors,
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
  }

  construct(props) {
    const materialDescription = this.getMaterialDescription(props);

    return new THREE.LineBasicMaterial(materialDescription);
  }
}

module.exports = LineBasicMaterialDescriptor;
