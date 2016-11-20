import * as THREE from 'three';

import GeometryWithShapesDescriptor from './GeometryWithShapesDescriptor';

class ShapeGeometryDescriptor extends GeometryWithShapesDescriptor {
  // noinspection JSMethodCanBeStatic
  refreshGeometry(threeObject) {
    const shapes = threeObject.userData._shapeCache.filter(shape => !!shape)
      .concat(threeObject.userData._shapesFromProps);

    threeObject.fromGeometry(new THREE.ShapeGeometry(shapes, {
      ...threeObject.userData._options,
    }));
  }
}

module.exports = ShapeGeometryDescriptor;
