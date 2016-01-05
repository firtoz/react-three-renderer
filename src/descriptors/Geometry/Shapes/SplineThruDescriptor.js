import THREE from 'three.js';

import ShapeActionDescriptorBase from './ShapeActionDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

import SplineThruAction from '../../../Shapes/SplineThruAction';
import propTypeInstanceOf from '../../../utils/propTypeInstanceOf';

class SplineThruDescriptor extends ShapeActionDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasProp('points', {
      type: PropTypes.arrayOf(propTypeInstanceOf(THREE.Vector2)).isRequired,
      update: this.triggerRemount,
      default: [],
    });
  }

  construct(props) {
    return new SplineThruAction(props.points);
  }
}

module.exports = SplineThruDescriptor;
