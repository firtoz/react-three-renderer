import PropTypes from 'react/lib/ReactPropTypes';
import THREE from 'three';

import GeometryResourceDescriptor from './GeometryResourceDescriptor';

class ShapeGeometryResourceDescriptor extends GeometryResourceDescriptor {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasProp('type', {
      type: PropTypes.oneOf([
        'points',
        'spacedPoints',
        'shape',
      ]).isRequired,
      update: this.triggerRemount,
      default: '',
    });

    this.hasProp('divisions', {
      type: PropTypes.number,
      update: this.triggerRemount,
      default: 5,
    });
  }

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    threeObject.userData._divisions = props.divisions;

    threeObject.userData._type = props.type;
  }

  applyToSlot(threeObject, parentObject, shape: THREE.Shape) {
    if (!shape) {
      return super.applyToSlot(threeObject, parentObject, null);
    }

    let geometry;

    switch (threeObject.userData._type) {
      case 'points':
        geometry = shape.createPointsGeometry();
        break;
      case 'spacedPoints':
        geometry = shape.createSpacedPointsGeometry(threeObject.userData._divisions);
        break;
      case 'shape':
        // TODO shapeGeometryDescriptor
        geometry = new THREE.ShapeGeometry(shape);
        break;
      default:
        break;
    }

    return super.applyToSlot(threeObject, parentObject, geometry);
  }
}

module.exports = ShapeGeometryResourceDescriptor;
