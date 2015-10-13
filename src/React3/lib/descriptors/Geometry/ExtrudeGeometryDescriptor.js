import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

import invariant from 'fbjs/lib/invariant';

class ExtrudeGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasProp('shapes', {
      type: PropTypes.arrayOf(PropTypes.instanceOf(THREE.Shape)),
      update: this.triggerRemount,
      default: [],
    });

    [
      'amount',
      'bevelThickness',
      'bevelSize',
      'bevelSegments',
      'bevelEnabled',
      'curveSegments',
      'steps',
      'extrudePath',
      'UVGenerator',
      'frames',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.any,
        update: this.triggerRemount,
        default: undefined,
      });
    });
  }

  construct(props) {
    const {
      amount,
      bevelThickness,
      bevelSize,
      bevelSegments,
      bevelEnabled,
      curveSegments,
      steps,
      extrudePath,
      UVGenerator,
      frames,
      } = props;

    let shapes;

    if (props.hasOwnProperty('shapes')) {
      shapes = props.shapes;
    } else {
      shapes = [];
    }

    const options = {
      amount,
      bevelThickness,
      bevelSize,
      bevelSegments,
      bevelEnabled,
      curveSegments,
      steps,
      extrudePath,
      UVGenerator,
      frames,
    };

    return new THREE.ExtrudeGeometry(shapes, options);
  }

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    const {
      amount,
      bevelThickness,
      bevelSize,
      bevelSegments,
      bevelEnabled,
      curveSegments,
      steps,
      extrudePath,
      UVGenerator,
      frames,
      } = props;


    const options = {
      amount,
      bevelThickness,
      bevelSize,
      bevelSegments,
      bevelEnabled,
      curveSegments,
      steps,
      extrudePath,
      UVGenerator,
      frames,
    };

    threeObject.userData._options = options;
  }

  addChildren(threeObject, children) {
    // TODO: add shapes here!

    if (process.env.NODE_ENV !== 'production') {
      invariant(children.filter(this._invalidChild).length === 0, 'Shape children can only be shape actions!');
    } else {
      invariant(children.filter(this._invalidChild).length === 0, false);
    }

    debugger;

    children.forEach(child => {
      threeObject.addShape(child, threeObject.userData._options);
    });
  }

  addChild(threeObject, child, mountIndex) {
    debugger;
  }

  _invalidChild = child => {
    const invalid = !(
      child instanceof THREE.Shape
    );

    if (invalid) {
      debugger;
    }

    return invalid;
  };
}

export default ExtrudeGeometryDescriptor;
