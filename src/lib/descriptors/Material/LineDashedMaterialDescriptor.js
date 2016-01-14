import THREE from 'three';
import MaterialDescriptorBase from './MaterialDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class LineDashedMaterialDescriptor extends MaterialDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasColor();

    [
      'linewidth',
      'scale',
      'gapSize',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number,
        simple: true,
        'default': 1,
      });
    });

    this.hasProp('dashSize', {
      type: PropTypes.number,
      simple: true,
      'default': 3,
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
        'default': 'round',
      });
    });

    this.hasProp('vertexColors', {
      type: PropTypes.oneOf([
        THREE.NoColors,
        THREE.FaceColors,
        THREE.VertexColors,
      ]),
      simple: true,
      'default': THREE.NoColors,
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
      'default': true,
    });
  }

  construct(props) {
    const materialDescription = this.getMaterialDescription(props);

    return new THREE.LineDashedMaterial(materialDescription);
  }
}

module.exports = LineDashedMaterialDescriptor;
