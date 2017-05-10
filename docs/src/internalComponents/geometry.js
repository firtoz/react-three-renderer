import DocInfo from '../DocInfo';

class geometry extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.Geometry](https://threejs.org/docs/#api/core/Geometry)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      dynamic: `See [THREE.Geometry#dynamic](https://threejs.org/docs/#api/core/Geometry.dynamic).

Set to true if attribute buffers will need to change in runtime (using "dirty" flags).

Unless set to true internal typed arrays corresponding to buffers will be deleted
once sent to GPU.`,
      name: 'Name for this geometry.',
      vertices: 'See [THREE.Geometry#vertices](https://threejs.org/docs/#api/core/Geometry.vertices).',
      faceVertexUvs: 'See [THREE.Geometry#faceVertexUvs](https://threejs.org/docs/#api/core/Geometry.faceVertexUvs).',
      colors: 'See [THREE.Geometry#colors](https://threejs.org/docs/#api/core/Geometry.colors).',
      faces: 'See [THREE.Geometry#faces](https://threejs.org/docs/#api/core/Geometry.faces).',
    };
  }
}

module.exports = geometry;
