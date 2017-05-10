import geometry from './geometry';

class torusKnotGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.TorusKnotGeometry](https://threejs.org/docs/#api/geometries/TorusKnotGeometry)';
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
      p: 'determines, how many times the geometry winds around its axis of rotational symmetry.',
      q: 'determines, how many times the geometry winds around a circle in the interior of the torus.',
      heightScale: '',
    };
  }
}

module.exports = torusKnotGeometry;
