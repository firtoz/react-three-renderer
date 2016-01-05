import camera from './camera';

class perspectiveCamera extends camera {
  getIntro() {
    return 'Creates a [THREE.PerspectiveCamera](http://threejs.org/docs/#Reference/Cameras/PerspectiveCamera)';
  }

  getDescription() {
    return `Camera with perspective projection.`;
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),

      fov: 'Camera frustum vertical field of view, from bottom to top of view, in degrees.',
      aspect: 'Camera frustum aspect ratio, usually window width divided by window height.',
      near: 'Camera frustum near plane.',
      far: 'Camera frustum far plane.',
    };
  }
}

module.exports = perspectiveCamera;
