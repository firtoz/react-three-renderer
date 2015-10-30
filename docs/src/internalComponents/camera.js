import object3D from './object3D';

class camera extends object3D {
  getIntro() {
    return 'Creates a [THREE.Camera](http://threejs.org/docs/#Reference/Cameras/Camera)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      name: 'The [name]() property of the camera.\n\n' +
      'This gets used by [&lt;react3/&gt;](react3), [&lt;viewport/&gt;](viewport), or' +
      ' [&lt;cameraHelper&gt;](cameraHelper).',
      near: 'The [near]() property of the camera.',
      far: 'The [far]() property of the camera.',
    };
  }
}

export default camera;
