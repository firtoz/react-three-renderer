import THREE from 'three.js';

class CameraUtils {
  /**
   *   The current rendering camera, can be used by onPreRender
   */
  static current:THREE.Camera = null;
}

module.exports = CameraUtils;
