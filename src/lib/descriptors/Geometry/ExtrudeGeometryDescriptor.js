import THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import GeometryWithShapesDescriptor from './GeometryWithShapesDescriptor';
import propTypeInstanceOf from '../../utils/propTypeInstanceOf';

class ExtrudeGeometryDescriptor extends GeometryWithShapesDescriptor {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasProp('settings', {
      type: PropTypes.any,
      update(threeObject, settings) {
        threeObject.userData._settings = settings;
      },
      updateInitial: true,
      default: undefined,
    });

    [
      'steps',
      'amount',
      'bevelThickness',
      'bevelSize',
      'bevelSegments',
      'extrudeMaterial',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number,
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

    const extraNames = [
      'bevelEnabled',
      'extrudePath',
      'frames',
    ];

    const extraTypes = [
      PropTypes.bool, // bevelEnabled
      propTypeInstanceOf(THREE.CurvePath), // extrudePath
      propTypeInstanceOf(THREE.TubeGeometry.FrenetFrames), // frames
    ];

    extraNames.forEach((propName, i) => {
      this.hasProp(propName, {
        type: extraTypes[i],
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

  // noinspection JSMethodCanBeStatic
  refreshGeometry(threeObject) {
    const shapes = threeObject.userData._shapeCache.filter(shape => !!shape)
      .concat(threeObject.userData._shapesFromProps);

    threeObject.fromGeometry(new THREE.ExtrudeGeometry(shapes, {
      ...threeObject.userData._options,
      ...threeObject.userData._settings,
    }));
  }

  getOptions(props) {
    const options = super.getOptions();

    [
      'steps',
      'amount',
      'bevelEnabled',
      'bevelThickness',
      'bevelSize',
      'bevelSegments',
      'extrudePath',
      'frames',
      'extrudeMaterial',
    ].forEach(propName => {
      if (props.hasOwnProperty(propName)) {
        options[propName] = props[propName];
      }
    });

    return options;
  }
}

module.exports = ExtrudeGeometryDescriptor;
