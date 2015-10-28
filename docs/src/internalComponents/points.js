import DocInfo from '../DocInfo';

class points extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.Points](http://threejs.org/docs/#Reference/Objects/Points)';
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
    };
  }
}

export default points;
