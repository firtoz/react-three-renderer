import geometry from './geometry';

class torusKnotGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.TorusKnotGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TorusKnotGeometry)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      radius: '',
      tube: '',
      radialSegments: '',
      tubularSegments: '',
      p: '',
      q: '',
      heightScale: '',
    };
  }
}

module.exports = torusKnotGeometry;
