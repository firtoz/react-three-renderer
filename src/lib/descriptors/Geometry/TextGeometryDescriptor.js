import * as THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import GeometryDescriptorBase from './GeometryDescriptorBase';

class TextGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasProp('text', {
      type: PropTypes.string.isRequired,
      update: this.triggerRemount,
      default: 'TEXT MISSING',
    });

    this.hasProp('font', {
      type: PropTypes.instanceOf(THREE.Font).isRequired,
      update: this.triggerRemount,
    });

    this.hasProp('size', {
      type: PropTypes.number.isRequired,
      update: this.triggerRemount,
    });

    this.hasProp('height', {
      type: PropTypes.number,
      update: this.triggerRemount,
      default: 50,
    });

    this.hasProp('curveSegments', {
      type: PropTypes.number,
      update: this.triggerRemount,
      default: 12,
    });

    this.hasProp('bevelEnabled', {
      type: PropTypes.bool,
      update: this.triggerRemount,
      default: false,
    });

    this.hasProp('bevelThickness', {
      type: PropTypes.number,
      update: this.triggerRemount,
      default: 10,
    });

    this.hasProp('bevelSize', {
      type: PropTypes.number,
      update: this.triggerRemount,
      default: 8,
    });
  }

  construct(props) {
    // props from https://threejs.org/docs/#api/geometries/TextGeometry:
    const {
      text, // string

      font, // THREE.Font
      size, // number
      height, // number
      curveSegments, // number
      bevelEnabled, // bool
      bevelThickness, // number
      bevelSize, // number
    } = props;

    return new THREE.TextGeometry(text, {
      font,
      size,
      height,
      curveSegments,
      bevelEnabled,
      bevelThickness,
      bevelSize,
    });
  }
}

module.exports = TextGeometryDescriptor;
