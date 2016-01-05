import THREE from 'three.js';
import GeometryDescriptorBase from './GeometryDescriptorBase';
import ShapeResourceReference from '../../Resources/ShapeResourceReference';

import PropTypes from 'react/lib/ReactPropTypes';

import invariant from 'fbjs/lib/invariant';

import propTypeInstanceOf from '../../utils/propTypeInstanceOf';

class ExtrudeGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasProp('shapes', {
      type: PropTypes.arrayOf(propTypeInstanceOf(THREE.Shape)),
      updateInitial: true,
      update: (threeObject, shapes) => {
        threeObject.userData._shapesFromProps = shapes || [];

        // if the root instance exists, then it can be refreshed
        if (threeObject.userData._rootInstance) {
          this._refreshGeometry(threeObject);
        }
      },
      default: [],
    });

    this.hasProp('settings', {
      type: PropTypes.any,
      update(threeObject, settings) {
        threeObject.userData._settings = settings;
      },
      updateInitial: true,
      default: undefined,
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
        update: (threeObject, value) => {
          if (value === undefined) {
            delete threeObject.userData._options[propName];
          } else {
            threeObject.userData._options[propName] = value;
          }

          this._refreshGeometry(threeObject);
        },
        default: undefined,
      });
    });
  }

  construct() {
    return new THREE.BufferGeometry();
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

    threeObject.userData._shapeCache = [];
    threeObject.userData._options = options;
    threeObject.userData._resourceListenerCleanupFunctions = [];

    this._refreshGeometry(threeObject);
  }

  _onShapeResourceUpdate(threeObject, shapeIndex, shape) {
    threeObject.userData._shapeCache[shapeIndex] = shape;

    this._refreshGeometry(threeObject);
  }

  _refreshGeometry(threeObject) {
    const shapes = threeObject.userData._shapeCache.filter(shape => !!shape)
      .concat(threeObject.userData._shapesFromProps);

    threeObject.fromGeometry(new THREE.ExtrudeGeometry(shapes, {
      ...threeObject.userData._options,
      ...threeObject.userData._settings,
    }));
  }

  addChildren(threeObject, children) {
    // TODO: add shapes here!

    if (process.env.NODE_ENV !== 'production') {
      invariant(children.filter(this._invalidChild).length === 0, 'Extrude geometry children' +
        ' can only be shapes!');
    } else {
      invariant(children.filter(this._invalidChild).length === 0, false);
    }

    const shapeCache = [];

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

  addChild(threeObject) {
    // new shape was added
    // TODO optimize

    this.triggerRemount(threeObject);
  }

  removeChild(threeObject) {
    // shape was removed
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

module.exports = ExtrudeGeometryDescriptor;
