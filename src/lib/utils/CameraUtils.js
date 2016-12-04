import * as THREE from 'three';

class CameraUtils {
  /**
   *   The current rendering camera, can be used by onBeforeRender
   */
  static current: THREE.Camera = null;
}

module.exports = CameraUtils;
