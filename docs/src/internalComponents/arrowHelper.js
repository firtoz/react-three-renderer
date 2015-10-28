import DocInfo from '../DocInfo';

class arrowHelper extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.ArrowHelper](http://threejs.org/docs/#Reference/Extras.Helpers/ArrowHelper)';
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
      dir: '',
      origin: '',
      length: '',
      color: '',
      headLength: '',
      headWidth: '',
    };
  }
}

export default arrowHelper;
