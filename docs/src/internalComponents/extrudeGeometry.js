import geometry from './geometry';

class extrudeGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.ExtrudeGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/ExtrudeGeometry)';
  }

  getDescription() {
    return `In order to create shapes to extrude, place a [&lt;shape&gt;](shape)
 or a [&lt;shapeResource&gt;](shapeResource) within.

## Implementation details:
The geometry is wrapped within a [THREE.BufferGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/BufferGeometry).

This is to prevent having to remount the component every time anything changes.
 `;
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      shapes: '',
      settings: '',
      amount: '',
      bevelThickness: '',
      bevelSize: '',
      bevelSegments: '',
      bevelEnabled: '',
      curveSegments: '',
      steps: '',
      extrudePath: '',
      UVGenerator: '',
      frames: '',
    };
  }
}

module.exports = extrudeGeometry;
