import DocInfo from '../DocInfo';

class directionalLight extends DocInfo {
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
