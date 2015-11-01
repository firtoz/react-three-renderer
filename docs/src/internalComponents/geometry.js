import DocInfo from '../DocInfo';

class geometry extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.Geometry](http://threejs.org/docs/#Reference/Extras.Geometries/Geometry)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      dynamic: `See [THREE.Geometry#dynamic](http://threejs.org/docs/#Reference/Core/Geometry.dynamic).

Set to true if attribute buffers will need to change in runtime (using "dirty" flags).

Unless set to true internal typed arrays corresponding to buffers will be deleted once sent to GPU.

Defaults to true.`,
      name: `Name for this geometry.

Default is an empty string.`,
      resourceId: 'The resource id of this object, only used if it is placed into [[resources]].',
      vertices: 'See [THREE.Geometry#vertices](http://threejs.org/docs/#Reference/Core/Geometry.vertices).',
      colors: 'See [THREE.Geometry#colors](http://threejs.org/docs/#Reference/Core/Geometry.colors).',
      faces: 'See [THREE.Geometry#faces](http://threejs.org/docs/#Reference/Core/Geometry.faces).',
    };
  }
}

export default geometry;
