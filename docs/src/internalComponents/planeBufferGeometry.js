import geometry from './geometry';

class planeBufferGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.PlaneBufferGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/PlaneBufferGeometry)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      width: '',
      height: '',
      widthSegments: '',
      heightSegments: '',
    };
  }
}

module.exports = planeBufferGeometry;
