import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';
import ShapeResourceReference from '../../Resources/ShapeResourceReference';

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

    return new THREE.BufferGeometry()
      .fromGeometry(new THREE.ExtrudeGeometry(shapes, options));
  }

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

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

    threeObject.userData._options = options;
    threeObject.userData._resourceListenerCleanupFunctions = [];
    threeObject.userData._shapesFromProps = shapes;
  }

  _onShapeResourceUpdate(threeObject, shapeIndex, shape) {
    threeObject.userData._shapeCache[shapeIndex] = shape;

    this._refreshGeometry(threeObject);
  }

  _refreshGeometry(threeObject) {
    const shapes = threeObject.userData._shapeCache.filter(shape => !!shape);

    threeObject.fromGeometry(new THREE.ExtrudeGeometry(shapes, threeObject.userData._options));
  }

  addChildren(threeObject, children) {
    // TODO: add shapes here!

    if (process.env.NODE_ENV !== 'production') {
      invariant(children.filter(this._invalidChild).length === 0, 'Extrude geometry children' +
        ' can only be shapes!');
    } else {
      invariant(children.filter(this._invalidChild).length === 0, false);
    }

    const shapeCache = threeObject.userData._shapesFromProps.concat();

    children.forEach(child => {
      if (child instanceof ShapeResourceReference) {
        const shapeIndex = shapeCache.length;

        const resourceListener = this._onShapeResourceUpdate.bind(this, threeObject, shapeIndex);

        resourceListener.target = child;

        const cleanupFunction = () => {
          child.userData.events.removeListener('resource.set', resourceListener);

          threeObject.userData._resourceListenerCleanupFunctions
            .splice(threeObject.userData._resourceListenerCleanupFunctions.indexOf(cleanupFunction), 1);
        };

        threeObject.userData._resourceListenerCleanupFunctions.push(cleanupFunction);

        child.userData.events.on('resource.set', resourceListener);
        child.userData.events.once('dispose', () => {
          cleanupFunction();
        });

        shapeCache.push(null);
      } else {
        shapeCache.push(child);
      }
    });

    threeObject.userData._shapeCache = shapeCache;

    this._refreshGeometry(threeObject);
  }

  addChild(threeObject, child, mountIndex) {
    // new shape was added?
    // TODO optimize
    this.triggerRemount(threeObject);
  }

  removeChild(threeObject, child) {
    // new shape was added?
    // TODO optimize
    this.triggerRemount(threeObject);
  }

  _invalidChild = child => {
    const invalid = !(
      child instanceof THREE.Shape ||
      child instanceof ShapeResourceReference
    );

    if (invalid) {
      debugger;
    }

    return invalid;
  };

  unmount(geometry) {
    geometry.userData._resourceListenerCleanupFunctions.forEach(listener => {
      listener();
    });

    delete geometry.userData._resourceListenerCleanupFunctions;
    delete geometry.userData._options;
    delete geometry.userData._shapesFromProps;

    return super.unmount(geometry);
  }
}

export default ExtrudeGeometryDescriptor;
