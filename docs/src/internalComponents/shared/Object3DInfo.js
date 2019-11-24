import DocInfo from '../../DocInfo';

class Object3DInfo extends DocInfo {
  getAttributesText() {
    return {
      name: 'Name for the 3D Object.',
      position: 'The position of the 3D object relative to the parent.',
      rotation: 'The rotation of the 3D object relative to the parent, in euler form.',
      quaternion: 'The rotation of the 3D object relative to the parent, in quaternion form.',
      scale: 'The scale of the 3D object relative to the parent.',
      lookAt: 'The target position for the 3D object to look at.\n\n' +
      'If this property is set, [`THREE.Object3D#lookAt`](https://threejs.org/docs/#api/core/Object3D.lookAt) ' +
      'will be called every time the value changes or the position of the object changes.',
      frustumCulled: 'Whether the 3D object will be culled by the camera frustum or not.',
      visible: 'Whether the 3D object will be visible or not.',
      renderOrder: 'The render order override for the 3D object.',
      castShadow: 'Whether the 3D object will cast shadows or not.',
      receiveShadow: 'Whether the 3D object will receive shadows or not.\n' +
      '> **WARNING**: This will trigger a refresh for any materials the object is using.\n\n' +
      '> **WARNING**: If you use the same material for multiple objects and some of them' +
      ' receive shadows and some do not, it may cause adverse side effects. In that case,' +
      ' it is recommended to use different materials.',
      up: 'Up direction for the object',
    };
  }
}

module.exports = Object3DInfo;
