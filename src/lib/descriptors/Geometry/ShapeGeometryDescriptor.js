import THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import GeometryDescriptorBase from './GeometryDescriptorBase';

class ShapeGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasProp('shapes', {
      type: PropTypes.oneOfType([
        PropTypes.arrayOf(THREE.Shape),
        PropTypes.instanceOf(THREE.Shape),
      ]).isRequired,
      update: this.triggerRemount,
    });

    this.hasProp('curveSegments', {
      type: PropTypes.number,
      update: this.triggerRemount,
      default: 12,
    });

    this.hasProp('material', {
      type: PropTypes.number.isRequired,
      update: this.triggerRemount,
    });

    this.hasProp('UVGenerator', {
      type: PropTypes.object,
      update: this.triggerRemount,
      default: THREE.ExtrudeGeometry.WorldUVGenerator,
    });
  }

  construct(props) {
    // props from https://threejs.org/docs/#Reference/Geometries/ShapeGeometry
    const {
      shapes,

      curveSegments,
      material,
      UVGenerator,
    } = props;

    return new THREE.ShapeGeometry(shapes, {
      curveSegments,
      material,
      UVGenerator,
    });
  }
}

module.exports = ShapeGeometryDescriptor;
