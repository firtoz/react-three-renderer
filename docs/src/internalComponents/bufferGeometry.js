import DocInfo from '../DocInfo';

class bufferGeometry extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.BufferGeometry](http://threejs.org/docs/#Reference/Core/BufferGeometry)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      name: '',
      resourceId: '',
      position: '',
      normal: '',
      color: '',
      index: '',
    };
  }
}

module.exports = bufferGeometry;
