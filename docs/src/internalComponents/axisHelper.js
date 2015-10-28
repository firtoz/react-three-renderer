import DocInfo from '../DocInfo';

class axisHelper extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.AxisHelper](http://threejs.org/docs/#Reference/Extras.Helpers/AxisHelper)';
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
      size: '',
    };
  }
}

export default axisHelper;
