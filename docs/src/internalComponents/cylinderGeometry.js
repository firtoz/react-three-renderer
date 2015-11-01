import geometry from './geometry';

class cylinderGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.CylinderGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/CylinderGeometry)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      radiusTop: '',
      radiusBottom: '',
      height: '',
      radialSegments: '',
      heightSegments: '',
      openEnded: '',
      thetaStart: '',
      thetaLength: '',
    };
  }
}

export default cylinderGeometry;
