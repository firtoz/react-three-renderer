import DocInfo from '../DocInfo';

class line extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.Line](http://threejs.org/docs/#Reference/Objects/Line)';
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

export default line;
