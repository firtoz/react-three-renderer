import * as THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';
import invariant from 'fbjs/lib/invariant';

import GeometryDescriptorBase from './GeometryDescriptorBase';
import ShapeResourceReference from '../../Resources/ShapeResourceReference';
import propTypeInstanceOf from '../../utils/propTypeInstanceOf';

class GeometryWithShapesDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasProp('shapes', {
      type: PropTypes.arrayOf(propTypeInstanceOf(THREE.Shape)),
      updateInitial: true,
      update: (threeObject, shapes) => {
        threeObject.userData._shapesFromProps = shapes || [];

        threeObject.userData._needsToRefreshGeometry = true;
      },
      default: [],
    });

    const optionNames = [
      'curveSegments',
      'material',
      'UVGenerator',
    ];

    const optionTypes = [
      PropTypes.number,
      PropTypes.number,
      PropTypes.shape({
        generateTopUV: PropTypes.func,
        generateSideWallUV: PropTypes.func,
      }),
    ];

    optionNames.forEach((propName, i) => {
      this.hasProp(propName, {
        type: optionTypes[i],
        update: (threeObject, value) => {
          if (value === undefined) {
            delete threeObject.userData._options[propName];
          } else {
            threeObject.userData._options[propName] = value;
          }

          threeObject.userData._needsToRefreshGeometry = true;
        },
        default: undefined,
      });
    });
  }

  completePropertyUpdates(threeObject) {
    if (threeObject.userData._needsToRefreshGeometry) {
      this.refreshGeometry(threeObject);

      threeObject.userData._needsToRefreshGeometry = false;
    }
  }

  construct() {
    return new THREE.BufferGeometry();
  }

  getOptions(props) {
    const options = {};

    [
      'curveSegments',
      'material',
      'UVGenerator',
    ].forEach(propName => {
      if (props.hasOwnProperty(propName)) {
        options[propName] = props[propName];
      }
    });

    return options;
  }

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    threeObject.userData._shapeCache = [];
    threeObject.userData._options = this.getOptions(props);
    threeObject.userData._resourceListenerCleanupFunctions = [];
    threeObject.userData._needsToRefreshGeometry = false;

    if (!props.children) {
      // will use shapes only from props
      this.refreshGeometry(threeObject);
    }
  }

  addChildren(threeObject, children) {
    if (process.env.NODE_ENV !== 'production') {
      invariant(children.filter(this._invalidChild).length === 0, 'shape-based geometry children' +
        ' can only be shapes!');
    } else {
      invariant(children.filter(this._invalidChild).length === 0, false);
    }

    const shapeCache = [];

    children.forEach(child => {
      if (child instanceof ShapeResourceReference) {
        const shapeIndex = shapeCache.length;

        const resourceListener = (shape) => {
          threeObject.userData._shapeCache[shapeIndex] = shape;

          this.refreshGeometry(threeObject);
        };

        resourceListener.target = child;

        const cleanupFunction = () => {
          child.userData.events.removeListener('resource.set', resourceListener);

          threeObject.userData._resourceListenerCleanupFunctions
            .splice(threeObject.userData
              ._resourceListenerCleanupFunctions.indexOf(cleanupFunction), 1);
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

    this.refreshGeometry(threeObject);
  }

  addChild(threeObject) {
    // new shape was added
    // TODO optimize

    this.triggerRemount(threeObject);
  }

  moveChild(threeObject) {
    // a shape was moved
    // TODO optimize

    this.triggerRemount(threeObject);
  }

  removeChild(threeObject) {
    // shape was removed
    // TODO optimize

    this.triggerRemount(threeObject);
  }

  _invalidChild = child => !(
    child instanceof THREE.Shape ||
    child instanceof ShapeResourceReference
  );

  unmount(geometry) {
    geometry.userData._resourceListenerCleanupFunctions.forEach(listener => {
      listener();
    });

    delete geometry.userData._options;
    delete geometry.userData._resourceListenerCleanupFunctions;
    delete geometry.userData._shapesFromProps;

    return super.unmount(geometry);
  }
}

module.exports = GeometryWithShapesDescriptor;
