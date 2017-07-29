import * as THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import GeometryDescriptorBase from './GeometryDescriptorBase';
import propTypeInstanceOf from '../../utils/propTypeInstanceOf';

class TubeGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasProp('path', {
      type: propTypeInstanceOf(THREE.Curve).isRequired,
      update: this.triggerRemount,
    });

    this.hasProp('segments', {
      type: PropTypes.number,
      update: this.triggerRemount,
      default: 64,
    });

    this.hasProp('radius', {
      type: PropTypes.number,
      update: this.triggerRemount,
      default: 1,
    });

    this.hasProp('radiusSegments', {
      type: PropTypes.number,
      update: this.triggerRemount,
      default: 8,
    });

    this.hasProp('closed', {
      type: PropTypes.bool,
      update: this.triggerRemount,
      default: false,
    });
  }

  construct(props) {
    // props from https://threejs.org/docs/#api/geometries/TubeGeometry:
    const {
      path, // THREE.Curve
      segments, // number
      radius, // number
      radiusSegments, // number
      closed, // boolean
    } = props;

    return new THREE.TubeGeometry(path, segments, radius, radiusSegments, closed);
  }
}

module.exports = TubeGeometryDescriptor;
