import DocInfo from '../DocInfo';

class bufferGeometry extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.BufferGeometry](https://threejs.org/docs/#api/core/BufferGeometry)';
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
