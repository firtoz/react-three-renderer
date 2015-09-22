import THREE from 'three';
import Object3DDescriptor from './../Object/Object3DDescriptor';

class DirectionalLightDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.registerSimpleProperties([
      'intensity',
      'shadowMapWidth',
      'shadowMapHeight',
      'shadowCameraLeft',
      'shadowCameraRight',
      'shadowCameraTop',
      'shadowCameraBottom',
      'shadowCameraFar',
      'shadowDarkness',
    ]);
  }

  construct(props) {
    const color = props.hasOwnProperty('color') ? props.color : 0xffffff;
    const intensity = props.hasOwnProperty('intensity') ? props.intensity : 1;

    return new THREE.DirectionalLight(color, intensity);
  }
}

export default DirectionalLightDescriptor;
