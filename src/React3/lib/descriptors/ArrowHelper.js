import THREE from 'three';
import Object3DDescriptor from './Object3DDescriptor';

class ArrowHelper extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);
  }

  construct(props) {
    const direction = props.hasOwnProperty('direction') ? props.direction : undefined;
    const origin = props.hasOwnProperty('origin') ? props.origin : undefined;
    const length = props.hasOwnProperty('length') ? props.length : undefined;
    const color = props.hasOwnProperty('color') ? props.color : undefined;
    const headLength = props.hasOwnProperty('headLength') ? props.headLength : undefined;
    const headWidth = props.hasOwnProperty('headWidth') ? props.headWidth : undefined;

    return new THREE.ArrowHelper(direction, origin, length, color, headLength, headWidth);
  }
}

export default ArrowHelper;
