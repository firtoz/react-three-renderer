import DocInfo from '../DocInfo';

class pointLight extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.PointLight](http://threejs.org/docs/#Reference/Lights/PointLight)';
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
      color: '',
      intensity: '',
      decay: '',
      distance: '',
    };
  }
}

export default pointLight;
