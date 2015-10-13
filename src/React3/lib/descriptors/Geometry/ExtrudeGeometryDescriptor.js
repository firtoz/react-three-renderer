import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

import invariant from 'fbjs/lib/invariant';
import warning from 'fbjs/lib/warning';

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
    let shapes;

    if (props.hasOwnProperty('shapes')) {
      shapes = props.shapes;
    } else {
      shapes = [];
    }

    const options = {};

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
      if (props.hasOwnProperty(propName)) {
        options[propName] = props[propName];
      }
    });

    return new THREE.ExtrudeGeometry(shapes, options);
  }

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    const options = {};

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
      if (props.hasOwnProperty(propName)) {
        options[propName] = props[propName];
      }
    });

    threeObject.userData._options = options;
  }

  addChildren(threeObject, children) {
    // TODO: add shapes here!

    if (process.env.NODE_ENV !== 'production') {
      invariant(children.filter(this._invalidChild).length === 0, 'Shape children can only be shape actions!');
    } else {
      invariant(children.filter(this._invalidChild).length === 0, false);
    }

    children.forEach(child => {
      try {
        threeObject.addShape(child, threeObject.userData._options);
      } catch (e) {
        warning(false, 'Failed to add shape to extrude geometry: %s',  e);
      }
    });
  }

  addChild(threeObject, child, mountIndex) {
    // new shape was added?
    this.triggerRemount(threeObject);
  }

  removeChild(threeObject, child) {
    // new shape was added?
    this.triggerRemount(threeObject);
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
