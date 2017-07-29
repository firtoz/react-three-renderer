import geometry from './geometry';

class extrudeGeometry extends geometry {
  getIntro() {
    return 'Creates a [THREE.ExtrudeGeometry](https://threejs.org/docs/#api/geometries/ExtrudeGeometry)';
  }

  getDescription() {
    return `In order to create shapes to extrude, place a [&lt;shape&gt;](shape)
 or a [&lt;shapeResource&gt;](shapeResource) within.

## Implementation details:
The geometry is wrapped within a [THREE.BufferGeometry](https://threejs.org/docs/#api/core/BufferGeometry).

This is to prevent having to remount the component every time anything changes.
 `;
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      settings: '',
      amount: '',
      bevelThickness: '',
      bevelSize: '',
      bevelSegments: '',
      bevelEnabled: '',
      steps: '',
      extrudePath: '',
      frames: '',

      shapes: 'Array of shapes, or a single shape THREE.Shape',
      curveSegments: 'Default is 12 (not used in three.js at the moment)',
      material: 'Index of the material in a material list',
      UVGenerator: 'A UV generator, defaults to ExtrudeGeometry\'s WorldUVGenerator',
    };
  }
}

module.exports = extrudeGeometry;
