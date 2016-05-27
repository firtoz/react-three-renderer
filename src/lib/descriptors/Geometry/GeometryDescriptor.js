import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';
import propTypeInstanceOf from '../../utils/propTypeInstanceOf';

class GeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasProp('vertices', {
      override: true,
      type: PropTypes.arrayOf(propTypeInstanceOf(THREE.Vector3)).isRequired,
      update(threeObject, vertices) {
        if (threeObject.vertices !== vertices) {
          threeObject.vertices = vertices;

          threeObject.verticesNeedUpdate = true;
        }
      },
      updateInitial: true,
      default: [],
    });
  }

  construct() {
    return new THREE.Geometry();
  }
}

module.exports = GeometryDescriptor;
