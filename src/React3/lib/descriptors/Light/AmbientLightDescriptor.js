import THREE from 'three';
import Object3DDescriptor from './../Object/Object3DDescriptor';

class AmbientLightDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);
  }

  construct(props) {
    const color = props.hasOwnProperty('color') ? props.color : 0xffffff;

    return new THREE.AmbientLight(color);
  }
}

export default AmbientLightDescriptor;
