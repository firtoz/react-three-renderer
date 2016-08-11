import geometry from './geometry';

class planeGeometry extends geometry {
  constructor() {
    super();

    this.propPriority = {
      widthSegments: 1,
      heightSegments: 1,
    };
  }

  getIntro() {
    return 'Creates a [THREE.PlaneGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/PlaneGeometry)';
  }

  getDescription() {
    return '';
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

module.exports = planeGeometry;
