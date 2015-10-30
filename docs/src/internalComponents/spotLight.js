import DocInfo from '../DocInfo';

class spotLight extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.SpotLight](http://threejs.org/docs/#Reference/Lights/SpotLight)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      quaternion: '',
      scale: '',
      lookAt: '',
      frustumCulled: '',
      visible: '',
      renderOrder: '',
      castShadow: '',
      receiveShadow: '',
      position: '',
      rotation: '',
      name: '',
      updatesRefreshAllMaterials: '',
      shadowBias: '',
      shadowDarkness: '',
      shadowMapWidth: '',
      shadowMapHeight: '',
      shadowCameraNear: '',
      shadowCameraFar: '',
      intensity: '',
      distance: '',
      angle: '',
      exponent: '',
      decay: '',
      shadowCameraFov: '',
      color: '',
    };
  }
}

export default spotLight;
