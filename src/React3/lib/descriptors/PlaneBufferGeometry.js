import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';
import invariant from 'fbjs/lib/invariant';

class PlaneBufferGeometry extends GeometryDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    this.propUpdates = {
      ...this.propUpdates,
      'width': this._updateWidth,
      'height': this._updateHeight,
    };
  }

  construct(props) {
    return new THREE.PlaneBufferGeometry(props.width, props.height);
  }

  _updateWidth = () => {
    invariant(false, 'Please do not modify the width property of the planeBufferGeometry component.');
  };

  _updateHeight = () => {
    invariant(false, 'Please do not modify the height property of the planeBufferGeometry component.');
  };
}

export default PlaneBufferGeometry;
