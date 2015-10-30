import DocInfo from '../DocInfo';

class directionalLight extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.DirectionalLight](http://threejs.org/docs/#Reference/Lights/DirectionalLight)';
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
      shadowCameraLeft: '',
      shadowCameraBottom: '',
      shadowCameraRight: '',
      shadowCameraTop: '',
      color: '',
    };
  }
}

export default directionalLight;
