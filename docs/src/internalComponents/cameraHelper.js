import DocInfo from '../DocInfo';

class cameraHelper extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.CameraHelper](http://threejs.org/docs/#Reference/Extras.Helpers/CameraHelper)';
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
      cameraName: '',
    };
  }
}

export default cameraHelper;
