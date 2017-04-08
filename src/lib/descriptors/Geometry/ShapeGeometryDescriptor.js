import * as THREE from 'three';

import GeometryWithShapesDescriptor from './GeometryWithShapesDescriptor';

class ShapeGeometryDescriptor extends GeometryWithShapesDescriptor {
  // noinspection JSMethodCanBeStatic
  refreshGeometry(threeObject) {
    const shapes = threeObject.userData._shapeCache.filter(shape => !!shape)
      .concat(threeObject.userData._shapesFromProps);

    if (threeObject.userData._options.hasOwnProperty('curveSegments')) {
      threeObject.fromGeometry(
        new THREE.ShapeGeometry(shapes, threeObject.userData._options.curveSegments));
    } else {
      threeObject.fromGeometry(new THREE.ShapeGeometry(shapes));
    }
  }
}

module.exports = ShapeGeometryDescriptor;
